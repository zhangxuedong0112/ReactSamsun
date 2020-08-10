import React, { useEffect, useState } from 'react';
import './style.less';
import Search from './components/search';
import Table from './components/table';
import './style.less';
import { Collapse } from 'antd';
const { Panel } = Collapse;

const SearchDemo: React.FC = props => {
    return (
        <Collapse
            defaultActiveKey={['1', '2']}
            expandIconPosition="right"
            ghost={true}
        >
            <Panel header="Search" key="1">
                <Search {...props}></Search>
            </Panel>

            <Panel header="List" key="2">
                <Table {...props}></Table>
            </Panel>
        </Collapse>
    );
};

export default SearchDemo;
