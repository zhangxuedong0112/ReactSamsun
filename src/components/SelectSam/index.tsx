import React, { useState, useEffect } from 'react';
import { Select, Spin } from 'antd';

const { Option } = Select;

/* 
    dataSource 可使用数组 OptionDatas[]
               可使用方法，返回promise
*/
export interface SelectProps {
    [key: string]: any;
    dataSource: any | Function;
    linkage?: any;
}

export interface OptionDatas {
    text: string;
    value: string;
    selected: boolean;
}

const SelectSam: React.FC<SelectProps> = props => {
    const [ops, setOps] = useState([]);
    const [loading, setLoading] = useState(true);
    const { dataSource, linkage } = props;
    let isLive = true;

    /* 默认属性 */
    const defaultOps = {
        showSearch: true,
        allowClear: true,
        showArrow: true,
        style: { width: '100%' },
        placeholder: 'Please Select',
        optionFilterProp: 'children',
        ...props,
    };

    /* 清理垃圾 */
    delete defaultOps.dataSource;
    delete defaultOps.linkage;

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
