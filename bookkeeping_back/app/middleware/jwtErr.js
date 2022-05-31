'use strict';

// 编写token验证的中间件
/**
 * 中间件默认抛出一个函数,该函数返回一个异步方法jwtErr,jwtErr有两个参宿
 * ctx 上下文,可以拿到全局对象app
 */
// eslint-disable-next-line arrow-parens
module.exports = (secret) => {
  return async function jwtErr(ctx, next) {
    // 通过 ctx.request.header.authorization 获取到请求头中的 authorization 属性, 它便是我们请求接口是携带的 token 值
    const token = ctx.request.header.authorization; // 若是没有 token，返回的是 null 字符串
    // eslint-disable-next-line no-unused-vars
    let decode;
    if (token !== 'null' && token) {
      try {
        decode = ctx.app.jwt.verify(token, secret); // 验证token
        await next();
      } catch (error) {
        console.log('error', error);
        ctx.status = 200;
        ctx.body = {
          msg: 'token已过期,请重新登录',
          code: 401,
        };
        return;
      }
    } else {
      ctx.status = 200;
      ctx.body = {
        code: 401,
        msg: 'token不存在',
      };
      return;
    }
  };
};
