// geourl
const geourl = {
    geoip: "https://cdn.jsdelivr.net/gh/Loyalsoldier/v2ray-rules-dat@release/geoip.dat",
    geosite: "https://cdn.jsdelivr.net/gh/Loyalsoldier/v2ray-rules-dat@release/geosite.dat",
    mmdb: "https://cdn.jsdelivr.net/gh/Loyalsoldier/geoip@release/Country.mmdb",
    asn: "https://github.com/xishang0128/geoip/releases/download/latest/GeoLite2-ASN.mmdb"
};

// hosts
const hostsd = {
    'tblog.fbicloud.com': '192.168.123.9'
};


// 国内DNS服务器
const domesticNameservers = [
    "https://223.5.5.5/dns-query", // 阿里云公共DNS
    "https://223.6.6.6/dns-query", // 阿里云公共DNS
];
// 国外DNS服务器
const foreignNameservers = [
    "https://1.1.1.1/dns-query", // Cloudflare(主)
    "https://1.0.0.1/dns-query", // Cloudflare(备)
];

// DNS配置
const dnsConfig = {
    "enable": true,
    "listen": "0.0.0.0:1053",
    "ipv6": false,
    "use-system-hosts": false,
    "cache-algorithm": "arc",
    "enhanced-mode": "fake-ip",
    "fake-ip-range": "198.18.0.1/16",
    "fake-ip-filter": [
        // 本地主机/设备
        "+.lan",
        "+.local",
        // Windows网络出现小地球图标
        "+.msftconnecttest.com",
        "+.msftncsi.com",
        // QQ快速登录检测失败
        "localhost.ptlogin2.qq.com",
        "localhost.sec.qq.com",
        // 微信快速登录检测失败
        "localhost.work.weixin.qq.com"
    ],
    "default-nameserver": ["223.5.5.5", "223.6.6.6"],
    "nameserver": [...domesticNameservers, ...foreignNameservers],
    "proxy-server-nameserver": [...domesticNameservers, ...foreignNameservers],
    "nameserver-policy": {
        "geosite:private,cn,geolocation-cn": domesticNameservers,
        "geosite:google,youtube,telegram,gfw,geolocation-!cn": foreignNameservers
    }
};
// 规则集通用配置
const ruleProviderCommon = {
    "type": "http",
    "format": "yaml",
    "interval": 86400
};
// 规则集配置
const ruleProviders = {
    "Apple": {
        ...ruleProviderCommon,
        "behavior": "classical",
        "url": "https://github.com/blackmatrix7/ios_rule_script/blob/master/rule/Clash/Apple/Apple_Classical.yaml?raw=1",
        "path": "./ruleset/bl7/Apple.yaml"
    },
    "Google": {
        ...ruleProviderCommon,
        "behavior": "classical",
        "url": "https://github.com/blackmatrix7/ios_rule_script/blob/master/rule/Clash/Google/Google.yaml?raw=1",
        "path": "./ruleset/bl7/Google.yaml"
    },
    "Global": {
        ...ruleProviderCommon,
        "behavior": "classical",
        "url": "https://github.com/blackmatrix7/ios_rule_script/blob/master/rule/Clash/Global/Global_Classical.yaml?raw=1",
        "path": "./ruleset/bl7/Global.yaml"
    },
    "GlobalMedia": {
        ...ruleProviderCommon,
        "behavior": "classical",
        "url": "https://github.com/blackmatrix7/ios_rule_script/blob/master/rule/Clash/GlobalMedia/GlobalMedia_Classical.yaml?raw=1",
        "path": "./ruleset/bl7/GlobalMedia.yaml"
    },
    "China": {
        ...ruleProviderCommon,
        "behavior": "classical",
        "url": "https://github.com/blackmatrix7/ios_rule_script/blob/master/rule/Clash/China/China_Classical.yaml?raw=1",
        "path": "./ruleset/bl7/China.yaml"
    },
    "ChinaMedia": {
        ...ruleProviderCommon,
        "behavior": "classical",
        "url": "https://github.com/blackmatrix7/ios_rule_script/blob/master/rule/Clash/ChinaMedia/ChinaMedia.yaml?raw=1",
        "path": "./ruleset/bl7/ChinaMedia.yaml"
    },
    "GlobalMedia": {
        ...ruleProviderCommon,
        "behavior": "classical",
        "url": "https://github.com/blackmatrix7/ios_rule_script/blob/master/rule/Clash/GlobalMedia/GlobalMedia_Classical.yaml?raw=1",
        "path": "./ruleset/bl7/GlobalMedia.yaml"
    },
    "Game": {
        ...ruleProviderCommon,
        "behavior": "classical",
        "url": "https://github.com/blackmatrix7/ios_rule_script/blob/master/rule/Clash/Game/Game.yaml?raw=1",
        "path": "./ruleset/bl7/Game.yaml"
    },
    "SteamCN": {
        ...ruleProviderCommon,
        "behavior": "classical",
        "url": "https://github.com/blackmatrix7/ios_rule_script/blob/master/rule/Clash/SteamCN/SteamCN.yaml?raw=1",
        "path": "./ruleset/bl7/SteamCN.yaml"
    },
    "GameDownload": {
        ...ruleProviderCommon,
        "behavior": "classical",
        "url": "https://github.com/blackmatrix7/ios_rule_script/blob/master/rule/Clash/Game/GameDownload/GameDownload.yaml?raw=1",
        "path": "./ruleset/bl7/GameDownload.yaml"
    },
    "Microsoft": {
        ...ruleProviderCommon,
        "behavior": "classical",
        "url": "https://github.com/blackmatrix7/ios_rule_script/blob/master/rule/Clash/Microsoft/Microsoft.yaml?raw=1",
        "path": "./ruleset/bl7/Microsoft.yaml"
    },
    "AkamaiCloud": {
        ...ruleProviderCommon,
        "behavior": "classical",
        "url": "https://github.com/blackmatrix7/ios_rule_script/blob/master/rule/Clash/Cloud/AkamaiCloud/AkamaiCloud.yaml?raw=1",
        "path": "./ruleset/bl7/AkamaiCloud.yaml"
    },
    "Intel": {
        ...ruleProviderCommon,
        "behavior": "classical",
        "url": "https://github.com/blackmatrix7/ios_rule_script/blob/master/rule/Clash/Intel/Intel.yaml?raw=1",
        "path": "./ruleset/bl7/Intel.yaml"
    },
    "Lan": {
        ...ruleProviderCommon,
        "behavior": "classical",
        "url": "https://github.com/blackmatrix7/ios_rule_script/blob/master/rule/Clash/Lan/Lan.yaml?raw=1",
        "path": "./ruleset/bl7/Lan.yaml"
    }
};
// 规则
const rules = [
    // // 自定义规则
    // "DOMAIN-SUFFIX,googleapis.cn,节点选择", // Google服务
    // "DOMAIN-SUFFIX,gstatic.com,节点选择", // Google静态资源
    // "DOMAIN-SUFFIX,xn--ngstr-lra8j.com,节点选择", // Google Play下载服务
    // "DOMAIN-SUFFIX,github.io,节点选择", // Github Pages
    // "DOMAIN,v2rayse.com,节点选择", // V2rayse节点工具
    // // Loyalsoldier 规则集
    // "RULE-SET,applications,全局直连",
    // "RULE-SET,private,全局直连",
    // "RULE-SET,reject,广告过滤",
    // "RULE-SET,icloud,微软服务",
    // "RULE-SET,apple,苹果服务",
    // "RULE-SET,google,谷歌服务",
    // "RULE-SET,proxy,节点选择",
    // "RULE-SET,gfw,节点选择",
    // "RULE-SET,tld-not-cn,节点选择",
    // "RULE-SET,direct,全局直连",
    // "RULE-SET,lancidr,全局直连,no-resolve",
    // "RULE-SET,cncidr,全局直连,no-resolve",
    // "RULE-SET,telegramcidr,电报消息,no-resolve",
    // // 其他规则
    // "GEOIP,LAN,全局直连,no-resolve",
    // "GEOIP,CN,全局直连,no-resolve",
    // "MATCH,漏网之鱼"
    "RULE-SET,Apple,苹果服务",
    "RULE-SET,Microsoft,微软服务",
    "RULE-SET,AkamaiCloud,全局直连",
    "RULE-SET,Intel,全局直连",
    "RULE-SET,ChinaMedia,全局直连",
    "RULE-SET,China,全局直连",
    "RULE-SET,GameDownload,全局直连",
    "RULE-SET,SteamCN,全局直连",
    "RULE-SET,GlobalMedia,节点选择",
    "RULE-SET,Global,节点选择",
    "RULE-SET,Lan,全局直连",
    "GEOIP,LAN,全局直连",
    "GEOIP,CN,全局直连",
    "GEOSITE,CN,全局直连",
    "MATCH,漏网之鱼"
];
// 代理组通用配置
const groupBaseOption = {
    "interval": 300,
    "timeout": 3000,
    "url": "http://cp.cloudflare.com/generate_204",
    "lazy": true,
    "max-failed-times": 3,
    "hidden": false
};

