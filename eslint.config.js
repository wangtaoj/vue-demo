import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import prettierConfig from '@vue/eslint-config-prettier';
// import skipFormattingConfig from '@vue/eslint-config-prettier/skip-formatting';

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,cjs,mjs,jsx,vue}']
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**']
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  /*
   * 1. 禁用eslint中与prettier冲突的规则, 否则使用prettier格式了代码, 然而又不符合eslint的校验规则, 导致eslint报警告或者错误
   * 2. 将prettier作为eslint的规则运行, 当代码格式与pretter设置的规则不一致时, eslint可以报告代码格式问题
   * 注: 如果不想要第二条, 可以使用@vue/eslint-config-prettier/skip-formatting插件
   */
  prettierConfig
];
