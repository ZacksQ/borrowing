import chelunJSBridge from '../../../../libs/jsBridge/api-2.0';
export default function _stat(label, eventId = '642_p2phome'){
    chelunJSBridge.invoke('app', 'event', {eventId, label});
}