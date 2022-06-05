/**
 * @ 配置路由数组
 */
// 引入路由组件
import Home from "@/pages/Home";
import Data from "@/pages/Data";
import User from "@/pages/User";
import Detail from "@/pages/Detail";
import Login from "@/pages/Login";

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
    },
    {
        path: '/detail',
        element: <Detail />
    },
    {
        path: '/login',
        element: <Login />
    },
]