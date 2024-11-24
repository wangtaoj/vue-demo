<template>
  <div>
    <a-button type="primary" @click="handleRoute1">跳转1</a-button>
    <a-button type="primary" @click="handleRoute2">跳转2</a-button>
    <a-button type="primary" @click="handleRoute3">跳转另外页面</a-button>
  </div>
</template>

<script>
export default {
  beforeRouteUpdate(to, from, next) {
    console.log('====RouteReCreate beforeRouteUpdate====');
    console.log(to.query.name);
    next();
  },

  created() {
    console.log('====RouteReCreate created====');
  },

  watch: {
    /*
    $route: {
      handler(to, from) {
        console.log(to);
        console.log(from);
      }
    }*/
  },

  methods: {
    handleRoute1() {
      this.$router.push({
        name: 'routeReCreate',
        query: {
          name: 'param1'
        }
      });
    },

    handleRoute2() {
      this.$router.push({
        name: 'routeReCreate',
        query: {
          name: 'param2'
        }
      });
    },

    handleRoute3() {
      this.$router.push({
        name: 'bind'
      });
    }
  }
};
</script>

<style lang="css" scoped></style>
