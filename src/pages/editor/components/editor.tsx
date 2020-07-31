import React from 'react';
import { observer, useLocalStore } from 'mobx-react';
import { Row, Col, Form, Button, Divider } from 'antd';
import WangEditor from '@/components/WangEditor';
import store from '../store';
import Message from '@/components/message';
import FormSam, { FormDatasProps } from '@/components/FormSam';

/* 使用mobx */
const Editor: React.FC<any> = observer(props => {
    const [form] = Form.useForm();
    const { validateFields } = form;

    const SearchDatas: FormDatasProps[] = [
        {
            name: 'editor',
            label: '文本框带校验',
            component: <WangEditor />,
            // rules: [{ required: true, message: 'Please input!' }],
        },
    ];

    return (
        <FormSam
            datas={SearchDatas} /* 组件数据 */
            getForm={() => {
                /* form 对象注进去 */
                return form;
            }}
            fold={true} /* 是否显示折叠, 可不传，默认false */
            columnNum={1} /* 可不传，默认3 */
            antdProps={
                /* antd form 其他参数可自己传入 */
                {
                    // style: { background: '#fafafa' },
                    initialValues: {
                        /* 初始化数据 */
                        editor: store.html,
                    },
                }
            }
        >
            {/* 自定义子组件 */}
            <Button
                type="primary"
                htmlType="submit"
                onClick={async () => {
                    try {
                        const res = await validateFields();
                        const { editor } = res;

                        store.setHtml(editor);

                        // Notification.success("获取成功")
                        Message.success('获取成功');
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

            <Divider />

            <p>{store.html}</p>
        </FormSam>
    );
});

export default Editor;
