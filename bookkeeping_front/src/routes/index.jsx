/**
 * @ 配置路由数组
 */
// 引入路由组件
import Home from "@/pages/Home";
import Data from "@/pages/Data";
import User from "@/pages/User";

export default [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/data',
        element: <Data />
    },
    {
        path: '/user',
        element: <User />
    }
]