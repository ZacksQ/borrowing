(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{139:function(e,r,t){"use strict";(function(e){var r=t(22),o=t.n(r);!function(r,t){"object"===o()(e)&&"object"===o()(e.exports)?e.exports=t(r):t(r)}("undefined"!=typeof window?window:void 0,function(e){var r={callbackIndex:0,callbackPrefix:"__MCL_CALLBACK_",schema:"chelunJSBridge",invoke:function(e,r,t){e=String(e),r=String(r);var n=this.schema+"://"+e+"/"+r;t&&"object"===(void 0===t?"undefined":o()(t))&&(n+=this._buildQuery(t)),this._sendRequest(n)},_buildQuery:function(e){var r=[],t="",o="";for(var n in e)if(e.hasOwnProperty(n))if(e[n]&&"function"==typeof e[n]){var i=this._createCallbackNo(e[n]);"callback"===n?t="#"+i:r.push(encodeURIComponent(n)+"="+i)}else{var l=String(e[n]);r.push(encodeURIComponent(n)+"="+encodeURIComponent(l))}return r.length&&(o+="?"+r.join("&")),o+t},_createCallbackNo:function(r){var t=this.callbackIndex;return e[this.callbackPrefix+t]=r,this.callbackIndex+=1,t},_sendRequest:function(e){var r=document.createElement("iframe");r.style.display="none",r.onload=function(){r.parentNode.removeChild(r)},r.src=e,document.body.appendChild(r)}};return e.chelunJSBridge=r})}).call(this,t(10)(e))},155:function(e,r,t){"use strict";var o=t(77),n=Object.prototype.hasOwnProperty,i={allowDots:!1,allowPrototypes:!1,arrayLimit:20,decoder:o.decode,delimiter:"&",depth:5,parameterLimit:1e3,plainObjects:!1,strictNullHandling:!1},l=function(e,r,t){if(e){var o=t.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,i=/(\[[^[\]]*])/g,l=/(\[[^[\]]*])/.exec(o),a=l?o.slice(0,l.index):o,c=[];if(a){if(!t.plainObjects&&n.call(Object.prototype,a)&&!t.allowPrototypes)return;c.push(a)}for(var s=0;null!==(l=i.exec(o))&&s<t.depth;){if(s+=1,!t.plainObjects&&n.call(Object.prototype,l[1].slice(1,-1))&&!t.allowPrototypes)return;c.push(l[1])}return l&&c.push("["+o.slice(l.index)+"]"),function(e,r,t){for(var o=r,n=e.length-1;n>=0;--n){var i,l=e[n];if("[]"===l)i=(i=[]).concat(o);else{i=t.plainObjects?Object.create(null):{};var a="["===l.charAt(0)&&"]"===l.charAt(l.length-1)?l.slice(1,-1):l,c=parseInt(a,10);!isNaN(c)&&l!==a&&String(c)===a&&c>=0&&t.parseArrays&&c<=t.arrayLimit?(i=[])[c]=o:i[a]=o}o=i}return o}(c,r,t)}};e.exports=function(e,r){var t=r?o.assign({},r):{};if(null!==t.decoder&&void 0!==t.decoder&&"function"!=typeof t.decoder)throw new TypeError("Decoder has to be a function.");if(t.ignoreQueryPrefix=!0===t.ignoreQueryPrefix,t.delimiter="string"==typeof t.delimiter||o.isRegExp(t.delimiter)?t.delimiter:i.delimiter,t.depth="number"==typeof t.depth?t.depth:i.depth,t.arrayLimit="number"==typeof t.arrayLimit?t.arrayLimit:i.arrayLimit,t.parseArrays=!1!==t.parseArrays,t.decoder="function"==typeof t.decoder?t.decoder:i.decoder,t.allowDots="boolean"==typeof t.allowDots?t.allowDots:i.allowDots,t.plainObjects="boolean"==typeof t.plainObjects?t.plainObjects:i.plainObjects,t.allowPrototypes="boolean"==typeof t.allowPrototypes?t.allowPrototypes:i.allowPrototypes,t.parameterLimit="number"==typeof t.parameterLimit?t.parameterLimit:i.parameterLimit,t.strictNullHandling="boolean"==typeof t.strictNullHandling?t.strictNullHandling:i.strictNullHandling,""===e||null===e||void 0===e)return t.plainObjects?Object.create(null):{};for(var a="string"==typeof e?function(e,r){for(var t={},o=r.ignoreQueryPrefix?e.replace(/^\?/,""):e,l=r.parameterLimit===1/0?void 0:r.parameterLimit,a=o.split(r.delimiter,l),c=0;c<a.length;++c){var s,d,u=a[c],p=u.indexOf("]="),f=-1===p?u.indexOf("="):p+1;-1===f?(s=r.decoder(u,i.decoder),d=r.strictNullHandling?null:""):(s=r.decoder(u.slice(0,f),i.decoder),d=r.decoder(u.slice(f+1),i.decoder)),n.call(t,s)?t[s]=[].concat(t[s]).concat(d):t[s]=d}return t}(e,t):e,c=t.plainObjects?Object.create(null):{},s=Object.keys(a),d=0;d<s.length;++d){var u=s[d],p=l(u,a[u],t);c=o.merge(c,p,t)}return o.compact(c)}},156:function(e,r,t){"use strict";var o=t(77),n=t(76),i={brackets:function(e){return e+"[]"},indices:function(e,r){return e+"["+r+"]"},repeat:function(e){return e}},l=Date.prototype.toISOString,a={delimiter:"&",encode:!0,encoder:o.encode,encodeValuesOnly:!1,serializeDate:function(e){return l.call(e)},skipNulls:!1,strictNullHandling:!1},c=function e(r,t,n,i,l,c,s,d,u,p,f,g){var h=r;if("function"==typeof s)h=s(t,h);else if(h instanceof Date)h=p(h);else if(null===h){if(i)return c&&!g?c(t,a.encoder):t;h=""}if("string"==typeof h||"number"==typeof h||"boolean"==typeof h||o.isBuffer(h))return c?[f(g?t:c(t,a.encoder))+"="+f(c(h,a.encoder))]:[f(t)+"="+f(String(h))];var y,v=[];if(void 0===h)return v;if(Array.isArray(s))y=s;else{var m=Object.keys(h);y=d?m.sort(d):m}for(var j=0;j<y.length;++j){var b=y[j];l&&null===h[b]||(v=Array.isArray(h)?v.concat(e(h[b],n(t,b),n,i,l,c,s,d,u,p,f,g)):v.concat(e(h[b],t+(u?"."+b:"["+b+"]"),n,i,l,c,s,d,u,p,f,g)))}return v};e.exports=function(e,r){var t=e,l=r?o.assign({},r):{};if(null!==l.encoder&&void 0!==l.encoder&&"function"!=typeof l.encoder)throw new TypeError("Encoder has to be a function.");var s=void 0===l.delimiter?a.delimiter:l.delimiter,d="boolean"==typeof l.strictNullHandling?l.strictNullHandling:a.strictNullHandling,u="boolean"==typeof l.skipNulls?l.skipNulls:a.skipNulls,p="boolean"==typeof l.encode?l.encode:a.encode,f="function"==typeof l.encoder?l.encoder:a.encoder,g="function"==typeof l.sort?l.sort:null,h=void 0!==l.allowDots&&l.allowDots,y="function"==typeof l.serializeDate?l.serializeDate:a.serializeDate,v="boolean"==typeof l.encodeValuesOnly?l.encodeValuesOnly:a.encodeValuesOnly;if(void 0===l.format)l.format=n.default;else if(!Object.prototype.hasOwnProperty.call(n.formatters,l.format))throw new TypeError("Unknown format option provided.");var m,j,b=n.formatters[l.format];"function"==typeof l.filter?t=(j=l.filter)("",t):Array.isArray(l.filter)&&(m=j=l.filter);var w,k=[];if("object"!=typeof t||null===t)return"";w=l.arrayFormat in i?l.arrayFormat:"indices"in l?l.indices?"indices":"repeat":"indices";var P=i[w];m||(m=Object.keys(t)),g&&m.sort(g);for(var _=0;_<m.length;++_){var O=m[_];u&&null===t[O]||(k=k.concat(c(t[O],O,P,d,u,p?f:null,j,g,h,y,b,v)))}var C=k.join(s),A=!0===l.addQueryPrefix?"?":"";return C.length>0?A+C:""}},16:function(e,r,t){"use strict";var o=t(156),n=t(155),i=t(76);e.exports={formats:i,parse:n,stringify:o}},2:function(e,r,t){"use strict";(function(e){t.d(r,"g",function(){return y}),t.d(r,"b",function(){return h}),t.d(r,"f",function(){return u}),t.d(r,"c",function(){return g}),t.d(r,"h",function(){return v}),t.d(r,"d",function(){return A}),t.d(r,"j",function(){return O}),t.d(r,"e",function(){return C}),t.d(r,"i",function(){return B}),t.d(r,"a",function(){return f});t(139);var o=t(73),n=t.n(o),i=t(1);!function(){var r=t(3).enterModule;r&&r(e)}();var l=function(e){var r={},t=document.cookie.split(";");for(var o in t){var n=t[o].replace(/^\s*/,"");if(n){var i=n.split("=");r[i[0]]=i[1]||""}}return r[e]||""},a="";a="bu.chelun.com"==window.location.host?"//finance.chelun.com":"bupre.chelun.com"==window.location.host?"//financepre.chelun.com":"//finance-test.chelun.com";var c=/localhost|10.10|h5-test|bu-test|bupre/,s=c.test(window.location.host),d=function(){var e="//cdn.jsdelivr.net/eruda/1.2.2/eruda.min.js";if(s){var r=document.createElement("script");r.src=e,window.onload=function(){document.body.appendChild(r),r.onload=function(){eruda.init()}}}};d();var u=function(){var e=l("chelun_acToken");return e||(e="false"),"false"!==e},p=function(){var e=l("chelun_appName");return e||(e="false"),"false"!==e};console.log("ISDEV",s),console.log("ISAPP",p());var f=p()?{ac_token:l("chelun_acToken"),app:l("chelun_appName"),appVersion:l("chelun_appVersion"),model:l("chelun_device"),os:l("chelun_osType"),systemVersion:l("chelun_osVersion"),openUDID:l("chelun_uuid"),appChannel:l("chelun_appChannel")}:{ac_token:"u10002063_531391_xKIs45vvazm3zHYt",app:"queryviolations",appVersion:"7.0.2",model:"OPPO R9 Plustm A",os:"android",systemVersion:"5.1.1",openUDID:"b348fbc0-b11c-3581-977e-b6613bac7203",appChannel:"test"},g=n.a.create({baseURL:a,timeout:2e4,params:f,withCredentials:!0}),h=function(e){p()?chelunJSBridge.invoke("app","login",{loginCallBackName:function(r){1!=r.result&&e&&(window.location.href="./#/index"),1==r.result&&window.location.reload()}}):console.log("开发环境绕过jsBraide login")},y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";p()?chelunJSBridge.invoke("ui","setTitle",{title:e}):console.log("开发环境绕过jsBraide setTitle"),document.title=e},v=function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"xiaolong";p()?chelunJSBridge.invoke("app","event",{eventId:r,label:e}):console.log("开发环境绕过jsBraide event")},m=function(e){p()?chelunJSBridge.invoke("addressBook","people",{addressBookCallBackName:e}):console.log("开发环境绕过jsBraide addressBook people")},j=function(e){p()?chelunJSBridge.invoke("face","license",{licenseCallBackName:e}):console.log("开发环境绕过jsBraide face license")},b=function(e,r){localStorage.getItem("platform_id")&&(r=localStorage.getItem("platform_id")),g.get("/FacePlus/getIdentityCardTid?isrepeat=1&platform_id="+r).then(e)},w=function(e,r){localStorage.getItem("platform_id")&&(r=localStorage.getItem("platform_id")),g.get("/FacePlus/getFaceVerifyTid?platform_id="+r).then(e)},k=function(e,r,t){p()?chelunJSBridge.invoke("face","idCard",{tid:e,side:r,callback:t}):console.log("开发环境绕过jsBraide face idCard")},P=function(e,r,t){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:3,n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:10;p()?chelunJSBridge.invoke("face","live",{tid:e,idcardTid:r,action:o,timeout:n,callback:t}):console.log("开发环境绕过jsBraide face idCard")},_=(!1).license,O=(!1).tid,C=function(e){arguments.length>1&&void 0!==arguments[1]&&arguments[1],arguments.length>2&&void 0!==arguments[2]&&arguments[2];j(function(r){"1"==r.data.license?(console.log("获取授权成功",r.data),w(function(r){0===r.data.code?(console.log("获取活体识别事务id成功",r.data.data),P(r.data.data.tid,r.data.data.idcard_tid,e)):console.log("获取活体识别事务id失败",r)})):console.log("获取授权失败",r)})},A=function e(r,t){var o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"0";_?(console.log("license有授权",_),O?(console.log("tid存在",O),k(O,o,r)):(console.log("tid不存在"),b(function(n){0===n.data.code?(console.log("获取事务id 成功",n.data.data),O=n.data.data.tid,e(r,t,o)):(i.a.fail(n.data.message),console.log("获取事务id 失败",n.data))},t))):(console.log("license没有授权"),j(function(t){"1"==t.data.license?(console.log("获取license授权成功",t.data.license),_=t.data.license,e(r,o)):console.log("获取license授权失败",t)}))},E=function(e){/iphone|ipad/gi.test(navigator.userAgent)?chelunJSBridge.invoke("app","isAppInstalled",{os:"ios",name:"mqq",callback:function(r){if(r&&r.data&&1==r.data.code)window.location.href="mqqwpa://im/chat?chat_type=wpa&uin="+e+"&version=1&src_type=web&web_src=qq.com";else{chelunJSBridge.invoke("ui","openInnerBrowser",{url:"https://itunes.apple.com/cn/app/qq/id444934666?mt=8"})}}}):chelunJSBridge.invoke("app","isAppInstalled",{os:"android",name:"com.tencent.mobileqq",callback:function(r){r&&r.data&&1==r.data.code?window.location.href="mqqwpa://im/chat?chat_type=wpa&uin="+e:window.location.href="market://details?id=com.tencent.mobileqq"}})},B=function(e){chelunJSBridge.invoke("addressBook","people",{addressBookCallBackName:e})};!function(){var r=t(3).default,o=t(3).leaveModule;r&&(r.register(l,"getCookie","E:/Project/long/src/helper/helper.js"),r.register(a,"URL","E:/Project/long/src/helper/helper.js"),r.register(c,"REG","E:/Project/long/src/helper/helper.js"),r.register(s,"ISDEV","E:/Project/long/src/helper/helper.js"),r.register(d,"debug","E:/Project/long/src/helper/helper.js"),r.register(u,"_isLogin","E:/Project/long/src/helper/helper.js"),r.register(p,"_isApp","E:/Project/long/src/helper/helper.js"),r.register(f,"PARAMS","E:/Project/long/src/helper/helper.js"),r.register(g,"_HTTP","E:/Project/long/src/helper/helper.js"),r.register(h,"_Applogin","E:/Project/long/src/helper/helper.js"),r.register(y,"_setTitle","E:/Project/long/src/helper/helper.js"),r.register(v,"_stat","E:/Project/long/src/helper/helper.js"),r.register(m,"_addressBook","E:/Project/long/src/helper/helper.js"),r.register(j,"_face","E:/Project/long/src/helper/helper.js"),r.register(b,"_getCardTid","E:/Project/long/src/helper/helper.js"),r.register(w,"_getLiveTid","E:/Project/long/src/helper/helper.js"),r.register(k,"_idCard","E:/Project/long/src/helper/helper.js"),r.register(P,"_live","E:/Project/long/src/helper/helper.js"),r.register(_,"license","E:/Project/long/src/helper/helper.js"),r.register(O,"tid","E:/Project/long/src/helper/helper.js"),r.register(C,"_faceLive","E:/Project/long/src/helper/helper.js"),r.register(A,"_faceIdCard","E:/Project/long/src/helper/helper.js"),r.register(E,"_openQ","E:/Project/long/src/helper/helper.js"),r.register(B,"adbook","E:/Project/long/src/helper/helper.js"),o(e))}()}).call(this,t(10)(e))},76:function(e,r,t){"use strict";var o=String.prototype.replace,n=/%20/g;e.exports={default:"RFC3986",formatters:{RFC1738:function(e){return o.call(e,n,"+")},RFC3986:function(e){return e}},RFC1738:"RFC1738",RFC3986:"RFC3986"}},77:function(e,r,t){"use strict";var o=Object.prototype.hasOwnProperty,n=function(){for(var e=[],r=0;r<256;++r)e.push("%"+((r<16?"0":"")+r.toString(16)).toUpperCase());return e}(),i=function(e,r){for(var t=r&&r.plainObjects?Object.create(null):{},o=0;o<e.length;++o)void 0!==e[o]&&(t[o]=e[o]);return t};e.exports={arrayToObject:i,assign:function(e,r){return Object.keys(r).reduce(function(e,t){return e[t]=r[t],e},e)},compact:function(e){for(var r=[{obj:{o:e},prop:"o"}],t=[],o=0;o<r.length;++o)for(var n=r[o],i=n.obj[n.prop],l=Object.keys(i),a=0;a<l.length;++a){var c=l[a],s=i[c];"object"==typeof s&&null!==s&&-1===t.indexOf(s)&&(r.push({obj:i,prop:c}),t.push(s))}return function(e){for(var r;e.length;){var t=e.pop();if(r=t.obj[t.prop],Array.isArray(r)){for(var o=[],n=0;n<r.length;++n)void 0!==r[n]&&o.push(r[n]);t.obj[t.prop]=o}}return r}(r)},decode:function(e){try{return decodeURIComponent(e.replace(/\+/g," "))}catch(r){return e}},encode:function(e){if(0===e.length)return e;for(var r="string"==typeof e?e:String(e),t="",o=0;o<r.length;++o){var i=r.charCodeAt(o);45===i||46===i||95===i||126===i||i>=48&&i<=57||i>=65&&i<=90||i>=97&&i<=122?t+=r.charAt(o):i<128?t+=n[i]:i<2048?t+=n[192|i>>6]+n[128|63&i]:i<55296||i>=57344?t+=n[224|i>>12]+n[128|i>>6&63]+n[128|63&i]:(o+=1,i=65536+((1023&i)<<10|1023&r.charCodeAt(o)),t+=n[240|i>>18]+n[128|i>>12&63]+n[128|i>>6&63]+n[128|63&i])}return t},isBuffer:function(e){return null!==e&&void 0!==e&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))},isRegExp:function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},merge:function e(r,t,n){if(!t)return r;if("object"!=typeof t){if(Array.isArray(r))r.push(t);else{if("object"!=typeof r)return[r,t];(n.plainObjects||n.allowPrototypes||!o.call(Object.prototype,t))&&(r[t]=!0)}return r}if("object"!=typeof r)return[r].concat(t);var l=r;return Array.isArray(r)&&!Array.isArray(t)&&(l=i(r,n)),Array.isArray(r)&&Array.isArray(t)?(t.forEach(function(t,i){o.call(r,i)?r[i]&&"object"==typeof r[i]?r[i]=e(r[i],t,n):r.push(t):r[i]=t}),r):Object.keys(t).reduce(function(r,i){var l=t[i];return o.call(r,i)?r[i]=e(r[i],l,n):r[i]=l,r},l)}}}}]);