import lodash from 'lodash';
import { BindAll } from 'lodash-decorators';
import { computed, observable, runInAction, toJS, action } from 'mobx';
import { map } from 'rxjs/operators';
import request from '@/service/req';
import { Help } from '@/utils/helps';
import { notification } from 'antd';

interface IUrl {
    url: string;
    method?: 'get' | 'post' | 'put' | 'delete';
    [key: string]: any;
}

interface IUrls {
    search?: IUrl;
    details?: IUrl;
    insert?: IUrl;
    update?: IUrl;
    delete?: IUrl;
    import?: IUrl;
    export?: IUrl;
    exportIds?: IUrl;
    template?: IUrl;
    [key: string]: IUrl;
}

declare type PageStoreOptions = {
    /** api 列表 */
    Apis: IUrls;
    columns: any[];
    IdKey?: string;
    Target?: string;
};

const pageParams: ISearchParams = {
    order: '', //asc desc
    field: '', //"name,age",
    current: 1,
    pageSize: 10,
};
/**
 * tabel列表 参数
 */
export declare type ISearchParams = {
    current?: number;
    field?: String;
    pageSize?: number;
    order?: String;
};

@BindAll()
export default class TablePage {
    /**
     * 存储表单元素的值
     */
    @observable
    public dataVal: any = {};

    @observable
    columns: any[] = [];

    /**
     * 修改表单元素
     * @param key 表单元素的key
     * @param value 表单元素的值
     */
    @action
    changeDataVal(key, value) {
        // value = value instanceof Array ? value.join(",") : (value?value:null)
        console.log(key, value);
        this.dataVal[key] = value;
    }
    public options: PageStoreOptions = {
        Apis: {},
        columns: [],
        IdKey: 'ID',
        Target: '/api', //"/api"
    };

    constructor(options: PageStoreOptions) {
        this.columns = [...options.columns];

        delete options.columns;

        this.options = { ...this.options, ...options };
    }
    // Request=new Request(this.options.Target);
    // 表格loading
    @observable
    private _loadingTable = true;
    // 表格数据
    @observable
    private _tableList: any[] = [];
    // 表格分页
    @observable
    private _pagination = {
        showSizeChanger: true,
        total: 0,
        current: 1,
        pageSize: 10,
        onShowSizeChange: (pageNum, pageSize) => {
            this.pageParams.pageSize = pageSize;
            this.pageParams.current = pageNum;
            this.pagination.current = pageNum;
        },
    };
    // 详情数据
    @observable
    private _details;
    // 搜索参数
    @observable
    private _filterParams;
    // 选择的行 数据
    @observable
    private _selectedRowData: any[] = [];
    @observable
    private _selectedRowKeys: string[];

    @observable
    changedTableList: any = [];

    //表格数据以外的数据群组
    @observable
    private _dataGroup: any;

    //列表参数
    @observable
    public pageParams: ISearchParams = lodash.cloneDeep(pageParams);

    /**
     * 表格loading
     */
    @computed
    public get loadingTable() {
        return this._loadingTable;
    }
    public set loadingTable(value) {
        this._loadingTable = value;
    }

    /**
     * 表格数据
     */
    @computed
    public get tableList() {
        return this._tableList || [];
    }
    public set tableList(value) {
        this._tableList = value;
    }

    /**
     * 表格数据以外的数据群组
     */
    @computed
    public get dataGroup() {
        return toJS(this._dataGroup || {});
    }
    public set dataGroup(value) {
        this._dataGroup = value;
    }
    /**
     * 表格分页
     */
    @computed
    public get pagination() {
        return this._pagination;
    }
    public set pagination(value) {
        this._pagination = value;
    }

    /**
     * 搜索参数
     */
    @computed
    public get filterParams() {
        return this._filterParams;
    }
    public set filterParams(value) {
        this._filterParams = value;
    }

    resetFilterParams() {
        this.filterParams = {};
    }
    @action
    resetPageParams() {
        this.pageParams = lodash.cloneDeep(pageParams);
    }

    @action
    resetSearchParams() {
        this.filterParams = {};
        this.pageParams = lodash.cloneDeep(pageParams);
    }

    /**
     * 选中的数据
     */
    @computed
    public get selectedRowData() {
        return this._selectedRowData;
    }
    public set selectedRowData(value) {
        this._selectedRowData = value;
    }

    @observable data = [];

    @observable
    private _hasPagination = true;

    @computed
    public get hasPagination() {
        return this._hasPagination;
    }
    public set hasPagination(value) {
        this._hasPagination = value;
    }

