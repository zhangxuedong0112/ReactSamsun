import React from 'react';
import { Table } from 'antd';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { AntdProps } from '..';

const AntdTable: React.FC<AntdProps> = observer(props => {
    const {
        store,
        usePage = true,
        disabled = false,
        checkboxSelection = true,
        key = '',
        tableName = '',
        actionObj = null,
        antdProps = {},
    } = props;

    /**
     * 分页 参数 改变回调
     * @param current
     * @param pageSize
     */
    const onChangePagination = (current: number, pageSize: number) => {
        let param = {
            ...store.filterParams,
            ...store.pageParams,
            current: current,
            pageSize: pageSize,
        };

        store.onSearch(param);
    };

    const { total, pageSize, current } = store.pagination;
    const paginationProps = {
        total: total,
        pageSize: pageSize,
        current: current,
        onChange: onChangePagination,
        showSizeChanger: true,
        onShowSizeChange: onChangePagination,
    };

    /**
     * 选择的 行 数据 回调
     * @param event
     */
    const onSelectionChanged = event => {
        let data = event.api.getSelectedRows();

        store && store.changeSelectedRowData(data);
    };

    return (
        <>
            <Table
                columns={toJS(store.columns)}
                dataSource={toJS(store.tableList)}
                loading={store.loadingTable}
                pagination={paginationProps}
                rowSelection={{
                    type: 'checkbox',
                    onChange: (selectedRowKeys, selectedRows) => {
                        store && store.changeSelectedRowData(selectedRows);
                    },
                }}
                {...antdProps}
            ></Table>
        </>
    );
});

export default AntdTable;
