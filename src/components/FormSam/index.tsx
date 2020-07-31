import React, { useState } from 'react';
import { Form, Col, Input, Row, Button } from 'antd';
import { UpOutlined, DownOutlined } from '@ant-design/icons';

export interface FormSamProps {
    initialValues: any /* 初始化对象 */;
    datas: FormDatasProps[] /* 需要渲染的组件对象 */;
    getForm?: Function /* 返回当前form对象进行绑定，可不传 */;
    fold?: boolean /* 是否显示折叠 */;
    columnNum?: any /* 列数 默认3列 */;
    antdProps?: any /* antd 其他参数可自己传入 */;
    [key: string]: any /* 其他 */;
}

export interface FormDatasProps {
    name: any /* 跟后台数据绑定的key */;
    label?: any /* 用户看到的title */;
    component: any /* 组件 */;
    rules?: any /* 校验 */;
    linkage?: Function /* 级联下拉关联父节点*/;
}

/*  
    对form 表单进行封装; 
    demo 参考 pages/searchPage; 
    支持下拉级联
*/
const FormSam: React.FC<FormSamProps> = props => {
    const [expand, setExpand] = useState(false);
    const [num, SetNum] = useState(0);
    const { datas, getForm, fold, columnNum, antdProps = {} } = props;
    let defaultMinCount = 6;

    const getFields = () => {
        let count: any;
        let span = 8;

        if (columnNum) {
            try {
                /* 计算显示几列 */
                span = 24 / columnNum;

                /* 计算最小显示条数,给折叠用的 */
                defaultMinCount = columnNum * 2;
            } catch (error) {}
        }

        if (!fold) {
            /* 不启用折叠时，显示所有dom元素 */
            count = datas.length;
        } else {
            /* 启用折叠时，要计算最小count */
            let minCount =
                datas.length > defaultMinCount ? defaultMinCount : datas.length;
            count = expand ? datas.length : minCount;
        }

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
                <Col span={span} key={i}>
                    <Form.Item
                        key={d.name + linkage} /* 级联重新生成元素 */
                        name={d.name}
                        label={d.label || ''}
                        rules={d.rules || []}
                    >
                        {React.cloneElement(d.component, {
                            style: { width: '100%' },
                            ...pop,
                        })}
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
                // wrapperCol={{span: 24}}
                onValuesChange={(changedValues, allValues) => {
                    SetNum(num + 1);
                }}
                {...antdProps}
            >
                <Row gutter={24}>{getFields()}</Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        {props.children}

                        {/* 启用折叠，并且dom数大于默认最小数才展示 */}
                        {fold && datas.length > defaultMinCount && (
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

export default FormSam;
