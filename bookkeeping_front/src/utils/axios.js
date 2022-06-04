/**
 * @封装axios的文件
 */
import axios from "axios";
import { Toast } from "zarm";

const MODE = import.meta.env.MODE; // 环境变量,判断当前代码运行在开发环境还是生产环境

// 设置请求的基本路径
axios.defaults.baseURL = MODE === 'development' ? '/api' : 'http://localhost:7001/api';
// 配置用于请求头的设置
axios.defaults.withCredentials = true;
axios.defaults.headers['X-Request-With'] = 'XMLHttpRequest';
axios.defaults.headers['Authorization'] = `${localStorage.getItem('token') || null}`;
// 配置post请求使用的请求体
axios.defaults.headers.post['Content-Type'] = 'application/json';

/**
 * @ interceptors 为拦截器，拦截器的作用是帮你拦截每一次请求，你可以在回调函数中做一些“手脚”，再将数据 return 回去
 * 下列代码拦截了相应内容,统一判断请求内容,如果请求失败,提示错误信息
 * 如果code=401,就是未登录的用户,跳转到/login页面进行登录
 * 如果是正常的请求,则返回请求数据
 * 将封装好的axios抛出,供页面组件请求使用
 */
axios.interceptors.response.use(res => {
    if(typeof res.data !== 'object'){
        Toast.show('服务端异常!');
        return Promise.reject(res);
    }
    // 如果请求不成功
    if(res.data.code !== 200){
        if(res.data.msg) Toast(res.data.msg);
        if(res.data.code === 401){ // 用户还未登录,跳转到登录界面
            window.location.href = '/login';
        }
        return Promise.reject(res.data);
    }
    return res.data;
})

export default axios;