    /**
     * 重写 获得列表
     */
    @action
    async onSearch(search?, noCache?) {
        // console.log("@@@@@@@offeringDetail", this.offeringDetail)

        this.loadingTable = true;

        search = search || this.filterParams;

        let param = {
            current: 1,
            pageSize: 10,
            ...this.pageParams,
            // ...this.filterParams,
            ...search,
        };
        if (noCache) {
            param = {
                current: 1,
                pageSize: 10,
                ...this.pageParams,
                ...search,
            };
        }
        const { current, field, pageSize, order, ...filter } = param;

        let d = {
            pagination: { current, field, pageSize, order },
            filter: { ...filter },
        };

        let res: any = await request.ajax({
            ...this.options.Apis.search,
            body: { ...d },
        });

        if (res && res.dataSource) {
            // 设置 一个 key 默认 去 idkey 中的值，没有则创建 一个 guid
            let i = 0;
            res.dataSource = lodash.map(res.dataSource, obj => {
                i = i + 1;
                lodash.set(
                    obj,
                    'key',
                    lodash.get(obj, this.options.IdKey, Help.GUID()),
                );
                lodash.set(obj, 'tierno', i);

                return obj;
            });
        }

        runInAction(() => {
            this.loadingTable = false;
            this.pageParams = {
                ...this.pageParams,
                current,
                field,
                pageSize,
                order,
            }; //存储分页信息
            this.filterParams = filter; // 存储属性参数

            this.pagination.total = parseInt(res.total);
            this.pagination.pageSize = this.pageParams.pageSize;
            this.pagination.current = this.pageParams.current;
            this.tableList = res.dataSource;
            this.changedTableList = [];
            this.selectedRowData = [];
        });
    }

    /**
     * 重写 获得列表
     */
    @action
    async onSearchNoPage(search?) {
        try {
            this.loadingTable = true;
            let filter = { ...this.filterParams, ...search };

            let res: any = await request.ajax({
                ...this.options.Apis.search,
                body: { ...filter },
            });

            if (res && res.length > 0) {
                // 设置 一个 key 默认 去 idkey 中的值，没有则创建 一个 guid
                res = lodash.map(res, obj => {
                    lodash.set(
                        obj,
                        'key',
                        lodash.get(obj, this.options.IdKey, Help.GUID()),
                    );
                    return obj;
                });
            }
            runInAction(() => {
                this.filterParams = filter;
                this.tableList = res;
                this.changedTableList = [];
                this.selectedRowData = [];
            });

            return Promise.resolve(res);
        } catch (error) {
        } finally {
            this.loadingTable = false;
        }
    }

    /** 获得详情 */
    onDetails(param) {
        return param;
    }

    /** 更新 */
    onUpdate() {}

    /**
     * 添加一行
     */
    @action
    onAddRow(newData) {
        newData.key = Help.GUID();
        let dataSource = this.tableList || [];
        dataSource.push(newData);
        this.tableList = dataSource;
        this.pagination.current = 1;
        this.pagination.total += 1;
        this.changedTableList.push(newData);
    }

    /**
     * 修改行
     */
    @action
    onEditRow(data) {
        // console.log(this.changedTableList, data)
        let index = lodash.findIndex(this.changedTableList, { key: data.key });
        let tableListIndex = lodash.findIndex(this.tableList, {
            key: data.key,
        });
        this.tableList[tableListIndex] = data;
        // console.log(index)
        if (index > -1) {
            this.changedTableList[index] = data;
        } else {
            this.changedTableList.push(data);
        }
    }

    /** 删除数据 */
    // async onDelete(params) {
    //   console.log(this.options.Apis)
    //   let res = await request.ajax({
    //     ...this.options.Apis.delete,
    //     body: params
    //   })
    //   console.log(res)
    //   this.onSearch()
    // }

    async onExport(
        body?,
        AjaxRequest: any = {},
        fileType?: string,
        fileName?: string,
    ) {
        request.fileDownload(
            this.options.Apis.export.method,
            this.options.Apis.export.url,
            body,
        );
    }

    async downloadTemplate(
        body?,
        AjaxRequest: any = {},
        fileType?: string,
        fileName?: string,
    ) {
        request.fileDownload(
            this.options.Apis.downloadTemplate.method,
            this.options.Apis.downloadTemplate.url,
            body,
        );
    }

    @action
    changeColumns(columns) {
        this.columns = columns;
    }

    /** 获得 dataGroup 数据 */
    async getDataGroup(programId) {
        let res = await request.ajax({
            ...this.options.Apis.dataGroup,
            body: { programId: programId },
            headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        });

        if (res) {
            this.dataGroup = res;
        }
    }

    async getDataGroupPromise(programId) {
        let res = await request.ajax({
            ...this.options.Apis.dataGroup,
            body: { programId: programId },
            headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        });
        return res;
    }

    /**
     * 选中数据发生变化
     */
    changeSelectedRowData(data) {
        this.selectedRowData = data;
    }

