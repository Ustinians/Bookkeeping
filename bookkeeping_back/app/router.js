'use strict';

/**
 * @param {Egg.Application} app - egg application
 * @ 配置接口地址和Controller的映射关系
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const _jwt = middleware.jwtErr(app.config.jwt.secret); // 传入加密字符串
  // 用户相关路由
  router.post('/api/user/register', controller.user.register); // 注册接口
  router.post('/api/user/login', controller.user.login); // 登录接口
  router.get('/api/user/getinfo', _jwt, controller.user.getUserInfo); // 获取用户信息的接口
  router.post('/api/user/editinfo', _jwt, controller.user.editUserInfo); // 获取用户信息的接口
  router.get('/api/user/test', _jwt, controller.user.test); // 解析token接口
  // 上传图片的路由
  router.post('/api/upload', controller.upload.upload); // 解析token接口
  // 账单相关路由
  router.post('/api/bill/add', _jwt, controller.bill.add); // 添加账单信息
  router.post('/api/type/add', controller.type.add); // 添加账单信息
  router.get('/api/bill/list', _jwt, controller.bill.list); // 获取账单列表
  router.get('/api/bill/detail', _jwt, controller.bill.detail); // 获取账单信息
  router.post('/api/bill/update', _jwt, controller.bill.update); // 更新账单信息
  router.post('/api/bill/delete', _jwt, controller.bill.delete); // 根据id删除账单
  router.get('/api/bill/data', _jwt, controller.bill.data); // 获取数据
};
