import React, { useEffect, useState } from 'react';
import Button from 'antd/es/button/button';
import Search, { SearchDatasProps } from '@/components/Search';
import { FormInstance } from 'rc-field-form/lib/interface';
import Message from '@/utils/message';
import { Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';

const SearchDemo: React.FC = props => {
    let form: FormInstance;

    const SearchDatas: SearchDatasProps[] = [
        {
            name: 'userName',
            label: 'User Name',
            component: <Input />,
            rules: [
                { required: true, message: 'Please input your User Name!' },
            ],
        },
        {
            name: 'password',
            label: 'Password',
            component: (
                <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                />
            ),
            rules: [{ required: true, message: 'Please input your Password!' }],
        },
        {
            name: 'demo1',
            label: 'demo1',
            component: <Input />,
        },
        {
            name: 'demo2',
            label: 'demo2',
            component: <Input />,
        },
        {
            name: 'demo3',
            label: 'demo3demo3demo3',
            component: <Input />,
        },
    ];

    return (
        <>
            <Search
                initialValues={{
                    userName: 'zxd',
                }}
                datas={SearchDatas}
                getForm={res => {
                    form = res;
                }}
            >
                <Button
                    type="primary"
                    htmlType="submit"
                    onClick={async () => {
                        try {
                            let ds = await form.validateFields();

                            Message.success(JSON.stringify(ds));
                        } catch (error) {
                            console.error(error);
                        }
                    }}
                >
                    Search
                </Button>
                <Button
                    style={{ margin: '0 8px' }}
                    onClick={() => {
                        form.resetFields();
                    }}
                >
                    Clear
                </Button>
            </Search>
        </>
    );
};

export default SearchDemo;