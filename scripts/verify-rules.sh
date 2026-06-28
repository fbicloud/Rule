#!/bin/bash
# 验证生成的规则文件可用性
# 用法: ./scripts/verify-rules.sh [dist_dir]
# 退出码: 0=全部通过, 1=有文件验证失败

set -euo pipefail

DIST_DIR="${1:-dist}"
FAIL=0

verify_srs() {
    local file="$1"
    echo "  [SRS]  $(basename "$file")"

    if ! sing-box check -c <(printf '{"log":{"level":"error"},"route":{"rule_set":[{"tag":"t","type":"local","format":"binary","path":"%s"}]}}' "$(realpath "$file")") >/dev/null 2>&1; then
        echo "    FAIL: sing-box check rejected"
        FAIL=1; return
    fi

    # 应匹配 CN IP
    if ! sing-box rule-set match "$file" 114.114.114.114 -f binary 2>&1 | grep -q "match"; then
        echo "    FAIL: should match 114.114.114.114 (CN)"
        FAIL=1; return
    fi

    # 不应匹配境外 IP
    if sing-box rule-set match "$file" 8.8.8.8 -f binary 2>&1 | grep -q "match"; then
        echo "    FAIL: should NOT match 8.8.8.8 (non-CN)"
        FAIL=1; return
    fi

    echo "    OK"
}

verify_json() {
    local file="$1"
    echo "  [JSON] $(basename "$file")"

    if ! sing-box check -c <(printf '{"log":{"level":"error"},"route":{"rule_set":[{"tag":"t","type":"local","format":"source","path":"%s"}]}}' "$(realpath "$file")") >/dev/null 2>&1; then
        echo "    FAIL: sing-box check rejected"
        FAIL=1; return
    fi

    if ! sing-box rule-set match "$file" 114.114.114.114 -f source 2>&1 | grep -q "match"; then
        echo "    FAIL: should match 114.114.114.114 (CN)"
        FAIL=1; return
    fi

    if sing-box rule-set match "$file" 8.8.8.8 -f source 2>&1 | grep -q "match"; then
        echo "    FAIL: should NOT match 8.8.8.8 (non-CN)"
        FAIL=1; return
    fi

    echo "    OK"
}

echo "=== Verifying rules ==="

for dir in "$DIST_DIR"/*/; do
    [ -d "$dir" ] || continue
    platform=$(basename "$dir")
    echo "Platform: $platform"

    for json in "$dir"**/*.json; do
        [ -f "$json" ] || continue
        verify_json "$json"
    done

    for srs in "$dir"**/*.srs; do
        [ -f "$srs" ] || continue
        verify_srs "$srs"
    done
done

if [ $FAIL -ne 0 ]; then
    echo ""
    echo "=== VERIFICATION FAILED — rules NOT published ==="
    exit 1
fi

echo ""
echo "=== All rules verified OK ==="
exit 0
