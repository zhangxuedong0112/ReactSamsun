import React, { useState } from 'react';
import { Form, Col, Input, Row, Button } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';

export interface SearchProps {
    initialValues: any;
    datas: SearchDatasProps[];
    getForm: Function;
}

export interface SearchDatasProps {
    name: any;
    label?: any;
    component: any;
    rules?: any;
}

const Search: React.FC<SearchProps> = props => {
    const [expand, setExpand] = useState(false);
    const [form] = Form.useForm();
    const { datas, getForm } = props;

    getForm && getForm(form);

    const getFields = () => {
        let minCount = datas.length > 6 ? 6 : datas.length;

        const count = expand ? datas.length : minCount;
        const children = [];
        for (let i = 0; i < count; i++) {
            const d = datas[i];

            children.push(
                <Col span={8} key={i}>
                    <Form.Item
                        key={d.name}
                        name={d.name}
                        label={d.label || ''}
                        rules={d.rules || []}
                    >
                        {d.component}
                    </Form.Item>
                </Col>,
            );
        }
        return children;
    };

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    return (
        <>
            <Form
                {...layout}
                form={form}
                name="advanced_search"
                className="ant-advanced-search-form"
            >
                <Row gutter={24}>{getFields()}</Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        {props.children}

                        <a
                            style={{ fontSize: 12 }}
                            onClick={() => {
                                setExpand(!expand);
                            }}
                        >
                            {expand ? <UpOutlined /> : <DownOutlined />}{' '}
                            Collapse
                        </a>
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default Search;
