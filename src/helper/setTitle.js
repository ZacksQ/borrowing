import chelunJSBridge from '../../../../libs/jsBridge/api-2.0';

export default function _stat(title='车轮理财'){
    chelunJSBridge.invoke('ui', 'setTitle', {title});
}