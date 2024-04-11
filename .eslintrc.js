module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    '@react-native',
    'plugin:jsdoc/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['@typescript-eslint', 'jsdoc'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'prettier/prettier': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'react-native/no-color-literals': 'off',
    'react-native/no-inline-styles': 'off',
    'react-native/sort-styles': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-trailing-spaces': [
      'error',
      {
        ignoreComments: true,
      },
    ],
    // JsDoc
    'jsdoc/check-param-names': 'error',
    'jsdoc/check-tag-names': 'warn', // test
    'jsdoc/check-types': 'warn', // test
    'jsdoc/check-values': 'off',
    'jsdoc/no-undefined-types': 'off',
    'jsdoc/require-description-complete-sentence': 'warn', // test
    'jsdoc/require-example': 'off', // test
    'jsdoc/require-hyphen-before-param-description': 'warn', // test
    'jsdoc/require-param-description': 'off',
    'jsdoc/require-param-type': 'off',
    'jsdoc/require-param': 'error',
    'jsdoc/require-property-description': 'off',
    'jsdoc/require-property-type': 'off',
    'jsdoc/require-returns-description': 'warn', // test
    'jsdoc/require-returns-type': 'error',
    'jsdoc/require-returns': 'off',
    'jsdoc/tag-lines': 'off',
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
  },
  ignorePatterns: ['**/node_modules/', '**/lib/', '**/scripts/'],
  env: {
    'jest/globals': true,
    'jest': true,
    'commonjs': true,
    'node': true,
  },
};
