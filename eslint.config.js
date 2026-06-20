import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default tseslint.config(
    {ignores: ['build/', 'dist/', 'node_modules/']},
    {
        files: ['src/**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,
            react.configs.flat.recommended,
            react.configs.flat['jsx-runtime'],
        ],
        plugins: {
            'react-hooks': reactHooks,
        },
        languageOptions: {
            globals: {...globals.browser, ...globals.node},
        },
        settings: {
            react: {version: 'detect'},
        },
        rules: {
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'react/prop-types': 'off',
            'react/react-in-jsx-scope': 'off',
        },
    }
);
