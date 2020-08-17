import React from 'react';
import Action from './components/action';
import Table from './components/table';
import TablePage from '@/store/agGrid';

export interface AntdProps {
    store: TablePage /* table store */;
    usePage?: boolean /* 分页， 默认true */;
    disabled?: boolean /* 禁用， 默认false */;
    checkboxSelection?: boolean /* 复选框, 默认true */;
    key?: string /* key */;
    tableName?: string /* table 名称 */;
    actionObj?: any /* table上边自定义操作 */;
    antdProps?: any /* antd table自带属性 */;
}

const AntdTable: React.FC<AntdProps> = props => {
    return (
        <>
            <Action {...props}></Action>

            <Table {...props}></Table>
        </>
    );
};

export default AntdTable;
