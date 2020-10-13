var url = require("url");

var curUrl = url.parse('https://www.google.co.kr/search?source=hp&q=node&oq=node&gs_l=psy-ab.3..35i39k1l6.881.2011.0.2180.7.6.0.0.0.0.175.175.0j1.2.0.foo%2Cnso-ehuqi%3D1%2Cnso-ehuui%3D1%2Cewh%3D0%2Cnso-mplt%3D2%2Cnso-enksa%3D0%2Cnso-enfk%3D1%2Cnso-usnt%3D1%2Cnso-qnt-npqp%3D0-1512%2Cnso-qnt-npdq%3D0-5418%2Cnso-qnt-npt%3D0-1302%2Cnso-qnt-ndc%3D1892%2Ccspa-dspm-nm-mnp%3D0-0651%2Ccspa-dspm-nm-mxp%3D0-16275%2Cnso-unt-npqp%3D0-2412%2Cnso-unt-npdq%3D0-4037%2Cnso-unt-npt%3D0-2196%2Cnso-unt-ndc%3D301%2Ccspa-uipm-nm-mnp%3D0-02745%2Ccspa-uipm-nm-mxp%3D0-19215%2Ccfro%3D1...0...1.1.64.psy-ab..5.2.317.6..0i131k1j0i10k1.143.iZPRPETXK2c');
console.log(curUrl.host);

var curStr = url.format(curUrl);
console.log(curStr);