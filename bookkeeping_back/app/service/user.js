// 根据username查找用户信息(判断用户是否已经被注册)
'use strict';
// @ Service 从数据库拿取数据
const Service = require('egg').Service;

class UserService extends Service {
  // 通过用户名获取用户信息
  async getUserByName(username) {
    const { app } = this;
    try {
      const result = await app.mysql.get('user', { username });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  // 注册
  async register(params) {
    const { app } = this;
    try {
      // 通过params数据进行注册
      const result = await app.mysql.insert('user', params);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  // 修改用户信息(个性签名signature或者头像avatar)
  async editUserInfo(params) {
    // eslint-disable-next-line no-unused-vars
    const { ctx, app } = this;
    try {
      // 通过app.mysql.update的方法,指定user表并修改表中元素
      const result = await app.mysql.update('user', {
        ...params,
      }, {
        id: params.id, // 筛选出 id 等于 params.id 的用户
      });
      // 修改成功后返回result
      return result;
    } catch (error) {
      // 如果失败打印失败原因并且返回null
      console.log(error);
      return null;
    }
  }
}

module.exports = UserService;
