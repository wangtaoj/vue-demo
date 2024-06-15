import axiosInstance from './request';
import qs from 'qs';

function isNullOrUndefined(obj) {
  return obj == null || obj == undefined;
}

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
  if (!isNullOrUndefined(data)) {
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
  if (!isNullOrUndefined(data)) {
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
/**
 * 下载
 * @param {*} url 下载路径
 * @param {*} data 请求参数
 * @param {*} filename 下载文件名, 可以为空, 为空时取Content-Disposition响应头里的名字
 * @param {*} options 请求配置
 */
function download(url, data, filename, options) {
  let finalOptions = {
    method: 'post',
    url,
    responseType: 'blob',
    headers: { 'Content-Type': 'application/json' }
  };
  let jsonReqBody = true;
  if (options) {
    if (options.headers) {
      if (
        options.headers['Content-Type'] === 'application/x-www-form-urlencoded'
      ) {
        finalOptions.headers['Content-Type'] =
          'application/x-www-form-urlencoded';
        jsonReqBody = false;
      }
      // 处理请求头
      finalOptions.headers = { ...options.headers, ...finalOptions.headers };
    }
    finalOptions = { ...options, ...finalOptions };
  }
  if (!isNullOrUndefined(data)) {
    if (!jsonReqBody) {
      // 将对象序列化成key1=value1&key2=value2
      finalOptions.data = qs.stringify(data);
    } else {
      finalOptions.data = data;
    }
  }
  return axiosInstance.request(finalOptions).then((rsp) => {
    let data = rsp.data;
    let url = URL.createObjectURL(new Blob([data]));
    let a = document.createElement('a');
    a.href = url;
    if (!filename) {
      // 响应头名称是小写
      filename = getFilename(rsp.headers['content-disposition']);
    }
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  });
}

function getFilename(header) {
  if (header) {
    const prefix = "filename*=UTF-8''";
    const delim = header.lastIndexOf(prefix);
    if (delim !== -1) {
      const start = delim + prefix.length;
      const filename = decodeURI(header.substring(start));
      return filename;
    }
  }
  return '';
}

export default {
  get,
  post,
  postFormData,
  download
};
