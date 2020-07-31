import {
    ColDef,
    ColGroupDef,
    GridApi,
    GridReadyEvent,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { LicenseManager } from 'ag-grid-enterprise';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import { Pagination, Spin } from 'antd';
import { PaginationProps } from 'antd/lib/pagination';
import lodash from 'lodash';
import { Debounce } from 'lodash-decorators';
import * as React from 'react';
import { fromEvent, Subscription } from 'rxjs';
import { Action, IActionProps } from '../action';
import './style.scss';
// 设置企业 key
LicenseManager.setLicenseKey(
    'SHI_UK_on_behalf_of_Lenovo_Sweden_MultiApp_1Devs6_November_2019__MTU3Mjk5ODQwMDAwMA==e27a8fba6b8b1b40e95ee08e9e0db2cb',
);
type onUpdateHeight = (height: number) => number;
interface ITableProps extends AgGridReactProps {
    /**
     * 容器样式
     */
    style?: React.CSSProperties;
    /**
     * 主题
     */
    theme?: 'ag-theme-balham' | 'ag-theme-material';
    /**
     * 样式
     */
    className?: string;
    /**
     * 分页
     */
    paginationProps?: PaginationProps | boolean;
    /**
     * 加载中
     */
    loading?: boolean;
    /**
     * 选择
     */
    checkboxSelection?: boolean;
    /**
     * 高度 更改 事件
     */
    onUpdateHeight?: onUpdateHeight | boolean;
    rowAction?: React.ReactNode;
    rowActionProps?: ColGroupDef | ColDef;
}
export type IAgGridProps = ITableProps & IActionProps;
export class AgGrid extends React.Component<IAgGridProps, any> {
    /**
     * 全屏 容器
     */
    refFullscreen = React.createRef<HTMLDivElement>();
    render() {
        let {
            actions,
            dropdown,
            actionsHide,
            actionsRight,
            ...props
        } = this.props;
        return (
            <div
                className="lenovo-collapse-refFullscreen"
                ref={this.refFullscreen}
            >
                <Action
                    actions={actions}
                    actionsRight={actionsRight}
                    actionsHide={actionsHide}
                    dropdown={dropdown}
                    fullscreenBody={() => this.refFullscreen}
                />
                <Table {...props} />
            </div>
        );
    }
}

class Table extends React.Component<ITableProps, any> {
    gridApi: GridApi;
    // 表格容器
    refTableBody = React.createRef<HTMLDivElement>();
    // 事件对象
    resizeEvent: Subscription;
    minHeight = 400;
    isOuter = false;
    state = {
        height: this.minHeight,
    };
    /**
     * 修改 高度
     * @param refFullscreen
     */
    @Debounce(200)
    onUpdateHeight(refFullscreen = false) {
        try {
            // props 中传递了 height
            if (
                (this.props.style && this.props.style.height) ||
                this.props.onUpdateHeight === false ||
                this.props.gridAutoHeight
            ) {
                return;
            }
            const refTable = this.refTableBody.current; //ReactDOM.findDOMNode(this.ref.current) as HTMLDivElement;
            // 60 是头部 标题栏 高度
            let height =
                window.innerHeight -
                refTable.offsetTop -
                60 -
                (this.props.paginationProps ? 68 : 28);
            // 全屏 加回 60 高度
            if (refFullscreen || this.isOuter) {
                height += 60;
            }
            height = height < this.minHeight ? this.minHeight : height;
            if (typeof this.props.onUpdateHeight === 'function') {
                height = this.props.onUpdateHeight(height);
            }
            if (this.state.height !== height) {
                this.gridApi &&
                    this.gridApi.sizeColumnsToFit &&
                    this.gridApi.sizeColumnsToFit();
                this.setState({ height });
            }
        } catch (error) {
            console.error('TCL: Table -> onUpdateHeight -> error', error);
        }
    }
    // onGetColumnDefs() {
    //     let columnDefs = [...this.props.columnDefs];
    //     console.log(columnDefs.reduce((accumulator, currentValue) => {
    //         return accumulator.width + currentValue.w
    //     }), 0)
    //     return columnDefs;
    // }
    componentDidMount() {
        this.onUpdateHeight();
        // 判断是否是 外部页面
        if (
            document.body.classList &&
            document.body.classList.contains('lenovo-layout-outer')
        ) {
            this.isOuter = true;
        }
        this.resizeEvent = fromEvent(window, 'resize').subscribe(e => {
            this.onUpdateHeight(lodash.get(e, 'detail') === 'refFullscreen');
            this.gridApi &&
                this.gridApi.sizeColumnsToFit &&
                this.gridApi.sizeColumnsToFit();
        });
    }
    componentWillUnmount() {
        this.resizeEvent && this.resizeEvent.unsubscribe();
    }
    onGridReady(event: GridReadyEvent) {
        this.gridApi = event.api;
        // 更新 列 大小
        event.api.sizeColumnsToFit();
    }
    public render() {
        let {
            rowAction,
            rowActionProps,
            paginationProps,
            style,
            theme = 'ag-theme-material',
            className = '',
            children,
            onGridReady,
            loading,
            columnDefs,
            checkboxSelection = true,
            frameworkComponents,
            // rowData,
            ...props
        } = this.props;
        const checkboxSelectionWidth = {
            'ag-theme-balham': 40,
            'ag-theme-material': 70,
        }[theme];
        if (loading) {
            props.rowData = [];
        }

        return (
            <>
                <div
                    ref={this.refTableBody}
                    style={{
                        height: this.props.gridAutoHeight
                            ? 'auto'
                            : this.state.height,
                        ...style,
                    }}
                    className={`lenovo-ag-grid ${className} ${theme}`}
                >
                    <Spin spinning={loading}>
                        <AgGridReact
                            suppressNoRowsOverlay
                            suppressLoadingOverlay
                            {...props}
                            // 注册子组件
                            frameworkComponents={{
                                // 页面传递
                                ...frameworkComponents,
                                // 行动作
                                ...(rowAction && {
                                    rowAction,
                                }),
                            }}
                            columnDefs={[
                                checkboxSelection && {
                                    // pivotIndex: 0,
                                    rowDrag: false,
                                    dndSource: false,
                                    lockPosition: true,
                                    // dndSourceOnRowDrag: false,
                                    suppressMenu: true,
                                    suppressSizeToFit: true,
                                    suppressMovable: true,
                                    suppressNavigable: true,
                                    suppressCellFlash: true,
                                    // rowGroup: false,
                                    enableRowGroup: false,
                                    enablePivot: false,
                                    enableValue: false,
                                    suppressResize: false,
                                    editable: false,
                                    suppressToolPanel: true,
                                    filter: false,
                                    resizable: false,
                                    checkboxSelection: true,
                                    headerCheckboxSelection: true,
                                    width: checkboxSelectionWidth,
                                    maxWidth: checkboxSelectionWidth,
                                    minWidth: checkboxSelectionWidth,
                                    pinned: 'left',
                                },
                                // 固定右侧 操作列
                                rowAction && {
                                    headerName: 'Action',
                                    // field: "RowAction",
                                    cellRenderer: 'rowAction',
                                    pinned: 'right',
                                    editable: false,
                                    filter: false,
                                    sortable: false,
                                    menuTabs: [],
                                    minWidth: 180,
                                    ...rowActionProps,
                                },
                                ...columnDefs,
                            ].filter(Boolean)}
                            onGridReady={event => {
                                onGridReady && onGridReady(event);
                                this.onGridReady(event);
                            }}
                        />
                    </Spin>
                </div>
                {paginationProps && (
                    <Pagination
                        className="ant-table-pagination"
                        size="small"
                        disabled={loading}
                        showTotal={(total, range) =>
                            `${range[0]}-${range[1]} of ${total} items`
                        }
                        pageSizeOptions={['10', '40', '70', '100']}
                        defaultPageSize={10}
                        {...paginationProps}
                    />
                )}
            </>
        );
    }
}

export default Table;
