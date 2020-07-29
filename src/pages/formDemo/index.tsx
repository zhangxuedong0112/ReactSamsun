import React from 'react';
import { observer, useLocalStore } from 'mobx-react';
import { Row, Col, Form, Button, Divider } from 'antd';
import WangEditor from '@/components/WangEditor';
import Infinity from '@/components/Intensify';

/* 使用mobx */
const FormDemo: React.FC<any> = Infinity([observer], props => {
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
            initialValues={{ editor: '' }}
            form={form}
        >
            <Form.Item {...FillLayout} name="editor">
                <WangEditor></WangEditor>
            </Form.Item>

            <Divider />

            <Button
                onClick={async () => {
                    const res = await validateFields();
                    const { editor } = res;
                }}
            >
                Go
            </Button>

            <Divider />
        </Form>
    );
});

export default FormDemo;
