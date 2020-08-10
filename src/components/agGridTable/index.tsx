import React, { useEffect } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { AgGrid } from '@/components/table';
import Action from './action';
import TablePage from '@/store/agGrid';

import { GridApi, GridReadyEvent, ColumnApi } from 'ag-grid-community';
import { Debounce } from 'lodash-decorators';

interface GrideProps {
    store: TablePage /* table store */;
    usePage?: boolean /* 分页， 默认true */;
    disabled?: boolean /* 禁用， 默认false */;
    checkboxSelection?: boolean /* 复选框, 默认true */;
    key?: string /* key */;
    tableName?: string /* table 名称 */;
    actionObj?: any;
}

/* 

*/
const AgGridTable: React.FC<GrideProps> = observer(props => {
    let gridApi: GridApi, columnApi: ColumnApi;

    const {
        store,
        usePage = true,
        disabled = false,
        checkboxSelection = true,
        key = '',
        tableName = '',
        actionObj = null,
    } = props;

    console.log('@@@@@@@@@', store && toJS(store.tableList));

    useEffect(() => {}, []);

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

    /**
     * 选择的 行 数据 回调
     * @param event
     */
    const onSelectionChanged = event => {
        let data = event.api.getSelectedRows();

        store && store.changeSelectedRowData(data);
    };

    /**
     * 列编辑完成回调
     * @param event
     */
    const onCellEditingStopped = event => {
        let obj = {
            ...event.data,
        };
        store && store.onEditRow(obj);
    };

    /**
     * 加载完成回调
     * @param event
     */
    const onGridReady = (event: GridReadyEvent) => {
        gridApi = event.api;
        columnApi = event.columnApi;
        autoSizeAll();
    };

    Debounce(100);
    const autoSizeAll = () => {
        gridApi && gridApi.sizeColumnsToFit();
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

    return (
        <AgGrid
            theme="ag-theme-balham"
            checkboxSelection={checkboxSelection}
            key={key || tableName + disabled}
            loading={store.loadingTable}
            suppressRowClickSelection={true}
            gridAutoHeight
            onFirstDataRendered={event => {}}
            actions={<Action {...props} />}
            // 右侧 动作列表菜单
            // dropdown={Action.DropdownAction}
            // 分页配置 https://ant.design/components/pagination-cn/
            paginationProps={usePage ? paginationProps : null}
            // 选择的 数据
            onSelectionChanged={onSelectionChanged}
            // onRowDoubleClicked={this.props.onRowDoubleClicked || this.onDefault}
            //单元格数据发生变化
            // onCellValueChanged={onCellValueChanged}
            // 多选
            rowSelection="multiple"
            // 编辑列 https://www.ag-grid.com/javascript-grid-cell-editing/#example-cell-editing
            defaultColDef={{
                editable: disabled,
                resizable: true,
                sortable: true,
                minWidth: 160,
                // suppressSizeToFit: true,
                // headerClass: "AggirdHeader",
                // cellClass: "AggirdCell",
            }}
            onCellEditingStopped={onCellEditingStopped}
            onGridReady={onGridReady}
            columnDefs={store && toJS(store.columns)}
            rowData={store && toJS(store.tableList)}
            // frameworkComponents={{ ...Framework }}
        ></AgGrid>
    );
});

export default AgGridTable;
