import React from 'react'
import ReactDOM from 'react-dom/client'
import 'lib-flexible/flexible' // 引入移动端适配
import { BrowserRouter } from "react-router-dom"
import 'zarm/dist/zarm.css' // 引入组件库的样式
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
