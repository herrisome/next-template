import axios, { AxiosRequestHeaders } from 'axios';

import { getToken } from '@/lib/auth';

/**
 * 环境的配置，区分生产环境和开发环境
 */
// switch (process.env.NODE_ENV) {
//   case 'production':
//     // 生产环境，部署到的服务器
//     axios.defaults.baseURL = 'http://生产真实地址';
//     break;
//   case 'test':
//     axios.defaults.baseURL = 'http://测试环境';
//     break;
//   default:
//     axios.defaults.baseURL = 'http://开发环境';
//     break;
// }

axios.defaults.baseURL = 'http://localhost:3000/api';

/**
 * 设置超时时间，单位毫秒
 */
axios.defaults.timeout = 50000;

/**
 * 设置是否允许跨域和是否允许携带凭证，如果该设置为false，请求时不允许携带凭证
 */
axios.defaults.withCredentials = true;

/**
 * 设置请求头
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
// 针对post请求设置数据格式，该方法transformRequest仅针对post请求有效
// 使用qs库将传入的data数据转换为 `x-www-form-urlencoded` 格式
// 当然，这需要看服务器使用什么数据格式，如果服务器使用json，那么不需要这样设置
// axios.defaults.transformRequest = (data) => qs.stringify(data);

/**
 * 设置请求拦截器。客户端的请求 -> 请求拦截器 -> 服务器
 */
axios.interceptors.request.use(
  async (config) => {
    // 携带token，从本地读取到token，然后添加到请求头
    const token = getToken();

    if (token) {
      (config.headers as AxiosRequestHeaders).Authorization = `Bearer ${token}`;
    } else {
      const token = await axios.post(
        'https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal?app_id=cli_a2e82f767579d00b&app_secret=GkppmRVkNE53zH7xA63wddsPS72SiZkY'
      );
      (
        config.headers as AxiosRequestHeaders
      ).Authorization = `Bearer ${token.data.tenant_access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 自定义响应成功的HTTP状态码
 */
// axios.defaults.validateStatus = status => {
//   return /^(2|3)\d{2}$/.test(status);
// };

/**
 * 响应拦截器。它的知性逻辑：
 *   服务器返回信息 -> 相应拦截器 -> 客户端获取到信息
 * 这样可以首先对响应的信息做一些预处理，从而使得客户端的代码更加整洁
 */
axios.interceptors.response.use(
  (response) => {
    // 成功后返回response的主体数据
    return response.data;
  },
  (error) => {
    const { response } = error; // 等效于error.response
    if (response) {
      switch (response.status) {
        case 401:
          // 权限不足，登录失效
          // ...
          break;
        case 403:
          // 服务器拒绝访问
          // ...
          localStorage.removeItem('token');
          break;
        case 404:
          // 找不到资源
          // ...
          break;
      }
    } else {
      // 服务器崩溃或客户端没有网络连接
      // 通常在这里做断网处理
      if (!window.navigator.onLine) {
        // 处理断网
        // ...
        return;
      }
      //均不满足，返回错误信息
      return Promise.reject(error);
    }
  }
);

export default axios;
