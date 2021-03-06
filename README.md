# 个人记账本设计

## Back End

### 数据库设计

Bookkeeping数据库设计

#### user表

* **id[主键]**：`id` 字段设置为自增字段，避免认为操作导致数据重复。设置为自增之后，每次往 `user` 表里新增数据，都会默认 `id` 加 1，就算你删除了前面的数据，是不会影响到 `id` 的自增。后续我们通过鉴权，生成用户信息。账单表的存储，都会以用户作为出发点。相当于 `A` 用户，存储自己的账单时，都会将 `A` 用户的 `id` 带上，相当于这份账单标记了用户 `A` 的 `id` 
* **username**：用于存储用户登录名称
* **password**：用于存储用户登录密码
* **signature**：个性签名
* **avatar**：用于存储用户头像信息
* **ctime**：用于存储用户创建时间字段

#### bill表

* **id[主键]**：「账单表」的主键
* **pay_type**：账单类型，账单无非就是两种类型，支出和收入，我们用 `pay_type` 作为类型字段，这里约定好 `1` 为支出，`2` 为收入
* **amount**：账单价格，每个账单都需有一个价格属性，表示该笔账单你消费或收入了多少钱
* **date**：账单日期，日期可自由选择，以时间戳的形式存储
* **type_id**：账单标签 id，如餐饮、交通、日用、学习、购物等
* **type_name**：账单标签名称，如餐饮、交通、日用、学习、购物等
* **user_id**：账单归属的用户 `id`，本小册制作的是多用户项目，相当于可以有多个用户来注册使用，所以存储账单的时候，需要将用户的 `id` 带上，便于后面查询账单列表之时，过滤出该用户的账单
* **remark**：账单备注

#### type表

* **id[主键]**：唯一标识，设为主键
* **name**：标签名称，如餐饮、交通、日用、学习、购物等
* **type**：标签类型，默认 `1` 为收入，`2` 为支出
* **user_id**：保留字段，设置该标签的用户归属，默认 0 为全部用户可见，某个用户单独设置的标签，`user_id` 就是该用户的用户 `id`，在获取列表的时候，方便过滤

### 用户鉴权

> 用户鉴权，一种用于在通信网络中对试图访问来自服务提供商的服务的用户进行鉴权的方法。用于用户登陆到DSMP或使用数据业务时，业务网关或Portal发送此消息到DSMP，对该用户使用数据业务的合法性和有效性（状态是否为激活）进行检查。

鉴权就是用户在浏览网页或 `App` 时，通过约定好的方式，让网页和用户建立起一种相互信赖的机制，继而返回给用户需要的信息

鉴权的机制，分为四种：

- HTTP Basic Authentication
- session-cookie
- Token 令牌
- OAuth(开放授权)

在本项目中,将使用`tooken`令牌模式,出于多端考虑，`token` 可以运用在如网页、客户端、小程序、浏览器插件等等领域。如果选用 `cookie` 的形式鉴权，在客户端和小程序就无法使用这套接口，因为它们没有域的概念，而 `cookie` 是需要存在某个域下

#### 登录功能

安装egg-jwt插件: `npm i egg-jwt`

在 `config/plugin.js` 下添加插件：

```js
jwt: {
  enable: true,
  package: 'egg-jwt'
}
```

前往 `config/config.default.js` 下添加自定义加密字符串：

```js
config.jwt = {
  secret: 'xxxxxx',
};
```

`secret` 加密字符串，将在后续用于结合用户信息生成一串 `token`。`secret` 是放在服务端代码中，普通用户是无法通过浏览器发现的(**不能泄露出去**)

#### 图片上传功能

在/app/controller文件夹中创建upload.js文件用于上传文件资源

安装moment和mkdirp用于时间戳的转换和新建文件夹: `npm i moment mkdirp -S `

安装egg-cors用于跨域: `npm i egg-cors`

安装好之后前往/config/plugins.js下添加属性

```js
cors: {
    enable: true,
        package: 'egg-cors',
},
```

在/config/config.default.js中配置

```js
// 配置跨域
config.cors = {
    origin: '*', // 允许所有跨域访问
    credentials: true, // 允许Cookie跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
};
```





















































































































## Front End