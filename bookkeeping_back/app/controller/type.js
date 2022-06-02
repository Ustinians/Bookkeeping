'use strict';

const Controller = require('egg').Controller;

class TypeController extends Controller {
  async add() {
    const { ctx } = this;
    const { name, type, user_id } = ctx.request.body;
    try {
      await ctx.service.type.add({ name, type, user_id });
      ctx.body = {
        code: 200,
        msg: '添加成功',
        data: {
          name,
          type,
          user_id,
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
}

module.exports = TypeController;
