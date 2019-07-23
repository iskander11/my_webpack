const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")


const PATHS = {
    src:path.join(__dirname,'../src'),
    dist:path.join(__dirname,'../public'),
    assets:'static/'
}


module.exports = {
    externals:{
        paths:PATHS
    },

	entry:{
		app:PATHS.src
	},
	output:{
		filename:`${PATHS.assets}/js/[name].js`,
		path:PATHS.dist,
		publicPath:'/'
	},
	module:{
		rules:[{
			test:/\.js$/,
			loader:'babel-loader',
			exclude:"/node-modules/"
        },
        {
			test:/\.(png|jpg|gif|svg|jpeg)$/,
			loader:'file-loader',
			options:'[name].[ext]'
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
				options:{ sourceMap:true }
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
		filename:`${PATHS.assets}/css/[name].css`
    }),
    new HtmlWebpackPlugin({
        hash:false,
        template:`${PATHS.src}/index.html`,
        filename:'./index.html'
    }),
    new CopyWebpackPlugin([
        {from:`${PATHS.src}/img`,to:`${PATHS.assets}/img`},
        {from:`${PATHS.src}/static`,to:''}
    ])
	]
}