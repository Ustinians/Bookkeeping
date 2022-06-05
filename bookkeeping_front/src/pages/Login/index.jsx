import React, {useState, useCallback} from 'react';
import { Cell, Input, Button, Checkbox, Toast } from 'zarm'; // 引入需要的组件
import CustomIcon from "@/components/CustomIcon"; // 引入Icon图标
import Captcha from 'react-captcha-code'; // 引入注册时要填写的验证码
import { reqRegister } from '@/api';
import './index.less';
/**
 * @Login 用户登录和注册的界面
 */
export default function Login() {
  const [username,setUsername] = useState(''); // 账号
  const [password,setPassword] = useState(''); // 密码
  const [verity,setVerity] = useState(''); // 验证码
  const [captcha, setCaptcha] = useState(''); // 验证码变化后存储值
  // 处理验证码变化的回调方法
  const handleChange = useCallback((captcha) => {
    console.log('captcha: ',captcha);
    setCaptcha(captcha);
  }, []);
  // 提交注册信息的方法
  const onSubmit = async () => {
    if(!username){
      Toast.show("请输入账号");
      return;
    }
    if(!password){
      Toast.show("请输入密码");
      return;
    }
    if(!verity){
      Toast.show("请输入验证码")
      return;
    }
    if(verity !== captcha){
      Toast.show("验证码错误");
      return;
    }
    const result = await reqRegister(username, password);
    console.log(result);
    if(result.code === 200){
      Toast.show("注册成功");
    }
    else{
      Toast.show("注册失败");
    }
  }
  return (
    <div className='auth'>
      <div className='head' />
      <div className='tab'>
        <span>注册</span>
      </div>
      <div className='form'>
        <Cell icon={<CustomIcon type='zhanghao' />}>
          <Input 
            clearable
            type='text'
            placeholder='请输入账号'
            onChange={(value) => setUsername(value)}
          />
        </Cell>
        <Cell icon={<CustomIcon type='mima' />}>
          <Input 
            clearable
            type='password'
            placeholder='请输入密码'
            onChange={(value) => setPassword(value)}
          />
        </Cell>
        <Cell icon={<CustomIcon type='mima' />}>
          <Input 
            clearable
            type='text'
            placeholder='请输入验证码'
            onChange={(value) => setVerity(value)}
          />
          <Captcha charNum={4} onChange={handleChange} />
        </Cell>
      </div>
      <div className='operation'>
        <div className='agree'>
          <Checkbox />
          <label className='text-light'>阅读并同意<a>《xxx记账本条款》</a></label>
        </div>
        <Button block theme='primary' onClick={onSubmit}>注册</Button>
      </div>
    </div>
  )
}
