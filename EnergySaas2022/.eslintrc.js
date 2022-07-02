// noinspection JSUnresolvedVariable
module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['plugin:react/recommended', 'torchbox'],

    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
        semi: ['error', 'always'],
        'react/react-in-jsx-scope': 'off',
        quotes: ['error', 'single', {
            allowTemplateLiterals: true,
            avoidEscape: true
        }],
        'no-console': 1,
        'react/jsx-props-no-spreading': 0,
        'react/jsx-filename-extension': 0,
        'import/no-unresolved': 0,
        'import/extensions': 0,
        'import/no-dynamic-require': 0,
        'global-require': 0,
        'import/no-extraneous-dependencies': 0,
    }
};