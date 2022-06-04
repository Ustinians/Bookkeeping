import React, {useEffect, useState} from 'react'
import { useRoutes, useLocation } from 'react-router-dom'
// 引入组件库的配置
import zhCN from 'zarm/lib/config-provider/locale/zh_CN'
import { ConfigProvider } from 'zarm'
// 引入路由列表
import routes from '@/routes'
// 引入底部导航栏组件
import NavBar from '@/components/NavBar'

export default function App() {
  const location = useLocation(); // 获取路径信息
  const { pathname } = location; // 获取当前路径
  const needNav = ['/', '/data', '/user']; // 需要底部导航栏的路径
  const [showNav, setShowNav] = useState(false); // 是否展示Nav
  useEffect(() => {
    setShowNav(needNav.includes(pathname)); // 如果当前路径是要展示Nav的路径之一,将showNav设置为true
  }, [pathname]);
  // 根据路由列表构建路由
  const elements = useRoutes(routes);
  return (
    <ConfigProvider primaryColor={'#99CCCC'} locale={zhCN}>
      <div>
        {elements}
        <NavBar showNav={showNav} />
      </div>
    </ConfigProvider>
  )
}
