"""generate-rules.py 单元测试"""
import importlib.util
import json
import sys
from pathlib import Path

# generate-rules.py 文件名含连字符，标准 import 不行，用 importlib
spec = importlib.util.spec_from_file_location(
    "generate_rules",
    Path(__file__).parent.parent / "scripts" / "generate-rules.py",
)
gr = importlib.util.module_from_spec(spec)
sys.modules["generate_rules"] = gr
spec.loader.exec_module(gr)


class TestParseCidr:
    def test_normal(self):
        text = "192.168.0.0/16\n10.0.0.0/8\n172.16.0.0/12"
        assert gr.parse_cidr(text) == ["192.168.0.0/16", "10.0.0.0/8", "172.16.0.0/12"]

    def test_skips_comments_and_blanks(self):
        text = "# 中国 IP 段\n192.168.0.0/16\n\n# 另一个注释\n10.0.0.0/8\n"
        assert gr.parse_cidr(text) == ["192.168.0.0/16", "10.0.0.0/8"]

    def test_empty(self):
        assert gr.parse_cidr("") == []

    def test_only_comments(self):
        assert gr.parse_cidr("# nothing here\n# still nothing") == []

    def test_strips_whitespace(self):
        text = "  1.0.0.0/8  \n  192.168.0.0/16  "
        assert gr.parse_cidr(text) == ["1.0.0.0/8", "192.168.0.0/16"]


class TestWriteJson:
    def test_compact_format(self, tmp_path):
        path = tmp_path / "test.json"
        data = {"version": 3, "rules": [{"ip_cidr": ["1.0.0.0/8", "192.168.0.0/16"]}]}
        gr.write_json(str(path), data)

        assert path.exists()
        loaded = json.loads(path.read_text())
        assert loaded["version"] == 3
        assert loaded["rules"][0]["ip_cidr"] == ["1.0.0.0/8", "192.168.0.0/16"]

    def test_creates_parent_dirs(self, tmp_path):
        path = tmp_path / "deep" / "nested" / "test.json"
        gr.write_json(str(path), {"version": 3, "rules": []})
        assert path.exists()

    def test_no_ascii_escaping(self, tmp_path):
        """中文 tag 不应被转义"""
        path = tmp_path / "cn.json"
        gr.write_json(str(path), {"tag": "中国"})
        raw = path.read_text()
        assert "中国" in raw
        assert "\\u" not in raw


class TestWriteList:
    def test_writes_lines(self, tmp_path):
        path = tmp_path / "test.list"
        gr.write_list(str(path), ["1.0.0.0/8", "192.168.0.0/16"])
        lines = path.read_text().splitlines()
        assert lines == ["1.0.0.0/8", "192.168.0.0/16"]

    def test_empty_list(self, tmp_path):
        path = tmp_path / "empty.list"
        gr.write_list(str(path), [])
        assert path.read_text() == ""
