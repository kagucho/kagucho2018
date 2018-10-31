/*
	Copyright (C) 2017 Kagucho <kagucho.net@gmail.com>

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as
	published by the Free Software Foundation, either version 3 of the
	License, or (at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Affero General Public License for more details.

	You should have received a copy of the GNU Affero General Public License
	along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

const commonWebpackConfig = require('../common.webpack.config');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');

module.exports = Object.assign({
	entry: '.',
	output: {
		filename: '[name].js',
		path: path.join(__dirname, '../../output/kagucho2017/play/renderer'),
	},
	target: 'electron-renderer',
}, commonWebpackConfig);

module.exports.module.rules.push({
	test: /\.css$/,
	use: ExtractTextWebpackPlugin.extract({
		fallback: 'style-loader',
		//TODO: process.env.NODE_ENV doesn't work
		use: process.env.NODE_ENV == 'production'
			? new OptimizeCssnanoPlugin({
				sourceMap: nextSourceMap,
				cssnanoOptions: {
					preset: ['default', {
						discardComments: {
							removeAll: true
						}
					}]
				}
			})
			: 'css-loader',
	}),
});

module.exports.plugins.push(new ExtractTextWebpackPlugin('[name].css'));
