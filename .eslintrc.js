module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'simple-import-sort', 'unused-imports'],
  extends: [
    'eslint:recommended',
    'next',
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    '@next/next/no-img-element': 'off',

    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    'no-unused-vars': 'off',
    'no-console': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    'react/display-name': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-curly-brace-presence': [
      'warn',
      { props: 'never', children: 'never' },
    ],

    //#开始  //*=========== 未使用的导入 ===========
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    //#结束  //*======== 未使用的导入 ===========

    //#开始  //*=========== import排序 ===========
    'simple-import-sort/exports': 'warn',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // 三方库 & side effect imports
          ['^@?\\w', '^\\u0000'],
          // {s}css
          ['^.+\\.s?css$'],
          // Lib 以及 hooks
          ['^@/_lib', '^@/hooks'],
          // 静态数据
          ['^@/data'],
          // components
          ['^@/components', '^@/container'],
          // store
          ['^@/store'],
          // 其余导入
          ['^@/'],
          // 多级路径
          [
            '^\\./?$',
            '^\\.(?!/?$)',
            '^\\.\\./?$',
            '^\\.\\.(?!/?$)',
            '^\\.\\./\\.\\./?$',
            '^\\.\\./\\.\\.(?!/?$)',
            '^\\.\\./\\.\\./\\.\\./?$',
            '^\\.\\./\\.\\./\\.\\.(?!/?$)',
          ],
          ['^@/types'],
          // 其余
          ['^'],
        ],
      },
    ],
    //#结束  //*======== import排序 ===========
  },
  globals: {
    React: true,
    JSX: true,
  },
};
