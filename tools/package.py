#!/usr/bin/env python3
"""Build store-ready packages for icanhazbetter.

Stages only the files the extension actually ships (no repo cruft, no gitignored
scratch dirs), verifies every path the manifest references exists, then writes a
deterministic zip with manifest.json at its root.

The repo keeps ONE cross-browser manifest, which each store then complains about:
Firefox ignores `background.service_worker`, and Chrome does not know
`background.scripts` or `browser_specific_settings`. So the manifest is tailored
per target on the way into the zip — the source of truth on disk stays the single
combined manifest that also works for an unpacked load in either browser.

    py tools/package.py                    # both stores, current version
    py tools/package.py --bump             # bump the patch version first
    py tools/package.py --target firefox   # one store only
"""

import argparse
import copy
import json
import shutil
import sys
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"

# Everything that ships. Globs are relative to the repo root.
INCLUDE = [
    "manifest.json",
    "background.js",
    "gifs.txt",
    "scripts/*.js",
    "styles/*.css",
    "fonts/*.woff2",
    "images/year-badges/*.svg",
]

TARGETS = ("firefox", "chrome")

# Fixed timestamp so identical sources produce an identical zip.
ZIP_DATE = (1980, 1, 1, 0, 0, 0)


def fail(msg):
    print("ERROR: " + msg, file=sys.stderr)
    sys.exit(1)


def collect():
    files = []
    for pattern in INCLUDE:
        matches = sorted(p for p in ROOT.glob(pattern) if p.is_file())
        if not matches:
            fail("no files matched %r" % pattern)
        files.extend(matches)
    return sorted(set(files), key=lambda p: p.relative_to(ROOT).as_posix())


def manifest_refs(manifest):
    """Every relative path the manifest points at."""
    refs = []
    bg = manifest.get("background", {})
    if "service_worker" in bg:
        refs.append(bg["service_worker"])
    refs.extend(bg.get("scripts", []))
    for entry in manifest.get("content_scripts", []):
        refs.extend(entry.get("js", []))
        refs.extend(entry.get("css", []))
    return refs


def check_manifest(manifest, staged_rel):
    missing = [r for r in manifest_refs(manifest) if r not in staged_rel]
    if missing:
        fail("manifest references files not in the package: %s" % ", ".join(missing))

    for entry in manifest.get("web_accessible_resources", []):
        for res in entry.get("resources", []):
            if not any(Path(r).match(res) for r in staged_rel):
                print("  warning: web_accessible_resource %r matched nothing" % res)


def tailor(manifest, target):
    """Strip the keys the other engine owns, so neither store warns."""
    m = copy.deepcopy(manifest)
    bg = m.get("background", {})
    if target == "firefox":
        # Firefox ignores service_worker and lints a warning about it; it runs
        # background.scripts as an event page.
        bg.pop("service_worker", None)
        if not bg.get("scripts"):
            fail("firefox build needs background.scripts")
    else:
        # Chrome MV3 knows only service_worker, and browser_specific_settings is
        # an unrecognised key there.
        bg.pop("scripts", None)
        m.pop("browser_specific_settings", None)
        if not bg.get("service_worker"):
            fail("chrome build needs background.service_worker")
    return m


def bump(manifest_path):
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    parts = manifest["version"].split(".")
    parts[-1] = str(int(parts[-1]) + 1)
    new = ".".join(parts)
    text = manifest_path.read_text(encoding="utf-8")
    old_line = '"version": "%s"' % manifest["version"]
    if text.count(old_line) != 1:
        fail("could not uniquely locate the version field in manifest.json")
    manifest_path.write_text(text.replace(old_line, '"version": "%s"' % new), encoding="utf-8")
    print("version bumped: %s -> %s" % (manifest["version"], new))
    return new


def build(target, manifest, files, staged_rel, version):
    tailored = tailor(manifest, target)
    stage = DIST / ("icanhazbetter-%s-%s" % (version, target))
    if stage.exists():
        shutil.rmtree(stage)
    for src, rel in zip(files, staged_rel):
        dest = stage / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dest)
    # The tailored manifest replaces the copied one.
    (stage / "manifest.json").write_text(
        json.dumps(tailored, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    zip_path = DIST / ("icanhazbetter-%s-%s.zip" % (version, target))
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as zf:
        for rel in staged_rel:
            info = zipfile.ZipInfo(rel, date_time=ZIP_DATE)
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o644 << 16
            zf.writestr(info, (stage / rel).read_bytes())

    bg = tailored.get("background", {})
    print("  %-8s %-42s %6.1f KB   background: %s%s"
          % (target,
             zip_path.relative_to(ROOT).as_posix(),
             zip_path.stat().st_size / 1024,
             ",".join(sorted(bg)),
             "  +gecko id" if "browser_specific_settings" in tailored else ""))
    return zip_path


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--bump", action="store_true", help="increment the manifest patch version first")
    ap.add_argument("--target", choices=TARGETS + ("both",), default="both")
    args = ap.parse_args()

    manifest_path = ROOT / "manifest.json"
    if args.bump:
        bump(manifest_path)

    try:
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        fail("manifest.json is not valid JSON: %s" % exc)

    version = manifest["version"]
    files = collect()
    staged_rel = [p.relative_to(ROOT).as_posix() for p in files]

    print("icanhazbetter %s — %d files" % (version, len(staged_rel)))
    check_manifest(manifest, staged_rel)

    targets = TARGETS if args.target == "both" else (args.target,)
    for target in targets:
        build(target, manifest, files, staged_rel, version)


if __name__ == "__main__":
    main()
