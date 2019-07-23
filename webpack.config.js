const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
	entry:{
		app:"./src/index.js"
	},
	output:{
		filename:'[name].js',
		path:path.resolve(__dirname,'./dist'),
		publicPath:'/dist'
	},
	devServer:{
		overlay:true
	},
	module:{
		rules:[{
			test:/\.js$/,
			loader:'babel-loader',
			exclude:"/node-modules/"
		},
		{
			test:/\.css$/,
			use:[
			MiniCssExtractPlugin.loader,
			{
				loader:"css-loader",
				options:{ sourceMap:true }
			},
			{
				loader:"postcss-loader",
				options:{ sourceMap:true }
			},
			]
		},
		{
			test:/\.scss$/,
			use:[
			MiniCssExtractPlugin.loader,
			{
				loader:"css-loader",
				options:{ sourceMap:true }
			},
			{
				loader:"postcss-loader",
				options:{ sourceMap:true,config:{path:'src/js/postcss.config.js'} }
			},
			{
				loader:"sass-loader",
				options:{ sourceMap:true }
			}
			]
		}
		]
	},
	plugins:[
	new MiniCssExtractPlugin({
		filename:"[name].css"
	})
	]
}