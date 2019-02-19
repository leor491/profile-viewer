const Dotenv = require('dotenv-webpack');

module.exports = {
	entry: ["./src/index.js"],

	output: {
		path: '/',
		filename: 'app/bundle.js'
	},

	module: {
		rules: [
		{
			test: /\.jsx?$/,
			use: 'babel-loader',
			exclude: /node_modules/
		}
		]
	},

	plugins: [
		new Dotenv()
	]
}