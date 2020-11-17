import axios from 'axios'
import { Toast } from 'vant'
import router from '../router'

axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? '//localhost:3000/api/v1' : '//47.99.134.126:28019/api/v1'
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['token'] = localStorage.getItem('token') || ''
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.response.use(res => {
  // if (typeof res.data !== 'object') {
  //   Toast.fail('服务端异常！')
  //   return Promise.reject(res)
  // }
  if (res.status != 200) {
   
    if (res.status == 401) {
      Toast.fail('登录过期请重新登陆!')
      router.push({ path: '/login' })
    } else {
      Toast.fail('服务端异常!')
    }
    return Promise.reject(res.data)
  }
  console.log(res, 'request intercepter');
  return res
})

export default axios
