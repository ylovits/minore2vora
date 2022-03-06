module.exports = function override(config, _env) {
	/* Loader modifications */
	config.module.rules = config.module.rules.map((rule) => {
		if (rule.hasOwnProperty('oneOf')) {
			/* Add style resources to sass loader */
			rule.oneOf = rule.oneOf.map((loader, index) => {
				if (index === 7) {
					loader.use.push({
						loader: require.resolve('sass-resources-loader'),
						options: {
							resources: './src/assets/styles/style_resources.scss'
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