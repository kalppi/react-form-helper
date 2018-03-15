const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'index.js',
		libraryTarget: 'commonjs2'
	},
	module: {
		rules: [{
			test: /\.js$/,
			include: path.resolve(__dirname, 'src'),
			use: {
				loader: 'babel-loader',
				options: {
					"presets": ["env", "react"],
					"plugins": [
						"transform-object-rest-spread",
						"transform-react-jsx"
					]
				}
			}
		}]
	},
	externals: {
		'react': 'commonjs react'
	}
};