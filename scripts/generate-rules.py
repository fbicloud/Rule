#!/usr/bin/env python3
"""规则集生成器 — 读取 rules-config.yaml，拉取数据源，生成多平台规则文件。

用法:
    python3 scripts/generate-rules.py                    # 输出到 dist/
    python3 scripts/generate-rules.py --output /tmp/out  # 自定义输出目录

依赖:
    pip install pyyaml
    编译 SRS 需要 sing-box 二进制在 PATH 中
"""

import argparse
import json
import os
import subprocess
import sys
import urllib.request
from pathlib import Path

try:
    import yaml
except ImportError:
    print("ERROR: pyyaml not installed. Run: pip install pyyaml")
    sys.exit(1)


def log(msg: str):
    print(f"  {msg}")


def fetch(url: str) -> str:
    """拉取远程数据源，返回文本内容。"""
    log(f"Fetching {url}")
    req = urllib.request.Request(url, headers={"User-Agent": "Rule-Generator/1.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read().decode("utf-8")


def parse_cidr(text: str) -> list[str]:
    """解析每行一个 CIDR 的文本。"""
    lines = [line.strip() for line in text.splitlines()]
    lines = [line for line in lines if line and not line.startswith("#")]
    return lines


def write_json(path: str, data: dict):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    # compact 输出，方便 git diff
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, separators=(",", ":"))


def write_list(path: str, items: list[str]):
    """Surge 格式：每行一个条目。"""
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        for item in items:
            f.write(item + "\n")


def compile_srs(json_path: str, srs_path: str):
    """调用 sing-box 编译 .srs 二进制。"""
    log(f"  Compiling {json_path} -> {srs_path}")
    os.makedirs(os.path.dirname(srs_path), exist_ok=True)
    result = subprocess.run(
        ["sing-box", "rule-set", "compile", json_path, "-o", srs_path],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        print(f"  ERROR compiling {json_path}: {result.stderr.strip()}")
        sys.exit(1)


def resolve_source(name: str, sources: dict, cache: dict) -> list[str]:
    """从缓存获取已拉取的数据源内容。"""
    if name not in sources:
        print(f"ERROR: source '{name}' not defined in sources")
        sys.exit(1)

    src = sources[name]
    cache_key = name

    if cache_key not in cache:
        text = fetch(src["url"])
        if src.get("format") == "cidr":
            cache[cache_key] = parse_cidr(text)
        else:
            cache[cache_key] = [line.strip() for line in text.splitlines() if line.strip()]
        log(f"  Parsed {len(cache[cache_key])} entries")

    return cache[cache_key]


def generate(conf: dict, output_root: str):
    sources = conf["sources"]
    targets = conf["targets"]
    cache = {}  # url -> parsed entries

    for platform, plat_conf in targets.items():
        out_dir = os.path.join(output_root, plat_conf["dir"])
        formats = plat_conf.get("formats", [])
        log(f"Platform: {platform} -> {out_dir}")

        for rule in plat_conf["rules"]:
            entries = resolve_source(rule["source"], sources, cache)
            tag = rule["tag"]

            for fmt in formats:
                if fmt == "json":
                    version = rule.get("version", 3)
                    data = {"version": version, "rules": [{"ip_cidr": entries}]}
                    path = os.path.join(out_dir, f"{tag}.json")
                    write_json(path, data)
                    log(f"  Wrote {path} ({len(entries)} rules)")

                elif fmt == "srs":
                    json_path = os.path.join(out_dir, f"{tag}.json")
                    srs_path = os.path.join(out_dir, f"{tag}.srs")
                    # 如果 json 不在 formats 中，先生成临时 json
                    if "json" not in formats:
                        version = rule.get("version", 3)
                        data = {"version": version, "rules": [{"ip_cidr": entries}]}
                        write_json(json_path, data)
                        log(f"  Wrote {json_path} ({len(entries)} rules)")
                    compile_srs(json_path, srs_path)
                    log(f"  Wrote {srs_path}")
                    # 清除临时 json
                    if "json" not in formats:
                        os.remove(json_path)

                elif fmt == "list":
                    path = os.path.join(out_dir, f"{tag}.list")
                    write_list(path, entries)
                    log(f"  Wrote {path} ({len(entries)} rules)")

    log("Done.")


def main():
    parser = argparse.ArgumentParser(description="规则集生成器")
    parser.add_argument(
        "--output",
        default="dist",
        help="输出根目录 (默认: dist)",
    )
    parser.add_argument(
        "--config",
        default="rules-config.yaml",
        help="配置文件路径",
    )
    args = parser.parse_args()

    config_path = Path(args.config)
    if not config_path.exists():
        print(f"ERROR: config not found: {config_path}")
        sys.exit(1)

    with open(config_path, encoding="utf-8") as f:
        conf = yaml.safe_load(f)

    generate(conf, args.output)


if __name__ == "__main__":
    main()
