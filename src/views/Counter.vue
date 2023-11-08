<template>
  <div>
    <a-button type="primary" @click="addCount">counter</a-button>
    <a-input />
    <div>{{ count }}</div>
    <div>{{ msg }}</div>
    <JsxView />
  </div>
</template>

<script lang="jsx">
export default {
  components: {
    JsxView: {
      render() {
        return <div>hh</div>;
      }
    }
  },
  data() {
    return {
      count: 0,
      msg: 'hello vue'
    };
  },
  methods: {
    addCount() {
      this.count++;
    }
  }
};
</script>
