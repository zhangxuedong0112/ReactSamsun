import React, { useEffect, useState } from 'react';
import Button from 'antd/es/button/button';
import Search, { SearchDatasProps } from '@/components/Search';
import { FormInstance } from 'rc-field-form/lib/interface';
import { Input, Form } from 'antd';
import './style.less';
import SelectSam from '@/components/SelectSam';

const SearchDemo: React.FC = props => {
    const [formDatas, setFormDatas] = useState({});
    let [form] = Form.useForm();

    const { getFieldsValue, validateFields, getFieldInstance } = form;

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
            name: 'demo1',
            label: 'demo1',
            component: (
                <SelectSam
                    mode="multiple"
                    dataSource={[
                        { text: '1', value: '1', selected: false },
                        { text: '2', value: '2', selected: false },
                    ]}
                />
            ),
        },
        {
            name: 'demo2',
            label: 'demo2',
            linkage: () => {
                return getFieldsValue(['demo1']);
            },
            component: (
                <SelectSam
                    mode="multiple"
                    dataSource={(linkages: any) => {
                        return new Promise((res, rej) => {
                            if (!linkages || !linkages.demo1) {
                                return res([]);
                            }

                            setTimeout(() => {
                                let arr = linkages.demo1.map(d => {
                                    return {
                                        text: d,
                                        value: d,
                                        selected: false,
                                    };
                                });

                                return res(arr);
                            }, 1000);
                        });
                    }}
                />
            ),
        },
        {
            name: 'demo3',
            label: 'demo3',
            linkage: () => {
                return getFieldsValue(['demo2']);
            },
            component: (
                <SelectSam
                    mode="multiple"
                    dataSource={(linkages: any) => {
                        return new Promise((res, rej) => {
                            if (!linkages || !linkages.demo2) {
                                return res([]);
                            }

                            setTimeout(() => {
                                let arr = linkages.demo2.map(d => {
                                    return {
                                        text: d,
                                        value: d,
                                        selected: false,
                                    };
                                });

                                return res(arr);
                            }, 1000);
                        });
                    }}
                />
            ),
        },
        {
            name: 'demo4',
            label: 'demo4',
            component: <Input />,
        },
        {
            name: 'demo5',
            label: 'demo5',
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
                getForm={() => {
                    return form;
                }}
            >
                <Button
                    type="primary"
                    htmlType="submit"
                    onClick={async () => {
                        try {
                            let ds = await validateFields();

                            setFormDatas(ds);
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

            <div className="search-result-list">
                <p>Search Result List</p>
                <p>{JSON.stringify(formDatas)}</p>
            </div>
        </>
    );
};

export default SearchDemo;
