import axiosInstance from './request';

const APPLICATION_FORM_URLENCODED = 'application/x-www-form-urlencoded';
const APPLICATION_JSON = 'application/json';

function isNullOrUndefined(obj) {
  return obj === null || obj === undefined;
}

function get(url, params, options) {
  let config = {
    method: 'get',
    url
  };
  if (params) {
    config.params = params;
  }
  if (options) {
    config = { ...options, ...config };
  }
  return axiosInstance.request(config);
}

/**
 * 发送post请求, content-type=application/json(默认)
 * @param {*} url 请求路径
 * @param {*} data 请求体
 * @param {*} options 请求配置
 */
function post(url, data, options) {
  let config = {
    method: 'post',
    url
  };
  // 避免参数为false情况被忽略掉
  if (!isNullOrUndefined(data)) {
    config.data = data;
  }
  if (options) {
    config = { ...config, ...options };
  }
  // 添加请求头
  if (config.headers) {
    // 无Content-Type头, 默认为pplication/json
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = APPLICATION_JSON;
    }
  } else {
    config.headers = { 'Content-Type': APPLICATION_JSON };
  }
  return axiosInstance.request(config);
}

/**
 * 发送post请求, content-type为application/x-www-form-urlencoded
 * axios会自动对请求体序列化
 * @param {*} url 请求路径
 * @param {*} data 请求体
 * @param {*} options 请求配置
 */
function postFormData(url, data, options) {
  let config = {};
  if (options) {
    config = { ...config, ...options };
  }
  // 添加请求头
  if (config.headers) {
    config.headers['Content-Type'] = APPLICATION_FORM_URLENCODED;
  } else {
    config.headers = { 'Content-Type': APPLICATION_FORM_URLENCODED };
  }
  return post(url, data, config);
}
/**
 * 下载
 * @param {*} url 下载路径
 * @param {*} data 请求参数
 * @param {*} filename 下载文件名, 可以为空, 为空时取Content-Disposition响应头里的名字
 * @param {*} options 请求配置
 */
function download(url, data, filename, options) {
  let config = {
    responseType: 'blob'
  };
  if (options) {
    config = { ...config, ...options };
  }
  return post(url, data, config).then((rsp) => {
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
