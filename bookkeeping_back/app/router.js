'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const _jwt = require(app.config.jwt.secret);
  router.post('/user/register', controller.user.register); // 注册接口
  router.post('/user/login', controller.user.login); // 登录接口
  router.get('/user/test', _jwt, controller.user.test); // 解析token接口
};
