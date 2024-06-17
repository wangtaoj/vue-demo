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
    /*
     * responseType为blob或者arraybuffer时, 响应体类型为Blob、ArrayBuffer
     * 返回完整的响应对象(包含响应头)
     */
    if (rsp.data instanceof Blob || rsp.data instanceof ArrayBuffer) {
      return rsp;
    }
    // 仅返回服务器响应体
    return rsp.data;
  },
  (err) => {
    let errRes = {};
    // 服务端响应了请求
    if (err.response) {
      // 服务端响应体
      const data = err.response.data;
      // 下载, 此时data是一个blob类型
      if (data instanceof Blob || data instanceof ArrayBuffer) {
        errRes = blobOrArrayBufferToJson(data);
      } else {
        errRes = data;
      }
    } else if (err.request) {
      // 请求已发送, 但是没有收到服务端的响应
      // 超时处理
      if (err.message && err.message.includes('timeout')) {
        errRes.msg = '服务器响应超时';
      } else {
        errRes.msg = '服务器出小差啦';
      }
    } else {
      // 请求未发送, 在设置请求时发生了未知错误
      errRes.msg = err.message;
    }
    errRes = errRes instanceof Promise ? errRes : Promise.reject(errRes);
    /*
     * 返回一个rejected状态的promise, 否则调用时结果是在then而不是catch中
     * {
     *   msg: 'xxx',
     *   code: 'xxx',
     *   data: {}
     * }
     * 其中msg属性必定有值, 若后端有结果返回, code也会有值, data需要看后端有无给值
     */
    return errRes
      .then((res) => Promise.reject(res))
      .catch((res) => {
        // 弹出错误提示, 调用时可以不用再使用catch来处理错误, 如果想要自己处理那么使用catch即可
        if (err.config.simpleHandleError) {
          notification.error({
            message: '错误提示',
            description: res.msg || '未知错误'
          });
        }
        return Promise.reject(res);
      });
  }
);

function blobOrArrayBufferToJson(blob) {
  return new Blob([blob])
    .text()
    .then((text) => {
      return JSON.parse(text);
    })
    .catch((err) => {
      return Promise.reject({
        msg: err.message
      });
    });
}

export default instance;
