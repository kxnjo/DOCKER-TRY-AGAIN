import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginTypeScript from "@typescript-eslint/eslint-plugin";
import parserTypeScript from "@typescript-eslint/parser";
import pluginSecurity from "eslint-plugin-security";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
	js.configs.recommended,

	{
		files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
		languageOptions: {
			parser: parserTypeScript,
			parserOptions: {
				ecmaVersion: 2021,
				sourceType: "module",
				ecmaFeatures: {
					jsx: true
				}
			},
			globals: {
				...globals.browser,
				...globals.node,
				...globals.mocha
			}
		},
		plugins: {
			react: pluginReact,
			"@typescript-eslint": pluginTypeScript,
			security: pluginSecurity
		},
		settings: {
			react: {
				version: "detect"
			}
		},
		rules: {
			...pluginReact.configs.recommended.rules,
			...pluginTypeScript.configs.recommended.rules,
			...pluginSecurity.configs.recommended.rules,
			"security/detect-eval-with-expression": "error"
		}
	}
];
