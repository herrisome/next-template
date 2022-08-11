module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修补bug
        'docs', // 文档修改
        'chore', // 其他改动
        'style', // 代码格式修改, 注意不是 css 修改
        'refactor', // 重构
        'ci', // 持续集成修改
        'test', // 测试用例修改
        'perf', // 优化相关，比如提升性能、体验
        'revert', // 代码回滚
        'build', // 编译相关的修改，例如发布版本、对项目构建或者依赖的改动
      ],
    ],
    'type-empty': [2, 'never'], // type不能为空;
    'type-case': [0, 'always', 'lower-case'], // type必须小写
  },
};
