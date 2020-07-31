import React from 'react';
import Button from 'antd/es/button/button';
import FormSam, { FormDatasProps } from '@/components/FormSam';
import { Input, Form, DatePicker } from 'antd';
import SelectSam from '@/components/SelectSam';
import Store from '@/pages/searchPage/stores';
import Message from '@/components/message';

const Search: React.FC = props => {
    let [form] = Form.useForm();

    const { getFieldsValue, validateFields, getFieldValue } = form;

    const SearchDatas: FormDatasProps[] = [
        {
            name: 'wenben1',
            label: '文本框带校验',
            component: <Input />,
            rules: [{ required: true, message: 'Please input!' }],
        },
        {
            name: 'demo1',
            label: '级联1,正常下拉',
            component: (
                <SelectSam
                    antdProps={{
                        mode: 'multiple',
                    }}
                    dataSource={[
                        { text: '1', value: '1', selected: false },
                        { text: '2', value: '2', selected: false },
                    ]}
                />
            ),
        },
        {
            name: 'demo2',
            label: '级联2,依赖上一个',
            linkage: () => {
                return getFieldsValue(['demo1']);
            },
            component: (
                <SelectSam
                    antdProps={{
                        mode: 'multiple',
                    }}
                    dataSource={(linkages: any) => {
                        return new Promise((res, rej) => {
                            if (!linkages || !linkages.demo1) {
                                return res([]);
                            }

                            /* 模拟接口 */
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
            label: '级联3,依赖上一个',
            linkage: () => {
                return getFieldValue(['demo2']);
            },
            component: (
                <SelectSam
                    antdProps={{
                        mode: 'multiple',
                    }}
                    dataSource={(demo2: any) => {
                        return new Promise((res, rej) => {
                            if (!demo2) {
                                return res([]);
                            }

                            /* 模拟接口 */
                            setTimeout(() => {
                                let arr = demo2.map(d => {
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
            name: 'from',
            label: 'From',
            component: (
                <DatePicker
                    format="YYYY-MM-DD"
                    disabledDate={current => {
                        let to = getFieldValue('to');

                        if (!to) {
                            return false;
                        }

                        return current && current > to;
                    }}
                />
            ),
        },
        {
            name: 'to',
            label: 'To',
            component: (
                <DatePicker
                    format="YYYY-MM-DD"
                    disabledDate={current => {
                        let from = getFieldValue('from');

                        if (!from) {
                            return false;
                        }

                        return current && current < from;
                    }}
                />
            ),
        },
        {
            name: 'from1',
            label: 'From1',
            component: <Input />,
        },
        {
            name: 'to1',
            label: 'To1',
            component: <Input />,
        },
        {
            name: 'to2',
            label: 'To2',
            component: <Input />,
        },
    ];

    return (
        <>
            <FormSam
                initialValues={{
                    /* 初始化数据 */
                    userName: 'zxd',
                }}
                datas={SearchDatas} /* 组件数据 */
                getForm={() => {
                    /* form 对象注进去 */
                    return form;
                }}
                fold={true} /* 是否显示折叠, 可不传，默认false */
                columnNum={3} /* 可不传，默认3 */
                antdProps={
                    /* antd form 其他参数可自己传入 */
                    {
                        style: { background: '#fafafa' },
                    }
                }
            >
                {/* 自定义子组件 */}
                <Button
                    type="primary"
                    htmlType="submit"
                    onClick={async () => {
                        try {
                            let ds = await validateFields();

                            Store.setSearchForm(ds);

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
            </FormSam>
        </>
    );
};

export default Search;
