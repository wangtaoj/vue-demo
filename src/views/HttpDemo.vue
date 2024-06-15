<template>
  <div>
    <div>
      <a-button type="primary" style="margin-right: 10px" @click="handleGet">
        GET
      </a-button>
      <a-button type="primary" style="margin-right: 10px" @click="handlePost">
        POST
      </a-button>
      <a-button
        type="primary"
        style="margin-right: 10px"
        @click="handlePostFormData"
      >
        POST FormData
      </a-button>
      <a-button
        type="primary"
        style="margin-right: 10px"
        @click="handleException"
      >
        异常(框架处理)
      </a-button>
      <a-button
        type="primary"
        style="margin-right: 10px"
        @click="handleExceptionByUser"
      >
        异常(用户处理)
      </a-button>
      <a-button
        type="primary"
        style="margin-right: 10px"
        @click="handleTimeout"
      >
        超时
      </a-button>
    </div>
    <div>
      {{ resultStr }}
    </div>
  </div>
</template>

<script>
import http from '@/util/http';

export default {
  data() {
    return {
      result: {}
    };
  },
  computed: {
    resultStr() {
      if (typeof this.result === 'object') {
        return JSON.stringify(this.result);
      }
      return this.result;
    }
  },
  methods: {
    handleGet() {
      http.get('/get', { name: '张三' }).then((res) => {
        this.result = res;
      });
    },
    handlePost() {
      const reqBody = {
        name: '王五',
        age: 20
      };
      http.post('/json', reqBody).then((res) => {
        this.result = res;
      });
    },
    handlePostFormData() {
      const reqBody = {
        name: '李四',
        age: 25
      };
      http.postFormData('/formData', reqBody).then((res) => {
        this.result = res;
      });
    },
    handleException() {
      const reqBody = {
        throwException: true
      };
      http.postFormData('/throwException', reqBody).then((res) => {
        this.result = res;
      });
    },
    handleExceptionByUser() {
      const reqBody = {
        throwException: true
      };
      http
        .postFormData('/throwException', reqBody, { simpleHandleError: false })
        .then((res) => {
          this.result = res;
        })
        .catch((err) => {
          this.result = err;
        });
    },
    handleTimeout() {
      const reqBody = {
        seconds: 5
      };
      // 2s超时
      http.postFormData('/timeout', reqBody, { timeout: 2000 }).then((res) => {
        this.result = res;
      });
    }
  }
};
</script>

<style lang="css" scoped></style>
