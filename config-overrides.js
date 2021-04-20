/* Overrides default webpack configs in /node_modules/react-scrips/config/ */

// const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = function override(config, _env) {

	/* Link to custom service worker */
	// config.plugins = config.plugins.map((plugin) => {
	// 	if (plugin.constructor.name === 'GenerateSW') {
	// 		return new WorkboxWebpackPlugin.InjectManifest({
	// 			swSrc: './src/service-worker-config.js',
	// 			swDest: 'service-worker.js'
	// 		});
	// 	}
	// 	return plugin;
	// });
	
	/* Loader modifications */
	config.module.rules = config.module.rules.map((rule) => {
		if (rule.hasOwnProperty('oneOf')) {
			/* Add raw-loader for .md files */
			rule.oneOf.splice(0, 0, {
				test: [/\.md$/],
				loader: require.resolve('raw-loader'),
			});

			/* Add style resources to sass loader */
			rule.oneOf = rule.oneOf.map((loader, index) => {
				if (index === 7) {
					loader.use.push({
						loader: 'sass-resources-loader',
						options: {
							resources: './src/styles/style_resources.scss',
							hoistUseStatements: false
						}
					});
				}
				return loader;
			});
			return rule;
		}
		return rule;
	});

	return config;
};