import React from 'react';
import SelectSam, { SelectProps, OptionDatas } from '@/components/SelectSam';

/* 因为antd4 比较严格，不可随意传属性，所以细分一下参数 */
interface SelectAgProps {
    selectProps: SelectProps /* SelectSam 组件参数 */;
    [key: string]: any /* 包含aggrid 内部传进来的属性 */;
}
/* ag 里边下拉组件，支持级联 */
class SelectAg extends React.Component<SelectAgProps> {
    val = this.props.value;

    getValue = () => {
        return this.val;
    };

    render() {
        const { selectProps, api, onSel, value, data } = this.props;
        const { antdProps = {} } = selectProps;

        const newAntdProps = {
            ...antdProps,
            onChange: event => {
                onSel && onSel(this.props, event);
                this.val = event;
                api.stopEditing();
            },
            onBlur: () => {
                api.stopEditing();
            },
        };

        return (
            <>
                <SelectSam
                    {...selectProps}
                    antdProps={{ ...newAntdProps }}
                    defaultValue={this.val}
                    linkage={data}
                />
            </>
        );
    }
}

export default {
    SelectAg,
};
