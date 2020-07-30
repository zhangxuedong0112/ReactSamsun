import React, { useState } from 'react';
import { Form, Col, Input, Row, Button } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';

export interface SearchProps {
    initialValues: any;
    datas: SearchDatasProps[];
    getForm?: Function;
}

export interface SearchDatasProps {
    name: any;
    label?: any;
    component: any;
    rules?: any;
    [key: string]: any;
}

const Search: React.FC<SearchProps> = props => {
    const [expand, setExpand] = useState(false);
    const [num, SetNum] = useState(0);
    const { datas, getForm } = props;

    const getFields = () => {
        let minCount = datas.length > 6 ? 6 : datas.length;

        const count = expand ? datas.length : minCount;
        const children = [];
        for (let i = 0; i < count; i++) {
            const d = datas[i];
            let linkage = d.linkage ? JSON.stringify(d.linkage()) : '';

            let pop = {};
            if (d.linkage) {
                pop = {
                    linkage: d.linkage(),
                };
            }

            children.push(
                <Col span={8} key={i}>
                    <Form.Item
                        key={d.name + linkage}
                        name={d.name}
                        label={d.label || ''}
                        rules={d.rules || []}
                    >
                        {React.cloneElement(d.component, { ...pop })}
                    </Form.Item>
                </Col>,
            );
        }
        return children;
    };

    let form = getForm ? { form: getForm() } : {};

    return (
        <>
            <Form
                {...form}
                layout={'vertical'}
                name="advanced_search"
                className="ant-advanced-search-form"
                scrollToFirstError={true}
                onValuesChange={(changedValues, allValues) => {
                    SetNum(num + 1);
                }}
            >
                <Row gutter={24}>{getFields()}</Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        {props.children}

                        {datas.length > 6 && (
                            <a
                                style={{ fontSize: 12 }}
                                onClick={() => {
                                    setExpand(!expand);
                                }}
                            >
                                {expand ? <UpOutlined /> : <DownOutlined />}{' '}
                                Collapse
                            </a>
                        )}
                    </Col>
                </Row>
            </Form>
        </>
    );
};

export default Search;
