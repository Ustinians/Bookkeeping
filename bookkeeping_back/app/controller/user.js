// 用于编写用户相关代码
'use strict';

// @ Controller 处理业务逻辑
const md5 = require('md5'); // 引入md5加密用户登录密码
const Controller = require('egg').Controller;
/**
 * 如果请求成功,code=0,否则code=1
 */
// 声明默认头像
const defaultAvatar = 'http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png';

class UserController extends Controller {
  // 注册用户方法
  async register() {
    const { ctx } = this;
    // eslint-disable-next-line no-unused-vars
    const { username, password } = ctx.request.body; // 获取注册时需要的参数(请求体)
    // 判断用户名和密码是否为空,如果账号密码为空
    if (!username || !password) {
      ctx.body = {
        code: 500,
        msg: '账号密码不能为空!',
        data: null,
      };
      return;
    }
    // 验证数据库中是否已经有该账户名
    const userInfo = await ctx.service.user.getUserByName(username);
    // 判断是否已经存在(如果存在,说明该账户名已经被使用)
    if (userInfo && userInfo.id) {
      ctx.body = {
        code: 500,
        msg: '账户名已经被注册,请重新输入',
        data: null,
      };
      return;
    }
    // 调用service方法,将数据存储到数据库中
    const result = await ctx.service.user.register({
      username,
      password: md5(password), // 密码通过md5进行加密
      ctime: new Date(),
      signature: '世界和平',
      avatar: defaultAvatar,
    });
    // 如果请求成功
    if (result) {
      ctx.body = {
        code: 200,
        msg: '注册成功',
        data: null,
      };
    } else { // 请求失败
      ctx.body = {
        code: 500,
        msg: '注册失败',
        data: null,
      };
    }
  }
  // 用户登录的方法(token存储用户数据)
  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body; // 获取登录账户名和密码
    // 根据用户名,在数据库中查找对应的id(获取用户信息)
    const userInfo = await ctx.service.user.getUserByName(username);
    // 数据库中没有该用户
    if (!userInfo || !userInfo.id) {
      ctx.body = {
        code: 500,
        msg: '账户不存在',
        data: null,
      };
      return;
    }
    // 如果找到了用户,判断输入的密码是否正确
    if (userInfo && md5(password) !== userInfo.password) {
      ctx.body = {
        code: 500,
        msg: '账号密码错误',
        data: null,
      };
      return;
    }
    // 登录通过之后
    // app.jwt.sign接收两个参数,第一个为对象,第二个是加密字符串
    const token = app.jwt.sign({
      id: userInfo.id,
      username: userInfo.username,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // token有效期为24个小时(用于编写用户权限)
    }, app.config.jwt.secret);
    // 登录成功之后,返回登录获得的token
    // 得到的token中存储着username和id,但是客户端无法破解,必须利用加密字符串结合egg-jwt的方法才能解析
    ctx.body = {
      code: 200,
      msg: '登录成功',
      data: {
        token,
      },
    };
  }
  // 验证服务端如何解析token(做用户权限)
  async test() {
    const { ctx, app } = this;
    // 通过token解析,拿到user_id
    const token = ctx.request.header.authorization; // 请求头获取 authorization 属性,值为token(获取token)
    // 通过app.jwt.verify+加密字符串,解析出token的值(解析token)
    const decode = await app.jwt.verify(token, app.config.jwt.secret);
    // 响应接口(返回token)
    ctx.body = {
      code: 200,
      msg: '获取成功',
      data: {
        ...decode,
      },
    };
  }
  // 获取用户信息的方法
  async getUserInfo() {
    const { ctx, app } = this;
    const token = ctx.request.header.authorization; // 获取token的信息
    // 通过app.jwt.verity方法,解析出token内的用户信息
    const decode = await app.jwt.verify(token, app.config.jwt.secret);
    // 通过hetUserByName方法,以用户名decode.username为参数,从数据库获取该用户的名下相关信息
    const userInfo = await ctx.service.user.getUserByName(decode.username);
    // userInfo中应该有密码信息,但是不能直接返回给客户端(容易造成信息泄露),因此只将下面四项返回给客户端
    ctx.body = {
      code: 200,
      msg: '请求成功',
      data: {
        id: userInfo.id, // 用户id
        username: userInfo.username, // 用户名
        signature: userInfo.signature || '', // 用户个性签名,如果没有的话返回空串
        avatar: userInfo.avatar || defaultAvatar, // 用户头像,如果没有的话返回默认头像的地址
      },
    };
  }
  // 修改用户信息的方法(修改头像or个性签名)
  async editUserInfo() {
    const { ctx, app } = this;
    // 通过POST请求,再请求体中获取签名字符 singature和头像信息 avatar
    const { signature = '', avatar = '' } = ctx.request.body; // 从请求体中取出个性签名(如果没有传入的话默认是空串'')
    try {
      // let user_id;
      const token = ctx.request.header.authorization; // 获取token
      // 解密token中的用户名称
      const decode = await app.jwt.verify(token, app.config.jwt.secret); // 解码token
      if (!decode) return; // 没有用户信息(可能是未登录或者token失效过期)
      // user_id = decode.id; // 获取用户id
      // 通过suername查找userInfo信息
      const userInfo = await ctx.service.user.getUserByName(decode.username);
      // * 通过service里面user的方法修改signuture信息
      // eslint-disable-next-line no-unused-vars
      const result = await ctx.service.user.editUserInfo({
        ...userInfo,
        signature,
        avatar,
      });
      // 修改成功返回
      ctx.body = {
        code: 200,
        msg: '修改个性签名成功',
        data: { // 返回修改人的id,username和signature
          id: userInfo.id,
          username: userInfo.username,
          signature,
          avatar,
        },
      };
    } catch (error) {
      // error处理
      console.log(error);
      ctx.body = {
        code: 500,
        msg: '修改个性签名失败',
        data: null,
      };
    }
  }
}

module.exports = UserController;
