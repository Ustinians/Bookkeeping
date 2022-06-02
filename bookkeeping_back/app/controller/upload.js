// 编写上传文件程序的js文件
'use strict';

/**
 * 逻辑
 * 1. 首先需要在前端调用上传接口,并将图片参数带上
 * 2. 在服务端接收全段传过来的图片信息,信息中含有图片路径信息,我们在服务端通过fs.readFileSync的方法读取图片内容,并存放在变量中
 * 3. 设计存放图片的公共位置/app/public/upload,上传的资源都存储在此位置
 * 4. 通过fs.writeFileSync方法,将图片内容存储在第3步创建的文件夹中
 * 5. 最后返回图片地址(host + IP + 图片名称 + 后缀)
 */

const fs = require('fs');
const moment = require('moment');
const mkdirp = require('mkdirp');
const path = require('path');

const Controller = require('egg').Controller;

class UploadController extends Controller {
  async upload() {
    const { ctx } = this;
    // 将.config/config.default.js文件中设置config.multipart的mode属性为file
    const file = ctx.request.files[0]; // 获取前端POST请求得到的文件
    // 声明存放资源的路径
    let uploadDir = '';
    try {
      // ctx.request.file[0]表示获取第一个文件,若上传多个文件则可以遍历这个数组对象(上传头像只有一张图片)
      const f = fs.readFileSync(file.filepath); // 读取文件并保存在变量f中
      // 获取当前的日期
      const day = moment(new Date()).format('YYYYMMDD'); // 每天上传的图片保存到一起
      // 创建图片保存的路径(默认存储图片的路径+当天的日期)
      const dir = path.join(this.config.uploadDir, day);
      const date = Date.now(); // 毫秒数(用于拼接文件名)
      await mkdirp(dir); // 如果不存在该目录就创建一个
      // 返回文件的保存路径(创建文件路径)
      uploadDir = path.join(dir, date + path.extname(file.filename));
      // 将图片文件写入对应的路径
      fs.writeFileSync(uploadDir, f);
    } finally {
      // 清除临时文件
      ctx.cleanupRequestFiles();
    }
    ctx.body = { // 如果图片上传成功
      code: 200,
      msg: '上传文件成功',
      data: uploadDir.replace(/app/g, ''), // 需要将 app 去除，因为我们在前端访问路径的时候，是不需要 app 这个路径的
    };
  }
}

module.exports = UploadController;

