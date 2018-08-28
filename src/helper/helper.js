import './api-2.0';
import axios from 'axios';
import { AtdToast } from '../comps/index'
//获取cookie
const getCookie = (name) => {
    var maps = {};
    var cookArr = document.cookie.split(';')
    for (var i in cookArr) {
        var tmp = cookArr[i].replace(/^\s*/, '');
        if (tmp) {
            var nv = tmp.split('=');
            maps[nv[0]] = nv[1] || '';
        }
    }
    return maps[name] || '';
}
let URL = '';
if (window.location.host == 'bu.chelun.com') {
    URL = "//finance.chelun.com"
} else if (window.location.host == 'bupre.chelun.com') {
    URL = "//financepre.chelun.com"
} else {
    URL = "//finance-test.chelun.com"
} //定义API URL 地址
const REG = /localhost|10.10|h5-test|bu-test|bupre/
const ISDEV = REG.test(window.location.host)   //是否是开发环境

const debug = () => {
    // 支持console
    var url = '//cdn.jsdelivr.net/eruda/1.2.2/eruda.min.js'
    if (url && ISDEV) {
        var script = document.createElement('script');
        script.src = url;
        window.onload = function () {
            document.body.appendChild(script);
            script.onload = function () {
                eruda.init()
            };
        }
    }
}
debug()

// 是否登录
const _isLogin = () => {
    var isLogin = getCookie('chelun_acToken');
    if (!isLogin) {
        isLogin = 'false';
    }
    return isLogin !== 'false';
}

// 是否是App
const _isApp = () => {
    var isApp = getCookie('chelun_appName');
    if (!isApp) {
        isApp = 'false';
    }
    return isApp !== 'false';
}

console.log("ISDEV", ISDEV)
console.log("ISAPP", _isApp())

//模拟数据提交
const PARAMS = !_isApp() ? {
    ac_token: 'u10002063_531391_xKIs45vvazm3zHYt', //chelun_acToken
    app: 'queryviolations', // chelun_appName
    appVersion: '7.0.2', //chelun_appVersion
    model: 'OPPO R9 Plustm A', //chelun_device
    os: 'android', //chelun_osType
    systemVersion: '5.1.1', //chelun_osVersion
    openUDID: 'b348fbc0-b11c-3581-977e-b6613bac7203', //chelun_uuid
    appChannel: 'test' //chelun_appChannel    
} : {
        ac_token: getCookie('chelun_acToken'),
        app: getCookie('chelun_appName'),
        appVersion: getCookie('chelun_appVersion'),
        model: getCookie('chelun_device'),
        os: getCookie('chelun_osType'),
        systemVersion: getCookie('chelun_osVersion'),
        openUDID: getCookie('chelun_uuid'),
        appChannel: getCookie('chelun_appChannel')
    } //定义Fake数据
// PARAMS.test = 1;
//"//10.10.13.101"
//HTTP 注入参数
const _HTTP = axios.create({
    baseURL: false || URL,
    timeout: 20000,
    // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    params: PARAMS,
    withCredentials: true //携带cookie
})



//自动登录
const _Applogin = (Close) => {
    !_isApp() ? console.log("开发环境绕过jsBraide login") : chelunJSBridge.invoke('app', 'login', {
        loginCallBackName(res) {
            if (res.result != 1 && Close) {
                // chelunJSBridge.invoke('app', 'closeWebView');
                window.location.href = './#/index'
            }
            if (res.result == 1) {
                window.location.reload();
            }

        }
    })
}

//双标题设置 
const _setTitle = (title = '') => {
    !_isApp() ? console.log("开发环境绕过jsBraide setTitle") : chelunJSBridge.invoke('ui', 'setTitle', { title });
    document.title = title;
}
//埋点设置
const _stat = (label, eventId = 'xiaolong') => {
    !_isApp() ? console.log("开发环境绕过jsBraide event") : chelunJSBridge.invoke('app', 'event', { eventId, label });
}
//获取通讯录
const _addressBook = (fn) => { !_isApp() ? console.log("开发环境绕过jsBraide addressBook people") : chelunJSBridge.invoke('addressBook', 'people', { addressBookCallBackName: fn }) }

//face++ 授权获取
const _face = (fn) => { !_isApp() ? console.log("开发环境绕过jsBraide face license") : chelunJSBridge.invoke('face', 'license', { licenseCallBackName: fn }) }

