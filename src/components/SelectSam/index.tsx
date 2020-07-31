import React, { useState, useEffect } from 'react';
import { Select, Spin } from 'antd';

const { Option } = Select;

/* 
    dataSource 可使用数组 OptionDatas[]
               可使用方法，返回promise
*/
export interface SelectProps {
    [key: string]: any;
    dataSource:
        | any
        | Function /* 可使用数组或一个返回promise的函数 ， 参考 pages/searchPage*/;
    linkage?: any /* 级联重新生成元素,参考 pages/searchPage  */;
    antdProps?: any /* antd 其他参数可自己传入 */;
}

export interface OptionDatas {
    text: string /* 用户看到 */;
    value: string /* 后端交互内容 */;
    selected: boolean /* 是否选中 */;
}

/* 下拉，支持级联下拉->需要在FormSam 组件中使用才兼容 */
const SelectSam: React.FC<SelectProps> = props => {
    const [ops, setOps] = useState([]);
    const [loading, setLoading] = useState(true);
    const { dataSource, linkage, antdProps = {} } = props;
    let isLive = true;

    /* 默认属性 */
    const defaultOps = {
        showSearch: true,
        allowClear: true,
        showArrow: true,
        style: { width: '100%' },
        placeholder: 'Please Select',
        optionFilterProp: 'children',
        linkage: props.linkage,
        ...antdProps,
        ...props,
    };

    /* 清理垃圾 */
    delete defaultOps.dataSource;
    delete defaultOps.linkage;
    delete defaultOps.antdProps;

    useEffect(() => {
        initOps();

        return () => {
            isLive = false;
        };
    }, []);

    const initOps = async () => {
        try {
            setLoading(true);
            let opDatas: OptionDatas[] = [];

            if (typeof dataSource == 'function') {
                opDatas = await dataSource(linkage);
            } else if (Array.isArray(dataSource)) {
                opDatas = dataSource;
            }

            isLive && setOps(opDatas);
        } catch (error) {
            console.error(error);
        } finally {
            isLive && setLoading(false);
        }
    };

    const renderOptions = () => {
        const arr = [];

        ops.map(d => {
            arr.push(
                <Option key={d.value} value={d.value}>
                    {d.text}
                </Option>,
            );
        });

        return arr.length > 0 ? arr : null;
    };

    return (
        <>
            <Select
                loading={loading}
                {...defaultOps}
                filterOption={(input, option) =>
                    option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                }
            >
                {!loading && renderOptions()}
            </Select>
        </>
    );
};

export default SelectSam;
