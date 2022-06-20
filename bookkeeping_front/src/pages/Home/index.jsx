// 头部统计实现 下拉刷新,上滑无限加载
import React, {useState} from 'react';
import { Icon } from "zarm"; // 引入Icon图标
import "./index.less"; // 引入样式文件
import BillItem from '@/components/BillItem'; // 引入BillItem组件

export default function Home() {
  const [list, setList] = useState([
    {
      bills: [
        {
          amount: "25.00",
          date: "1623390740000",
          id: 911,
          pay_type: 1,
          remark: "麻辣香锅",
          type_id: 1,
          type_name: "餐饮"
        },
        {
          amount: "8.00",
          date: "1623390740000",
          id: 912,
          pay_type: 1,
          remark: "酸奶紫米酪",
          type_id: 1,
          type_name: "餐饮"
        },
        {
          amount: "15.00",
          date: "1623390740000",
          id: 913,
          pay_type: 2,
          remark: "舍友刷饭卡",
          type_id: 13,
          type_name: "人情往来"
        }
      ],
      date: '2021-06-11'
    }
  ]); // 模拟账单数据列表
  return (
    <div className='home'>
      <div className='header'>
        <div className='data-wrap'>
          <span className='expense'>总支出: <b>￥200</b></span>
          <span className='income'>总收入: <b>￥500</b></span>
        </div>
        <div className='type-wrap'>
          <div className='left'>
            <span className='title'>类型<Icon className='arrow' type='arrow-bottom' /></span>
          </div>
          <div className='right'>
            <span className='time'>2022-06<Icon className='arrow' type='arrow-bottom' /></span>
          </div>
        </div>
      </div>
      <div className='content-wrap'>
        {
          list.map((item, index) => <BillItem bill={item} />)
        }
      </div>
    </div>
  )
}
