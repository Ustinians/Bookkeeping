'use strict';

/**
 * @param {Egg.Application} app - egg application
 * @ 配置接口地址和Controller的映射关系
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const _jwt = middleware.jwtErr(app.config.jwt.secret); // 传入加密字符串
  router.post('/api/user/register', controller.user.register); // 注册接口
  router.post('/api/user/login', controller.user.login); // 登录接口
  router.get('/api/user/getinfo', _jwt, controller.user.getUserInfo); // 获取用户信息的接口
  router.post('/api/user/editinfo', _jwt, controller.user.editUserInfo); // 获取用户信息的接口
  router.get('/api/user/test', _jwt, controller.user.test); // 解析token接口
};