//获取身份证事务id
const _getCardTid = (fn, platform_id) => {
    if (localStorage.getItem("platform_id")) {
        platform_id = localStorage.getItem("platform_id")
    };
    _HTTP.get("/FacePlus/getIdentityCardTid?isrepeat=1&platform_id=" + platform_id).then(fn)
}
//获取活体事务id
const _getLiveTid = (fn, platform_id) => {
    if (localStorage.getItem("platform_id")) {
        platform_id = localStorage.getItem("platform_id")
    };
    _HTTP.get("/FacePlus/getFaceVerifyTid?platform_id=" + platform_id).then(fn)
}
//face++ 身份证识别
const _idCard = (tid, side, fn) => { !_isApp() ? console.log("开发环境绕过jsBraide face idCard") : chelunJSBridge.invoke('face', 'idCard', { tid, side, callback: fn }) }
//face++ 活体识别
const _live = (tid, idcardTid, callback, action = 3, timeout = 10) => {
    !_isApp() ? console.log("开发环境绕过jsBraide face idCard")
        :
        chelunJSBridge.invoke('face', 'live', { tid, idcardTid, action, timeout, callback })
}


var { license, tid } = false

//封装的 活体识别方法
const _faceLive = (fn, action = 3, timeout = 10) => {
    _face(res => {
        if (res.data.license == "1") {
            console.log("获取授权成功", res.data)
            _getLiveTid(res => {
                if (res.data.code === 0) {
                    console.log("获取活体识别事务id成功", res.data.data)
                    _live(res.data.data.tid, res.data.data.idcard_tid, fn)
                } else {
                    console.log("获取活体识别事务id失败", res)
                }
            })
        } else {
            console.log("获取授权失败", res)
        }
    })

    // 活体事务id 身份证事务id 回调函数 验证次数
    //_live(liveid,idcardTid,fn,action,timeout)
}


// 封装的 身份证OCR识别方法
const _faceIdCard = (fn, platform_id, side = "0") => {
    if (license) {
        console.log("license有授权", license)
        if (tid) {
            console.log("tid存在", tid)
            _idCard(tid, side, fn)
        } else {
            console.log("tid不存在")
            _getCardTid(res => {
                if (res.data.code === 0) {
                    console.log("获取事务id 成功", res.data.data)
                    tid = res.data.data.tid
                    _faceIdCard(fn, platform_id, side)
                    // _idCard(tid, side, fn)
                } else {
                    AtdToast.fail(res.data.message)
                    console.log("获取事务id 失败", res.data)
                }
            }, platform_id)

        }
    } else {
        console.log("license没有授权")
        _face(res => {
            if (res.data.license == "1") {
                console.log("获取license授权成功", res.data.license)
                license = res.data.license
                _faceIdCard(fn, side)
            } else {
                console.log("获取license授权失败", res)
            }
        })

    }
}


const _openQ = (qq) => {
    if ((/iphone|ipad/gi).test(navigator.userAgent)) {
        chelunJSBridge.invoke('app', 'isAppInstalled', {
            os: 'ios',
            name: 'mqq',
            callback: (res) => {
                if (res && res.data && res.data.code == 1) {
                    window.location.href = "mqqwpa://im/chat?chat_type=wpa&uin=" + qq + "&version=1&src_type=web&web_src=qq.com";
                } else {
                    let url = "https://itunes.apple.com/cn/app/qq/id444934666?mt=8";
                    chelunJSBridge.invoke('ui', 'openInnerBrowser', { url });
                    //window.location.href="https://itunes.apple.com/cn/app/qq/id444934666?mt=8";
                }
            }
        });
    } else {
        chelunJSBridge.invoke('app', 'isAppInstalled', {
            os: 'android',
            name: 'com.tencent.mobileqq',
            callback: (res) => {
                if (res && res.data && res.data.code == 1) {
                    window.location.href = "mqqwpa://im/chat?chat_type=wpa&uin=" + qq;
                } else {
                    window.location.href = "market://details?id=com.tencent.mobileqq";
                }
            }
        });
    }
}

const adbook = (fn) => {
    chelunJSBridge.invoke('addressBook', 'people', {
        addressBookCallBackName: fn
    })
}

export {
    _setTitle,
    _Applogin,
    _isLogin,
    _HTTP,
    _stat,
    _faceIdCard,
    _debug,
    URL,
    tid,
    _addressBook,
    _faceLive,
    _openQ,
    adbook
    , PARAMS
}




