import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Space, Table, Modal, Form, Input, Button, Upload } from 'antd';
import * as XLSX from 'xlsx';
export const Home = () => {
    const [data, setData] = useState()
    const uname = JSON.parse(localStorage.getItem("name"))
    //获取数据
    const getdata = () => {
        axios.get("http://localhost:8080/goods").then(res => {
            setData(res.data)
        })
    }
    useEffect(() => {
        getdata()
    }, [])
    //修改列表
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listdata, setListdata] = useState({})
    const showModal = (record) => {
        setIsModalOpen(true);
        setListdata(record);
    };
    const handleOk = () => {
        onFinish()
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    // 模态框内表格
    const onFinish = (values) => {
        // console.log('Success:', values);
        axios.patch("http://localhost:8080/goods/" + listdata.id, { SY: values.SY, name: values.name, price: values.price, merchants: values.merchants, category: values.category })
            .then(res => {
                console.log(res);
                getdata()
            })
        setIsModalOpen(false);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        setIsModalOpen(false);
    };
    //添加数据
    const onAddFinish = (values) => {
        axios.post("http://localhost:8080/goods", { SY: values.SY, name: values.name, price: values.price, merchants: values.merchants, category: values.category }).then(res => {
            getdata()
        })
        setAddisModalOpen(false);
    }
    //修改列表
    const [addisModalOpen, setAddisModalOpen] = useState(false);
    const [addlistdata, setAddlistdata] = useState({})
    const showModalAdd = (record) => {
        setAddisModalOpen(true);
        setAddlistdata(record);
    };
    const handleaddOk = () => {
        onAddFinish()
        setAddisModalOpen(false);
    };
    const handleaddCancel = () => {
        setAddisModalOpen(false);
    };
    //删除列表
    const deletelist = (record) => {
        // console.log(record);
        axios.delete("http://localhost:8080/goods/" + record.id).then(res => {
            getdata()
        })
    }
    //表格设置
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: '药品代码',
            dataIndex: 'SY',
            key: 'SY',
        },
        {
            title: '药品名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '商家',
            key: 'id',
            dataIndex: 'merchants',
        },
        {
            title: '类别',
            dataIndex: 'category',
            key: 'id',
        },
        uname.role !== "user" ?
            {
                title: '操作',
                key: 'category',
                render: (_, record) => (
                    <Space size="middle">
                        <a onClick={() => showModal(record)}>修改</a>
                        <a onClick={() => deletelist(record)}>删除</a>

                    </Space>
                ),
            } : {}
    ];

    //表格设置结束
    //上传excel表格

    const uploadProps = {
        accept: '.xls,.xlsx,application/vnd.ms-excel',
        beforeUpload: (file) => {
            const f = file;
            const reader = new FileReader();
            reader.onload = (e) => {
                const datas = e.target.result;
                const workbook = XLSX.read(datas, {
                    type: 'binary',
                });
                const first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonArr = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });
                handleImpotedJson(jsonArr, file);
            };
            reader.readAsBinaryString(f);
            return false;
        },
        onRemove: () => {

        },
    };

    const handleImpotedJson = (jsonArr,) => {
        //jsonArr返回的是你上传的excel表格的每一行的数据 是数组形式
        jsonArr.splice(0, 1); // 去掉表头
        jsonArr.map((item) => {
            //在这写你需要的处理逻辑
            axios.post("http://localhost:8080/goods", { SY: item[0], name: item[1], price: item[2], merchants: item[3], category: item[4] }).then(res => {
                getdata()
            })
        });
    };

    return (
        <div className='home'>首页
            <span className='home_username' >欢迎{uname.name}</span>
            {/* 模态框 */}
            <Modal title="修改列表" open={isModalOpen}
                onOk={handleOk} onCancel={handleCancel}
                footer={[]}
            >
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="药品代码"
                        name="SY"
                        rules={[
                            {
                                required: true,
                                message: '请输入药品代码',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="药品名"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: '请输入药品名',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="价格"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: '请输入价格',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="商家"
                        name="merchants"
                        rules={[
                            {
                                required: true,
                                message: '请输入商家',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="类别"
                        name="category"
                        rules={[
                            {
                                required: true,
                                message: '请输入类别',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            确定修改
                        </Button>
                    </Form.Item>
                </Form>

            </Modal>
            {/* 表格 */}
            <Table columns={columns} dataSource={data} />

            {uname.role === "adminuser" ? <div className='home_addlist'>
                <Button type="primary" onClick={showModalAdd}>
                    添加一条数据
                </Button>
                <Modal title="添加列表" open={addisModalOpen}
                    onOk={handleaddOk} onCancel={handleaddCancel}
                    footer={[]}
                >
                    <Form
                        name="basic"
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onAddFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="药品代码"
                            name="SY"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入药品代码',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="药品名"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入药品名',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="价格"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入价格',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="商家"
                            name="merchants"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入商家',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="类别"
                            name="category"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入类别',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                确定增加
                            </Button>
                        </Form.Item>
                    </Form>

                </Modal>
                <Upload {...uploadProps}>
                    <Button type="primary">导入Excel</Button>
                </Upload>
            </div>
                : ''}

        </div>
    )
}
