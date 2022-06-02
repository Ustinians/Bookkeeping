'use strict';

const Service = require('egg').Service;

class TypeService extends Service {
  async add(params) {
    // eslint-disable-next-line no-unused-vars
    const { ctx, app } = this;
    try {
      const result = await app.mysql.insert('type', params);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = TypeService;
