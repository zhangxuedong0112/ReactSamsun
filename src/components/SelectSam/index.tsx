import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

interface SelectProps {}

const SelectSam: React.FC = props => {
    return (
        <>
            <Select>
                <Option value="jack">Jack</Option>
            </Select>
        </>
    );
};

export default SelectSam;
