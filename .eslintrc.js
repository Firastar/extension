module.exports = {
  env: {
    browser: true,
    es2021: true,
    jquery: true,
    jest: true,
  },
  extends: ['standard', 'eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
  },
};
