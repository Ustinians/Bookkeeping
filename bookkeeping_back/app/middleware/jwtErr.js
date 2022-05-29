// @ 中间件
'use strict';

// 编写token验证的中间件
/**
 * 中间件默认抛出一个函数,该函数返回一个异步方法jwtErr,jwtErr有两个参宿
 * ctx 上下文,可以拿到全局对象app
 */
// eslint-disable-next-line arrow-parens
module.exports = (secret) => {
  return async function jwtErr(ctx, next) {
    const token = ctx.request.authorization; // 如果没有token,返回的是null
    // eslint-disable-next-line no-unused-vars
    let decode;
    // 如果没有token
    if (token !== null && token) {
      try {
        decode = ctx.app.jwt.verity(token, secret); // 验证token
        await next();
      } catch (error) {
        console.log('error', error);
        ctx.status = 200;
        ctx.body = {
          code: 401,
          msg: 'token已过期,请重新登录',
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
