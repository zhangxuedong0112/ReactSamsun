import React from 'react';
import { observer, useLocalStore } from 'mobx-react';
import { Row, Col, Form, Button, Divider } from 'antd';
import WangEditor from '@/components/WangEditor';
import Infinity from '@/components/Intensify';
import store from '../store';
import Notification from '@/utils/notification';
import Message from '@/utils/message';

/* 使用mobx */
const Editor: React.FC<any> = Infinity([observer], props => {
    const [form] = Form.useForm();
    const { validateFields } = form;

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };
    const FillLayout = {
        wrapperCol: { span: 24 },
    };

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{ editor: store.html }}
            form={form}
        >
            <Form.Item {...FillLayout} name="editor">
                <WangEditor></WangEditor>
            </Form.Item>

            <Button
                onClick={async () => {
                    const res = await validateFields();
                    const { editor } = res;

                    store.setHtml(editor);

                    // Notification.success("获取成功")

                    Message.success('获取成功');
                }}
            >
                Go
            </Button>

            <Divider />

            <p>{store.html}</p>
        </Form>
    );
});

export default Editor;