    validateTable(saveAll?) {
        try {
            let params = saveAll ? this.tableList : this.changedTableList;
            if (params.length == 0) {
                throw 'table data is empty';
                return false;
            }

            let columns = this.columns;
            if (columns && columns.length > 0) {
                let notEmpty = {}; //获取不能为空的field
                let notEmptyName = [];
                columns.map(c => {
                    if (c.notEmpty) {
                        notEmpty[c.field] = c;
                    }
                });

                params.map(d => {
                    for (const key in d) {
                        if (notEmpty[key]) {
                            let str = d[key] || d[key] === 0 ? d[key] + '' : '';
                            if (!str || !str.trim()) {
                                if (
                                    notEmptyName.indexOf(
                                        notEmpty[key]['headerName'],
                                    ) == -1
                                ) {
                                    notEmptyName.push(
                                        notEmpty[key]['headerName'],
                                    );
                                }
                            }
                        }
                    }
                });
                if (params.length == 0 || notEmptyName.length > 0) {
                    notification.warning({
                        message: `${notEmptyName.join(',')} can not be empty!`,
                    });
                    throw `${notEmptyName.join(',')} can not be empty!`;
                    return false;
                }
            } else {
                throw 'column is empty';
                return false;
            }
        } catch (error) {
            throw error;
        }
    }

    /**
     * 保存table数据
     * @param param
     */
    async saveTable(closeNotification?, headers?, saveAll?, noApi?) {
        try {
            this.validateTable(saveAll);
            let params = saveAll ? this.tableList : this.changedTableList;
            if (params.length == 0) {
                return false;
            }

            let columns = this.columns;
            if (columns && columns.length > 0) {
                let notEmpty = {}; //获取不能为空的field
                let notEmptyName = [];
                columns.map(c => {
                    if (c.notEmpty) {
                        notEmpty[c.field] = c;
                    }
                });

                params.map(d => {
                    for (const key in d) {
                        if (notEmpty[key]) {
                            let str = d[key] || d[key] === 0 ? d[key] + '' : '';
                            if (!str || !str.trim()) {
                                if (
                                    notEmptyName.indexOf(
                                        notEmpty[key]['headerName'],
                                    ) == -1
                                ) {
                                    notEmptyName.push(
                                        notEmpty[key]['headerName'],
                                    );
                                }
                            }
                        }
                    }
                });
                if (params.length == 0 || notEmptyName.length > 0) {
                    notification.warning({
                        message: `${notEmptyName.join(',')} can not be empty!`,
                    });
                    throw `${notEmptyName.join(',')} can not be empty!`;
                    return false;
                }
            } else {
                return false;
            }

            if (noApi) {
                return true;
            }
            // console.log(params)

            let reqParams: any = {
                ...this.options.Apis.saveTable,
                body: params,
                // method: 'post'
            };

            if (headers) {
                reqParams.headers = headers;
            }
            let res = await request.ajax(reqParams);

            closeNotification ||
                notification.success({ message: 'Save Success' });
            if (this.hasPagination) {
                await this.onSearch({
                    ...this.filterParams,
                    ...this.pageParams,
                });
            } else {
                await this.onSearchNoPage(this.filterParams);
            }
        } catch (error) {
            console.log(error);
            // throw error;
            if (error == 'table data is empty') {
                return true;
            }
            return false;
        }
    }

    @action
    initTierNo() {
        for (let index = 0; index < this.tableList.length; index++) {
            let d = this.tableList[index];
            lodash.set(d, 'tierno', index + 1);
        }
    }

    /** 重写 删除数据 如果传ids为id数组，则必传key数组 */
    @action
    async onDelete(
        ids,
        keys?,
        headers?,
        noApi = false,
        message = 'Delete Success',
    ) {
        if (ids[0] && typeof ids[0] == 'object') {
            let new_ids = [];
            let new_keys = [];

            ids.map(d => {
                if (d.id) {
                    new_ids.push(d.id);
                }

                if (d.key) {
                    new_keys.push(d.key);
                }
            });

            ids = new_ids;
            keys = new_keys;
        }

        let res = null;
        if (ids.length > 0 && !noApi) {
            let reqParams: any = { ...this.options.Apis.delete, body: ids };
            if (headers) {
                reqParams.headers = headers;
            }

            await request.ajax(reqParams);

            res = true;
        } else {
            res = true;
        }

        // notification.success({message:"delete success" })
        // this.onSearch(this.filterParams)

        runInAction(() => {
            if (res && keys && Array.isArray(keys)) {
                keys.map(key => {
                    let index01 = lodash.findIndex(this.tableList, {
                        key: key,
                    });
                    if (index01 > -1) {
                        this.tableList.splice(index01, 1);
                    }

                    let index02 = lodash.findIndex(this.changedTableList, {
                        key: key,
                    });
                    if (index02 > -1) {
                        this.changedTableList.splice(index02, 1);
                    }
                });
                // this.changedTableList = []
                this.selectedRowData = [];

                notification.success({ message });
                this.initTierNo();
            } else {
                notification.error({ message: res.message });
                // notification.error({ message: res.message })
            }

            if (
                toJS(this.tableList).length == 0 &&
                this.pageParams.current > 1
            ) {
                this.pageParams.current = this.pageParams.current - 1;
            }
        });
    }

    /**
     * 得到格式正确的upload地址
     */
    getUploadUrl() {
        return this.options.Apis.import.url;
        // return  request.compatibleUrl(this.options.Target || "/api", this.options.Apis.import.url)
    }
}
