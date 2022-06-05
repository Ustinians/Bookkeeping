# Bookkeeping Front
## 创建项目
yarn create @vitejs/app bookkeeping_front --template react
## 配置按需引入
* 安装插件 `yarn add vite-plugin-style-import`

* 配置vite.config.js

  ```js
  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'
  
  // https://vitejs.dev/config/
  export default defineConfig({
    plugins: [
      react(),
      ['import', {
        libraryName: 'zarm',
        style: true, // or 'css'
      }],
    ]
  })
  ```

## 配置CSS预处理器Less

* 安装less:  `yarn add less`

* 在vite.congif.js中进行配置

  ```js
  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'
  
  // https://vitejs.dev/config/
  export default defineConfig({
    plugins: [
      react(),
      ['import', {
        libraryName: 'zarm',
        style: true, // or 'css'
      }],
    ],
    css: {
      modules: {
        localsConvention: 'dashesOnly'
      },
      preprocessorOptions: {
        less: {
          // 支持内联 JavaScript
          javascriptEnabled: true,
        }
      }
    },
  })
  ```

## 移动端分配率适配

* 安装`lib-flexible`

* 在main.jsx中引入

  ```js
  import 'lib-flexible/flexible' // 引入移动端适配
  ```

* 安装一个 `postcss-pxtorem`，它的作用是在你编写完 `css` 后，将你的单位自动转化为 `rem` 单位

  ```
  yarn add postcss-pxtorem
  ```

* 在项目根目录新建 `postcss.config.js`

  ```js
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
  ```

## 注册和登录

* 引入`react-captcha-code`为页面提供验证码

  ```
  yarn add react-captcha-code
  ```

  