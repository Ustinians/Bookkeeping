import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {TabBar} from 'zarm';
import CustomIcon from '../CustomIcon'; // 引入图标
import './index.less'
/**
 * @ 底部导航栏
 * @ showNav 用于控制导航栏的显示/隐藏
 * @ TabBar
 * @ visible：用于控制导航栏的显示隐藏。
 * @ activeKey：当前被点击的导航栏。
 * @ onChange：点击导航栏之后的回调方法，path 参数为 TabBar.Item 的 itemKey 属性
 */
export default function NavBar(props) {
  const [activeKey, setActiveKey] = useState('/'); // 被选中的路由,默认是根路径
  const navigate = useNavigate(); // 用于路由跳转
  const changeTab = (path) => {
    setActiveKey(path);
    navigate(path); // 跳转路由
  }
  return (
    <TabBar visible={props.showNav} className='tab' activeKey={activeKey} onChange={changeTab}>
        <TabBar.Item itemKey='/' title='账单' icon={<CustomIcon type='zhangdan' />}></TabBar.Item>
        <TabBar.Item itemKey='/data' title='统计' icon={<CustomIcon type='tongji' />}></TabBar.Item>
        <TabBar.Item itemKey='/user' title='我的' icon={<CustomIcon type='wode' />}></TabBar.Item>
    </TabBar>
  )
}

