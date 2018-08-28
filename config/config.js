// 常用配置

module.exports ={
    server: {
        host: require("ip").address(),
        port: "9003",
        proxy: {
            "/api": "http://localhost:9003",
        }
    }
};
