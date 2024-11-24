<template>
  <div>
    <div>
      <input :value="value" @input="handleChange" />
    </div>
    <div>
      <a-button type="primary" @click="addValue">value + 1</a-button>
      <a-button type="primary" @click="printValue">print</a-button>
    </div>
    <div>
      <a-button type="primary" @click="updateConfigValue">
        updateConfigValue
      </a-button>
      <a-button type="primary" @click="directUpdateValue">
        directUpdateValue
      </a-button>
    </div>
    <div v-for="(rowItem, index) in config" :key="index">
      <span
        style="margin-left: 10px"
        v-for="(colItem, index) in rowItem"
        :key="index"
        >{{ colItem.props.value }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 1,

      config: [
        [
          { id: 1, props: {} },
          { id: 2, props: {} },
          { id: 3, props: {} }
        ],
        [
          { id: 4, props: {} },
          { id: 5, props: {} },
          { id: 6, props: {} }
        ]
      ],

      arr: [{ name: 'wt' }, { name: 'wt1' }]
    };
  },

  methods: {
    addValue() {
      this.value = +this.value + 1;
    },

    printValue() {
      console.log(this.$data);
      console.log(this.value);
    },

    /**
     * 响应式数据发生变化 -> 视图变化, 但是不会触发change或者input事件
     * 不会出现无限循环场景
     */
    handleChange(e) {
      console.log('=========');
      this.value = e.target.value;
    },

    /*
     * 验证复杂数组响应式
     * vue会将数组中的每个对象的属性生成getter、setter，当然对象里又包含对象, 会继续递归下去为嵌套对象里的每个属性也生成getter、setter
     * 生成getter、setter时会判段对象是否已经生成过了, 因此在原对象里增加了属性, 新增的属性不会生成getter、setter
     */
    updateConfigValue() {
      const colConfig = this.config[0][1];
      let val = colConfig.props.value ?? 0;
      const newColConfig = {
        ...colConfig
      };
      newColConfig.props = {
        ...colConfig.props,
        value: ++val
      };

      // 对象引用必须发生变化才会使得响应式生效, 如果对象有嵌套对象, 嵌套对象也要是新对象
      // newColConfig必须是一个新对象, 才会为里面的属性生成getter、setter
      this.$set(this.config[0], 1, newColConfig);
      // 下面直接深拷贝整个对象, 也是OK的, 虽然省事, 但是对象很大时也可能有效率问题
      //this.config = JSON.parse(JSON.stringify(this.config));

      // age不会生成geterr、setter, 对象引用没有发生变化, 不会重新对该对象里的属性重新生成getter、setter
      this.arr[0].age = 20;
      this.$set(this.arr, 0, this.arr[0]);

      // 新对象, 整个对象会重新生成getter、setter, 因此age也会有
      this.$set(this.arr, 1, { ...this.arr[1], age: 20 });

      console.log(this.config);
      console.log(this.$data);
    },

    // 测试响应式是否生效, 先执行updateConfigValue按钮
    directUpdateValue() {
      this.config[0][1].props.value = this.config[0][1].props.value + 1;
    }
  }
};
</script>

<style lang="css" scoped></style>
