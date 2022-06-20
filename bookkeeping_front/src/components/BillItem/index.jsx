// 账单单项组件
import React, {useEffect, useState} from 'react';
import dayjs from 'dayjs'; // npm i dayjs -S 日期操作工具
import { Cell } from 'zarm';
import CustomIcon from "../CustomIcon";
import {typeMap} from '@/utils';
import {useNavigate} from 'react-router-dom';
import './index.less'; // 引入样式文件

export default function BillItem({bill}) {
  const [income, setIncome] = useState(0); // 收入
  const [expense, setExpense] = useState(0); // 支出
  const navigate = useNavigate();
  // 当添加账单时,bill.bills的长度发生变化,触发当日收支总和的计算
  useEffect(() => {
      /**
       * 初始化将传入的bill内的bills数组内的数据项过滤出收入和支出
       * pay)type: 1为支出,2为收入
       * 通过reduce进行累加
       */
      const _income = bill.bills.filter(i => i.pay_type === 2).reduce((cur, item) => {
          cur += Number(item.amount);
          return cur;
      }, 0);
      setIncome(_income); // 存储总收入
      const _expense = bill.bills.filter(i => i.pay_type == 1).reduce((cur, item) => {
          cur += Number(item.amount);
          return cur;
      }, 0);
      setExpense(_expense); // 计算并存储总支出
  }, [bill.bills]);
  // 前往扎昂三详情
  const goToDetail = (item) => {
    navigate(`/detail?id=${item.id}`);
  }
  return (
    <div className='item'>
        <div className='header-date'>
            <div className='date'>{bill.date}</div>
            <div className='money'>
                <span>
                    <img src="//s.yezgea02.com/1615953405599/zhi%402x.png" alt='支' />
                    <span>¥{ expense.toFixed(2) }</span>
                </span>
                <span>
                    <img src="//s.yezgea02.com/1615953405599/shou%402x.png" alt="收" />
                    <span>¥{ income.toFixed(2) }</span>
                </span>
            </div>
        </div>
        {
            bill && bill.bills.map(item => <Cell
                className='bill'
                key={item.id}
                onClick={() => goToDetail(item)}
                title={
                    <>
                        <CustomIcon
                        className="itemIcon"
                        type={item.type_id ? typeMap[item.type_id].icon : 1}
                        />
                        <span>{ item.type_name }</span>
                    </>
                }
                description={<span style={{ color: item.pay_type == 2 ? 'red' : '#39be77' }}>{`${item.pay_type == 1 ? '-' : '+'}${item.amount}`}</span>}
                help={<div>{dayjs(Number(item.date)).format('HH:mm')} {item.remark ? `| ${item.remark}` : ''}</div>}
            ></Cell>)
        }
    </div>
  )
}
