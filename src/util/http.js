import axiosInstance from './request';
import qs from 'qs';

function get(url, params, options) {
  let finalOptions = {
    method: 'get',
    url
  };
  if (params) {
    finalOptions.params = params;
  }
  if (options) {
    finalOptions = { ...options, ...finalOptions };
  }
  return axiosInstance.request(finalOptions);
}

function post(url, data, options) {
  let finalOptions = {
    method: 'post',
    url,
    headers: { 'Content-Type': 'application/json' }
  };
  if (data) {
    finalOptions.data = data;
  }
  if (options) {
    if (options.headers) {
      // 处理请求头
      finalOptions.headers = { ...options.headers, ...finalOptions.headers };
    }
    finalOptions = { ...options, ...finalOptions };
  }
  return axiosInstance.request(finalOptions);
}

function postFormData(url, data, options) {
  let finalOptions = {
    method: 'post',
    url,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  };
  if (data) {
    // 将对象序列化成key1=value1&key2=value2
    finalOptions.data = qs.stringify(data);
  }
  if (options) {
    if (options.headers) {
      // 处理请求头
      finalOptions.headers = { ...options.headers, ...finalOptions.headers };
    }
    finalOptions = { ...options, ...finalOptions };
  }
  return axiosInstance.request(finalOptions);
}

export default {
  get,
  post,
  postFormData
};
