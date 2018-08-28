/*
 * webpack公用环境配置
 * @Author: scyuns
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');         //自定义html模板文件

module.exports = {
	entry: {
		main:[
			path.resolve(__dirname, '../src/index.js'),
		]
	},

	output: {
		filename: 'js/bundle.js',
		chunkFilename: '[name].chunk.js',
		// 输出文件都放到 dist 目录下
		path: path.resolve(__dirname, '../dist'),
		publicPath: "./"
	},

	resolve: {
		extensions: [".js", ".json"],   //免后缀文件类型
		//简化路径
		alias: {
			helper: path.resolve(__dirname, '../src/helper'), 
			views: path.resolve(__dirname, '../src/views'),
			comps: path.resolve(__dirname, '../src/comps'),
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader?cacheDirectory',  //将执行结果缓存起来，加速下次执行
				exclude: path.resolve(__dirname, "../node_modules"),         //排除这里面的文件，加速
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8888,
							outputPath: 'static/images/',
							name: '[hash:6].[ext]',  //指定打包后的图片名字及路径
							fallback: 'file-loader'                       //文件大于8888的交于file-loader
						}
					}
				]
			},

		]
	},


	plugins: [
		new HtmlWebpackPlugin({
			inject: true,                //讲js文件放在body中
			// favicon: path.resolve(__dirname, '../public/favicon.ico'), //添加favicon.ico 
			template: path.resolve(__dirname, '../public/index.html'),  //指定模板
		})
	],
};