import React, { useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, message, Space } from 'antd';
import './Registered.css'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
export const Registered = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate()
    const error = () => {
        messageApi.open({
            type: 'error',
            content: '注册失败用户名已占用',
        });
    };
    const warning = () => {
        messageApi.open({
            type: 'warning',
            content: '注册失败请重试',
        });
    };
    const success = () => {
        messageApi.open({
            type: 'success',
            content: '注册成功！',
        });
    };
    const Registered_pass = (data, value) => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].name === value.username) {
                return error()
            }
        }
        axios.post("http://localhost:8080/username", {
            name: value.username, password: value.password, role: value.identity
        }).then(res => {
            console.log(res);
            success()
            login()
        })

    }



    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        axios.get("http://localhost:8080/username").then(res => {
            const data = res.data

            Registered_pass(data, values)
        },
            rej => {
                warning()
            })

    };

    //单选按钮
    const [value, setValue] = useState(1);
    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };
    //跳转到登录页面
    const login = () => {
        navigate('/login')
    }
    return (
        <div className='Registered'>
            <div className="Registered_title">
                <h3>药品交易</h3>
            </div>
            <div className="Registered_bgc">
                <h3 className='Registered_h3'>用户注册</h3>
                {contextHolder}
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
                        <Input prefix={<UserOutlined className="site-form-item-icon " />} placeholder="用户名" className='Registered-username' />
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
                            className='Registered-username'
                        />
                    </Form.Item>
                    <Form.Item
                        name="identity"
                        rules={[
                            {
                                required: true,
                                message: '请选择你的身份',
                            },
                        ]}
                    >

                        <Radio.Group onChange={onChange} value={value}>
                            <Radio value={'adminuser'}>管理员</Radio>
                            <Radio value={'shoppinguser'}>商家</Radio>
                            <Radio value={'user'}>消费者</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button  Registered_button">
                            注册
                        </Button>
                        <br />
                        <Link to='/login'>登录</Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
