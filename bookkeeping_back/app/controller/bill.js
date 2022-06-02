/**
 * 账单接口
 * 1. 账单列表
 * 2. 添加账单
 * 3. 修改账单
 * 4. 删除帐单
 * 5. 账单详情
 */
'use strict';

const moment = require('moment');
const Controller = require('egg').Controller;

class BillController extends Controller {
  // 添加账单的方法
  async add() {
    const { ctx, app } = this;
    // 获取POST请求体携带的参数
    const {
      amount,
      type_id,
      type_name,
      date,
      pay_type,
      remark = '',
    } = ctx.request.body; // 从请求体中获取数据
    // 判空处理, 前后端都可以做,但是以防万一,后端需要做一层判断
    if (!amount || !type_id || !type_name || !date || !pay_type) {
      // 如果有一项为空
      ctx.body = {
        code: 400,
        msg: '参数错误',
        data: null,
      };
    }
    try {
      let user_id; // 用户的id(存到bill数据库中)
      const token = ctx.request.header.authorization; // 从请求头拿到token数据
      const decode = await app.jwt.verify(token, app.config.jwt.secret); // 解析获取token中存储的用户信息
      if (!decode) return; // 没有用户信息
      // eslint-disable-next-line prefer-const
      user_id = decode.id; // 获取用户的id值
      // user_id默认添加到每个账单项,作为后续获取指定用户账单的标识
      // 当登录admin账户的时候,上面所作操作都需要添加admin的id,后续查询账单通过user_id过滤
      // eslint-disable-next-line no-unused-vars
      const result = await ctx.service.bill.add({
        // 通过service传入数据库
        amount,
        type_id,
        type_name,
        date,
        pay_type, // 注意类型是INT
        remark,
        user_id,
      });
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: null,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null,
      };
    }
  }
  // 处理账单数据列表
  async list() {
    const { ctx, app } = this;
    // 获取日期date,分页数据,类型type_id,都是前端传给后端的数据(当前页数和每一页的数据条数)
    const { date, page = 1, page_size = 5, type_id = 'all' } = ctx.query; // type_id 支出|收入的类型
    try {
      let user_id;
      // 通过token解析,拿到用户的id
      const token = ctx.request.header.authorization;
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return; // 如果token中没有用户信息
      // eslint-disable-next-line prefer-const
      user_id = decode.id;
      // 拿到当前用户的帐单列表
      const list = await ctx.service.bill.list(user_id); // 根据id值获取当前用户的帐单列表
      // #过滤出月份和类型所对应的帐单列表
      const _list = list.filter(item => {
        if (type_id !== 'all') {
          // 如果当前支出收入的类型的id不是all,说明是某个用户自定义的
          return (
            // 判断是不是当前用户自定义的(以及传入的日期是否匹配)
            moment(Number(item.date)).format('YYYY-MM') === date &&
            type_id === item.type_id
          );
        }
        return moment(Number(item.date)).format('YYYY-MM'); // 查看日期是否匹配
      });
      // #根据本月的数据排列出每一天的
      const listMap = _list
        .reduce((cur, item) => {
          // 将符合当前日期的数据填充到同一个对象中
          // cur初始值默认是一个空数组[]
          // 将第一个账单的时间格式化为YY-MM-DD
          const date = moment(Number(item.date)).format('YYYY-MM-DD');
          // 如果能在累加的数组中找到当前项的日期,那么在数组中的加入当前项到bills数组
          if (
            // 如果数组中存在当前日期的项目
            cur &&
            cur.length &&
            cur.findIndex(item => item.date === date) > -1
          ) {
            // 存储到对应的对象的数组中
            const index = cur.findIndex(item => (item.date = date));
            cur[index].bills.pushitem;
          }
          // 如果在累加的数组中找不到当前项,那么再新建一项
          if (
            cur &&
            cur.length &&
            cur.findIndex(item => item.date === date) === -1
          ) {
            // 如果没有当前项则添加
            cur.push({
              date,
              bills: [ item ],
            });
          }
          // 如果cur为空数组,则默认添加一个账单项item,格式化为下列格式
          if (!cur.length) {
            // 如果数组中还是空的,则添加一项
            cur.push({
              date,
              bills: [ item ],
            });
          }
          return cur;
        }, []) // 按照时间进行排序
        .sort((a, b) => moment(b.date) - moment(a.date)); // 时间顺序为倒序(时间新的在上面,越接近当前时间越靠上面)
      // 分页处理
      const filterListMap = listMap.slice(
        (page - 1) * page_size,
        page * page_size
      );
      // #计算当月收入和支出的总和,首先获取当月所有的帐单列表
      const __list = list.filter(
        item => moment(Number(item.date)).format('YYYY-MM') === date
      );
      // #累加计算支出
      const totalExpense = __list.reduce((cur, item) => {
        if (item.pay_type === 1) {
          cur += Number(item.amount); // 如果pay_type为1,说明是支出
          return cur;
        }
        return cur;
      }, 0);
      // #累加计算收入
      const totalIncome = __list.reduce((cur, item) => {
        if (item.pay_type === 2) {
          cur += Number(item.amount); // 如果pay_type为2,说明是收入
          return cur;
        }
        return cur;
      }, 0);
      // 返回数据
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: {
          totalExpense, // 当月支出
          totalIncome, // 当月收入
          totalPage: Math.ceil(listMap.length / page_size), // 总分页
          list: filterListMap || [], // 格式化之后,经过分页处理器处理过的数据
        },
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null,
      };
    }
  }
  // 更新账单数据
  async detail() {
    const { ctx, app } = this;
    // 获取账单id信息
    const { id = '' } = ctx.queries;
    // 获取用户的user_id
    const token = ctx.request.header.authorization;
    // 获取当前用户信息
    const decode = app.jwt.verify(token, app.config.jwt.secret);
    if (!decode) return;
    const user_id = decode.id;
    // 判断是否传入账单id
    if (!id) {
      ctx.body = {
        code: 500,
        msg: '订单id不能为空',
        data: null,
      };
      return;
    }
    try {
      // 从数据库中获取账单详情
      // eslint-disable-next-line no-unused-vars
      const detail = await ctx.service.bill.detail(id, user_id);
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: null,
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null,
      };
    }
  }
}

module.exports = BillController;
