// 引入封装好的ajax
import ajax from "./ajax";
// 存储GET请求和POST请求
const BASE_URL = "http://localhost:7001"
// 注册
export const reqRegister = (username,password) => ajax(BASE_URL+'/api/user/register', {username,password}, "POST");
