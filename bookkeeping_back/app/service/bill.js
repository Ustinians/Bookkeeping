'use strict';
/**
 * 账单Service
 */
const Service = require('egg').Service;

class BillService extends Service {
  // 添加账单数据
  async add(params) {
    // eslint-disable-next-line no-unused-vars
    const { ctx, app } = this;
    try {
      // 在bill表重插入一条账单数据
      const result = await app.mysql.insert('bill', { ...params });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  // 获取账单列表
  async list(id) {
    // eslint-disable-next-line no-unused-vars
    const { ctx, app } = this;
    const QUERY_STR = 'id, pay_type, amount, date, type_id, remark';
    const sql = `select ${QUERY_STR} from bill where user_id = ${id}`; // 从数据库中查询id和当前用户id一致的数据
    try {
      const result = await app.mysql.query(sql);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  // 获取账单详细信息
  async detail(id, user_id) {
    // eslint-disable-next-line no-unused-vars
    const { ctx, app } = this;
    try {
      const result = await app.mysql.get('bill', { id, user_id });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  // 更新账单信息
  async update(params) {
    // eslint-disable-next-line no-unused-vars
    const { ctx, app } = this;
    try {
      const result = await app.mysql.update('bill', params, { // 根据id和user_id筛选指定的账单
        id: params.id,
        user_id: params.user_id,
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  // 删除指定账单的信息
  async delete(id, user_id) {
    // eslint-disable-next-line no-unused-vars
    const { ctx, app } = this;
    try {
      const result = await app.mysql.delete('bill', {
        id,
        user_id,
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = BillService;
