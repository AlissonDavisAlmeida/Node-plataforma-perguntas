module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true,
	},
	extends: [
		"airbnb-base",
	],
	parserOptions: {
		ecmaVersion: 13,
	},
	rules: {
		"linebreak-style": "off",
		"no-console": "off",
		quotes: ["warn", "double"],
		eqeqeq: "off",
		"no-multiple-empty-lines": ["warn", { max: 1 }],
		"no-unused-vars": "off",
		indent: ["warn", "tab"],
		"no-tabs": "off",
	},
};