// 程序入口
function main(config) {
    const proxyCount = config?.proxies?.length ?? 0;
    const proxyProviderCount =
        typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
    if (proxyCount === 0 && proxyProviderCount === 0) {
        throw new Error("配置文件中未找到任何代理");
    }

    // 覆盖原配置中DNS配置
    config["dns"] = dnsConfig;

    // 覆盖原配置中geourl配置
    config["geox-url"] = geourl;
    config["geodata-mode"] = true;
    config["geo-auto-update"] = true;
    config["geo-update-interval"] = 24;
    config["global-client-fingerprint"] = 'chrome';
    config["ipv6"] = false;
    config["hosts"] = hostsd;



    // 覆盖原配置中的代理组
    config["proxy-groups"] = [
        {
            ...groupBaseOption,
            "name": "节点选择",
            "type": "select",
            "proxies": ["延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)"],
            "include-all": true,
            "exclude-filter": "UNM",
            "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg"
        },
        {
            ...groupBaseOption,
            "name": "延迟选优",
            "type": "url-test",
            "tolerance": 100,
            "include-all": true,
            "exclude-filter": "UNM",
            "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/speed.svg"
        },
        {
            ...groupBaseOption,
            "name": "故障转移",
            "type": "fallback",
            "include-all": true,
            "exclude-filter": "UNM",
            "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/ambulance.svg"
        },
        {
            ...groupBaseOption,
            "name": "负载均衡(散列)",
            "type": "load-balance",
            "strategy": "consistent-hashing",
            "include-all": true,
            "exclude-filter": "UNM",
            "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/merry_go.svg"
        },
        {
            ...groupBaseOption,
            "name": "负载均衡(轮询)",
            "type": "load-balance",
            "strategy": "round-robin",
            "include-all": true,
            "exclude-filter": "UNM",
            "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/balance.svg"
        },
        // {
        //     ...groupBaseOption,
        //     "name": "谷歌服务",
        //     "type": "select",
        //     "proxies": ["节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "全局直连"],
        //     "include-all": true,
        //     "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google.svg"
        // },
        // {
        //     ...groupBaseOption,
        //     "name": "国外媒体",
        //     "type": "select",
        //     "proxies": ["节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "全局直连"],
        //     "include-all": true,
        //     "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/youtube.svg"
        // },
        // {
        //     ...groupBaseOption,
        //     "name": "电报消息",
        //     "type": "select",
        //     "proxies": ["节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "全局直连"],
        //     "include-all": true,
        //     "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/telegram.svg"
        // },
        {
            ...groupBaseOption,
            "name": "微软服务",
            "type": "select",
            "proxies": ["全局直连", "节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)"],
            "include-all": true,
            "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/microsoft.svg"
        },
        {
            ...groupBaseOption,
            "name": "苹果服务",
            "type": "select",
            "proxies": ["节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "全局直连"],
            "include-all": true,
            "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/apple.svg"
        },
        // {
        //     ...groupBaseOption,
        //     "name": "广告过滤",
        //     "type": "select",
        //     "proxies": ["REJECT", "DIRECT"],
        //     "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/bug.svg"
        // },
        {
            ...groupBaseOption,
            "name": "全局直连",
            "type": "select",
            "proxies": ["DIRECT", "节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)"],
            "include-all": true,
            "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg"
        },
        // {
        //     ...groupBaseOption,
        //     "name": "全局拦截",
        //     "type": "select",
        //     "proxies": ["REJECT", "DIRECT"],
        //     "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/block.svg"
        // },
        {
            ...groupBaseOption,
            "name": "漏网之鱼",
            "type": "select",
            "proxies": ["节点选择", "延迟选优", "故障转移", "负载均衡(散列)", "负载均衡(轮询)", "全局直连"],
            "include-all": true,
            "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg"
        }
    ];

    // 覆盖原配置中的规则
    config["rule-providers"] = ruleProviders;
    config["rules"] = rules;

    // 返回修改后的配置
    return config;
}