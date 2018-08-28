/**
 * 页面初始化方法
 */
;(function (global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory(global);
    } else {
        factory(global);
    }
})(typeof window !== "undefined" ? window : this, function (global) {
    var init = {}
    /**
     * rem 设置页面宽度
     * @param {Number} resetWidth 页面宽度
     * @returns {Boolean} true
     */
    init.rem = function(resetWidth){
        if(!resetWidth){
            resetWidth = 750;
        }
        var resize = function(){
            var computeWidth = window.innerWidth;
            var fontSize = computeWidth <= resetWidth
                ? window.innerWidth * 100 / resetWidth + 'px'
                : '100px';
            document.documentElement.style.fontSize = fontSize;
        }
        window.onresize = resize;
        // if (window.screen && window.screen.onorientationcchange) {
        //     screen.onorientationcchange = resize;
        // }
        resize();
        return true;
    };
    /**
     * baidu 百度统计
     * @returns {Boolean} true
     */
    init.baidu = function(){
        window._hmt = window._hmt || [];
        var hmScript = document.createElement("script");
        hmScript.src = "//hm.baidu.com/hm.js?9f9fd730557c9f615b60a2133fb7616f";
        document.head.appendChild(hmScript);
        return true;
    }

    return global.init = init;
});