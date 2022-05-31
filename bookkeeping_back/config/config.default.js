/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1653746201268_1517';

  // add your middleware config here
  config.middleware = [];

  // 设置白名单配置
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: [ '*' ], // 配置白名单(通用)
  };

  // 配置ejs
  config.view = {
    mapping: { '.html': 'ejs' }, // 自动渲染.html文件
  };

  // 配置MySQL数据库
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '267020', // 初始化密码，没设置的可以不写
      // 数据库名
      database: 'bookkeeping', // 我们新建的数据库名称
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  // 添加自定义加密字符串
  config.jwt = {
    secret: '267020',
  };

  /**
   * egg 提供两种文件接收模式，1 是 file 直接读取，2 是 stream 流的方式。我们采用比较熟悉的 file 形式
   * 所以需要前往 config/config.default.js 配置好接收形式
   */
  // 设置mode的属性
  config.multipart = {
    mode: 'file',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    uploadDir: '/app/public/upload', // 声明文件的默认存储路径
  };

  return {
    ...config,
    ...userConfig,
  };
};
