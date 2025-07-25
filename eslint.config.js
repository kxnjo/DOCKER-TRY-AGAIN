import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import pluginTypeScript from "@typescript-eslint/eslint-plugin";
import parserTypeScript from "@typescript-eslint/parser";
import pluginSecurity from "eslint-plugin-security";
import noUnsanitized from "eslint-plugin-no-unsanitized";

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
			security: pluginSecurity, // for eslint-plugin-security-node
			unsanitized: noUnsanitized // eslint-plugin-no-unsanitized
		},
		settings: {
			react: {
				version: "detect"
			}
		},
		rules: {
			...pluginReact.configs.recommended.rules,
			...pluginTypeScript.configs.recommended.rules,
			...pluginSecurity.configs.recommended.rules, // for eslint-plugin-security-node
			...noUnsanitized.configs.recommended.rules,
			"security/detect-eval-with-expression": "error"
		}
	}
];
