<template>
  <div>
    <div>
      <input :value="value" @input="handleChange" />
    </div>
    <div>
      <a-button type="primary" @click="addValue">value + 1</a-button>
      <a-button type="primary" @click="printValue">print</a-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 1
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
    }
  }
};
</script>

<style lang="css" scoped></style>
