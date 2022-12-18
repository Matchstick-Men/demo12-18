import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
export const Login = () => {
    const navigate = useNavigate()
    const onFinish = (values) => {
        // console.log('Received values of form: ', values);
        axios.get('http://localhost:8080/username').then(res => {
            const data = res.data
            let username = ''
            for (let i = 0; i < data.length; i++) {
                if (data[i].name === values.username) {
                    username = data[i]
                    console.log(username);
                }
            }
            if (!username) {
                alert('不存在该用户名');
            } else if (username.password === values.password) {
                // console.log('登录成功');
                localStorage.setItem('name', JSON.stringify(username))
                navigate('/home')
            } else {
                alert('密码错误');
            }
        })
    };
    return (
        <div className="login">
            <div className="login_title">
                <h3>药品交易</h3>
            </div>
            <div className="login_bgc">
                <h3 className='login_h3'>用户登录</h3>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon " />} placeholder="用户名" className='login-username' />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                            className='login-username'
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button  login_button">
                            登陆
                        </Button>
                        <br />
                        <Link to='/registered'>注册</Link>
                    </Form.Item>
                </Form>
            </div>

        </div>
    );
}
