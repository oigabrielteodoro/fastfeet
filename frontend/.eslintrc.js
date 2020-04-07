module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'prettier',
    'prettier/react'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier',
    'react-hooks'
  ],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [
      'warn',
      { extensions: ['.jsx', '.js'] }
    ],
    'no-new': 'off',
    'import/prefer-default-export': 'off',
    'react/no-unused-state': 'off',
    'no-console': ["error", { allow: ["tron"] }],
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'react/prop-types': ['off'],
    'camelcase': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-nested-ternary': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/control-has-associated-label': [ 2, {
      'labelAttributes': ['label'],
      'controlComponents': ['CustomComponent'],
      'ignoreElements': [
        'audio',
        'canvas',
        'embed',
        'input',
        'textarea',
        'th',
        'video',
      ],
      'ignoreRoles': [
        'grid',
        'listbox',
        'menu',
        'menubar',
        'radiogroup',
        'row',
        'tablist',
        'toolbar',
        'tree',
        'treegrid',
      ],
      'depth': 3,
    }],
  },
  settings: {
    "import/resolver": {
      "babel-plugin-root-import": {
        rootPathSuffix: "src"
      }
    }
  }
};
