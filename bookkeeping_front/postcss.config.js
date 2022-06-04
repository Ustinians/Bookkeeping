/**
 * postcss.config.js
 * 用vite创建项目,配置postcss需要使用post.config.js
 */
module.exports = {
    "plugins": [
        require('postcss-pxtorem')({
            rootValue: 37.5,
            postList: ['*'],
            selectorBlackList: ['.norem'] // 过滤器norem开头的class,不进行rem转换
        })
    ]
}