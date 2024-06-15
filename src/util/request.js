import axios from 'axios';
import { notification } from 'ant-design-vue';

const instance = axios.create({
  baseURL: '/api',
  timeout: 30000,
  responseType: 'json',
  validateStatus: function (status) {
    return status >= 200 && status < 300;
  },
  // 自定义属性, 出现错误时是否简单弹出错误消息提示
  simpleHandleError: true
});

// 添加访问token
/*
instance.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = 'xxxx';
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
*/

/*
 * 服务端响应体格式
 * {code: 'xxx', data: {}, msg: 'xxxx'}
 */
instance.interceptors.response.use(
  (rsp) => {
    // 下载时返回原始对象(包含响应头)
    if (['blob', 'arraybuffer'].includes(rsp.config.responseType)) {
      return rsp;
    }
    // 仅返回服务器响应体
    return rsp.data;
  },
  (err) => {
    let errMsg;
    let errRes = {};
    // 服务端响应了请求
    if (err.response) {
      // 服务端响应体
      const data = err.response.data;
      // 下载, 此时data是一个blob类型
      if (['blob'].includes(err.config.responseType)) {
        return handerErrorForBlob(data, err.config);
      } else {
        errMsg = data.msg;
        errRes = data;
      }
    } else if (err.request) {
      // 请求已发送, 但是没有收到服务端的响应
      // 超时处理
      if (err.message && err.message.includes('timeout')) {
        errMsg = '服务器响应超时';
      } else {
        errMsg = '服务器出小差啦';
      }
      errRes.msg = errMsg;
    } else {
      // 请求未发送, 在设置请求时发生了未知错误
      errMsg = err.message;
      errRes.msg = errMsg;
    }
    // 弹出错误提示, 调用时可以不用再使用catch来处理错误, 如果想要自己处理那么使用catch即可
    if (err.config.simpleHandleError) {
      notification.error({
        message: '错误提示',
        description: errMsg
      });
    }
    // 返回一个reject状态的promise, 否则调用时结果是在then而不是catch中
    return Promise.reject(errRes);
  }
);

function handerErrorForBlob(data, config) {
  if (config.simpleHandleError) {
    // blob转json
    blobToJson(data).then((jsonBody) => {
      notification.error({
        message: '错误提示',
        description: jsonBody.msg
      });
    });
  }
  // 返回一个reject状态的promise
  return blobToJson(data).then((jsonBody) => {
    return Promise.reject(jsonBody);
  });
}

function blobToJson(blob) {
  return blob.text().then((text) => {
    return JSON.parse(text);
  });
}

export default instance;
