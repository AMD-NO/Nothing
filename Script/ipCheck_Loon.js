console.log($environment.params);

const url = "https://api.ip.sb/geoip";
const inputParams = $environment.params;
const nodeName = inputParams.node;

const requestParams = {
  url: url,
  node: nodeName
};

let message = "";
const paras = ["ip", "isp", "country_code", "city", "timezone"];
const paran = ["IP", "ISP", "地区", "城市", "时区"];

$httpClient.get(requestParams, (error, response, data) => {
  if (error) {
    message = "<br><br>❗️查询超时❗️";
    message = "<p style='text-align: center; font-family: -apple-system; font-size: large; font-weight: bold'>" + message + "</p>";
    $done({ title: "IP.SB 查询结果", htmlMessage: message });
  } else {
    console.log(data);
    message = data ? json2info(data, paras) : "";
    $done({ title: "IP.SB 查询结果", htmlMessage: message });
  }
});

function json2info(cnt, paras) {
  let res = "------------------------------";
  const parsedCnt = JSON.parse(cnt);
  console.log(parsedCnt);

  for (let i = 0; i < paras.length; i++) {
    parsedCnt[paras[i]] = 
      paras[i] === "country_code" 
        ? parsedCnt[paras[i]] + " " + (flags.get(parsedCnt[paras[i]].toUpperCase()) || "")
        : parsedCnt[paras[i]];
    res = parsedCnt[paras[i]]
      ? res + "<br><b><font color=>" + paran[i] + "</font> : </b><font color=>" + parsedCnt[paras[i]] + "</font><br>"
      : res;
  }

  res = res + "------------------------------<br><font color='#6959CD'><b>节点</b> ➟ " + $environment.params.node + "</font>";
  res = "<p style='text-align: center; font-family: -apple-system; font-size: large; font-weight: thin'>" + res + "</p>";
  return res;
}

