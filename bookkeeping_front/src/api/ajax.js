/**
 * 能发送异步ajax请求的函数模块
 * 封装axios
 * 函数的返回值是一个Promise对象
 * 1. 优化1: 统一处理请求异常
 *      在外层包一个自己创建的Promise对象
 *      在请求出错的时候,不reject(error),而是显示错误信息
 * 2. 优化2: 异步直接获取到response.data而不是response
 */
import axios from 'axios';
// 引入需要的UI组件
import { Toast } from 'zarm';

// 为data和type指定默认值
/**
 * 
 * @param {String} url 请求地址
 * @param {Object} data 请求参数
 * @param {String} type 请求类型
 */
export default function ajax(url, data = {}, type = "GET") {
    // 返回一个Promise对象
    return new Promise((reslove, reject) => {
        let promise;
        // 1. 执行异步Ajax
        if(type === "GET") {
            // 发送GET请求
            promise = axios.get(url, {
                params: data // GET请求携带参数
            });
        }
        else {
            // 发送POST请求
            promise = axios.post(url, data);
        }
        promise.then(response => {
            // 如果成功了,调用reslove(value)
            reslove(response.data);
        }).catch(error => {
            // 如果失败了,不调用reject(error),而是提示错误信息
            Toast.show("请求出错了" + error.message);
        })
    })
}