const flags = new Map([
  ["AW", "🇦🇼"], ["AF", "🇦🇫"], ["AO", "🇦🇴"], ["AI", "🇦🇮"], ["AX", "🇦🇽"], ["AL", "🇦🇱"], 
  ["AD", "🇦🇩"], ["AE", "🇦🇪"], ["AR", "🇦🇷"], ["AM", "🇦🇲"], ["AS", "🇦🇸"], ["AQ", "🇦🇶"], 
  ["TF", "🇹🇫"], ["AG", "🇦🇬"], ["AU", "🇦🇺"], ["AT", "🇦🇹"], ["AZ", "🇦🇿"], ["BI", "🇧🇮"], 
  ["BE", "🇧🇪"], ["BJ", "🇧🇯"], ["BQ", "🇧🇶"], ["BF", "🇧🇫"], ["BD", "🇧🇩"], ["BG", "🇧🇬"], 
  ["BH", "🇧🇭"], ["BS", "🇧🇸"], ["BA", "🇧🇦"], ["BL", "🇧🇱"], ["BY", "🇧🇾"], ["BZ", "🇧🇿"], 
  ["BM", "🇧🇲"], ["BO", "🇧🇴"], ["BR", "🇧🇷"], ["BB", "🇧🇧"], ["BN", "🇧🇳"], ["BT", "🇧🇹"], 
  ["BV", "🇧🇻"], ["BW", "🇧🇼"], ["CF", "🇨🇫"], ["CA", "🇨🇦"], ["CC", "🇨🇨"], ["CH", "🇨🇭"], 
  ["CL", "🇨🇱"], ["CN", "🇨🇳"], ["CI", "🇨🇮"], ["CM", "🇨🇲"], ["CD", "🇨🇩"], ["CG", "🇨🇬"], 
  ["CK", "🇨🇰"], ["CO", "🇨🇴"], ["KM", "🇰🇲"], ["CV", "🇨🇻"], ["CR", "🇨🇷"], ["CU", "🇨🇺"], 
  ["CW", "🇨🇼"], ["CX", "🇨🇽"], ["CY", "🇨🇾"], ["CZ", "🇨🇿"], ["DE", "🇩🇪"], ["DJ", "🇩🇯"], 
  ["DK", "🇩🇰"], ["DM", "🇩🇲"], ["DO", "🇩🇴"], ["DZ", "🇩🇿"], ["EC", "🇪🇨"], ["EG", "🇪🇬"], 
  ["EH", "🇪🇭"], ["ER", "🇪🇷"], ["EE", "🇪🇪"], ["ES", "🇪🇸"], ["ET", "🇪🇹"], ["FI", "🇫🇮"], 
  ["FJ", "🇫🇯"], ["FM", "🇫🇲"], ["FO", "🇫🇴"], ["FR", "🇫🇷"], ["GA", "🇬🇦"], ["GB", "🇬🇧"], 
  ["GE", "🇬🇪"], ["GG", "🇬🇬"], ["GH", "🇬🇭"], ["GI", "🇬🇮"], ["GL", "🇬🇱"], ["GM", "🇬🇲"], 
  ["GN", "🇬🇳"], ["GP", "🇬🇵"], ["GQ", "🇬🇶"], ["GR", "🇬🇷"], ["GT", "🇬🇹"], ["GU", "🇬🇺"], 
  ["GW", "🇬🇼"], ["GY", "🇬🇾"], ["HK", "🇭🇰"], ["HM", "🇭🇲"], ["HN", "🇭🇳"], ["HR", "🇭🇷"], 
  ["HT", "🇭🇹"], ["HU", "🇭🇺"], ["ID", "🇮🇩"], ["IE", "🇮🇪"], ["IL", "🇮🇱"], ["IM", "🇮🇲"], 
  ["IN", "🇮🇳"], ["IO", "🇮🇴"], ["IQ", "🇮🇶"], ["IR", "🇮🇷"], ["IS", "🇮🇸"], ["IT", "🇮🇹"], 
  ["JE", "🇯🇪"], ["JM", "🇯🇲"], ["JO", "🇯🇴"], ["JP", "🇯🇵"], ["KE", "🇰🇪"], ["KG", "🇰🇬"], 
  ["KH", "🇰🇭"], ["KI", "🇰🇮"], ["KN", "🇰🇳"], ["KP", "🇰🇵"], ["KR", "🇰🇷"], ["KW", "🇰🇼"], 
  ["KY", "🇰🇾"], ["KZ", "🇰🇿"], ["LA", "🇱🇦"], ["LB", "🇱🇧"], ["LC", "🇱🇨"], ["LI", "🇱🇮"], 
  ["LK", "🇱🇰"], ["LR", "🇱🇷"], ["LS", "🇱🇸"], ["LT", "🇱🇹"], ["LU", "🇱🇺"], ["LV", "🇱🇻"], 
  ["LY", "🇱🇾"], ["MA", "🇲🇦"], ["MC", "🇲🇨"], ["MD", "🇲🇩"], ["ME", "🇲🇪"], ["MF", "🇲🇫"], 
  ["MG", "🇲🇬"], ["MH", "🇲🇭"], ["MK", "🇲🇰"], ["ML", "🇲🇱"], ["MM", "🇲🇲"], ["MN", "🇲🇳"], 
  ["MO", "🇲🇴"], ["MP", "🇲🇵"], ["MQ", "🇲🇶"], ["MR", "🇲🇷"], ["MS", "🇲🇸"], ["MT", "🇲🇹"], 
  ["MU", "🇲🇺"], ["MV", "🇲🇻"], ["MW", "🇲🇼"], ["MX", "🇲🇽"], ["MY", "🇲🇾"], ["MZ", "🇲🇿"], 
  ["NA", "🇳🇦"], ["NC", "🇳🇨"], ["NE", "🇳🇪"], ["NF", "🇳🇫"], ["NG", "🇳🇬"], ["NI", "🇳🇮"], 
  ["NL", "🇳🇱"], ["NO", "🇳🇴"], ["NP", "🇳🇵"], ["NR", "🇳🇷"], ["NU", "🇳🇺"], ["NZ", "🇳🇿"], 
  ["OM", "🇴🇲"], ["PA", "🇵🇦"], ["PE", "🇵🇪"], ["PF", "🇵🇫"], ["PG", "🇵🇬"], ["PH", "🇵🇭"], 
  ["PK", "🇵🇰"], ["PL", "🇵🇱"], ["PM", "🇵🇲"], ["PN", "🇵🇳"], ["PR", "🇵🇷"], ["PT", "🇵🇹"], 
  ["PW", "🇵🇼"], ["PY", "🇵🇾"], ["QA", "🇶🇦"], ["RE", "🇷🇪"], ["RO", "🇷🇴"], ["RS", "🇷🇸"], 
  ["RU", "🇷🇺"], ["RW", "🇷🇼"], ["SA", "🇸🇦"], ["SB", "🇸🇧"], ["SC", "🇸🇨"], ["SD", "🇸🇩"], 
  ["SE", "🇸🇪"], ["SG", "🇸🇬"], ["SH", "🇸🇭"], ["SI", "🇸🇮"], ["SJ", "🇸🇯"], ["SK", "🇸🇰"], 
  ["SL", "🇸🇱"], ["SM", "🇸🇲"], ["SN", "🇸🇳"], ["SO", "🇸🇴"], ["SR", "🇸🇷"], ["SS", "🇸🇸"], 
  ["ST", "🇸🇹"], ["SV", "🇸🇻"], ["SX", "🇸🇽"], ["SY", "🇸🇾"], ["SZ", "🇸🇿"], ["TC", "🇹🇨"], 
  ["TD", "🇹🇩"], ["TG", "🇹🇬"], ["TH", "🇹🇭"], ["TJ", "🇹🇯"], ["TK", "🇹🇰"], ["TL", "🇹🇱"], 
  ["TM", "🇹🇲"], ["TN", "🇹🇳"], ["TO", "🇹🇴"], ["TR", "🇹🇷"], ["TT", "🇹🇹"], ["TV", "🇹🇻"], 
  ["TZ", "🇹🇿"], ["UA", "🇺🇦"], ["UG", "🇺🇬"], ["UM", "🇺🇲"], ["US", "🇺🇸"], ["UY", "🇺🇾"], 
  ["UZ", "🇺🇿"], ["VA", "🇻🇦"], ["VC", "🇻🇨"], ["VE", "🇻🇪"], ["VG", "🇻🇬"], ["VI", "🇻🇮"], 
  ["VN", "🇻🇳"], ["VU", "🇻🇺"], ["WF", "🇼🇫"], ["WS", "🇼🇸"], ["YE", "🇾🇪"], ["YT", "🇾🇹"], 
  ["ZA", "🇿🇦"], ["ZM", "🇿🇲"], ["ZW", "🇿🇼"], ["TW", "🇹🇼"]
]);
