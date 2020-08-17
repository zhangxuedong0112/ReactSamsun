import { observable, action } from 'mobx';
import agGrid from '@/store/agGrid';

export class SearchPageStore extends agGrid {
    constructor() {
        super({
            Apis: {
                search: {
                    //查询
                    url: '/table/search',
                    method: 'post',
                },
                saveTable: {
                    url: '/table/save',
                    method: 'post',
                },
                delete: {
                    url: '/table/delete',
                    method: 'post',
                },
                import: {
                    url: '/table/import',
                    method: 'post',
                },
            },
            columns: [
                {
                    title: 'ID',
                    dataIndex: 'id',
                },
                {
                    title: 'Name',
                    dataIndex: 'name',
                },
                {
                    title: 'City',
                    dataIndex: 'city',
                },
                {
                    title: 'Email',
                    dataIndex: 'email',
                },
                {
                    title: 'Date',
                    dataIndex: 'date',
                },
                // {
                //     title: 'sel1',
                //     field: 'sel1',
                //     key: 'sel1',
                //     cellEditor: 'SelectAg',
                //     cellEditorParams: {
                //         columnName: 'EDU Campaign',
                //         selectProps: {
                //             // 给子组件 传递 一个 数据函数
                //             dataSource: [
                //                 { selected: false, text: '1', value: '1' },
                //                 { selected: false, text: '2', value: '2' },
                //             ],
                //             antdProps: {
                //                 // mode: 'multiple',
                //             },
                //         },
                //         // enableClear: true,
                //     },
                // },
            ],
        });

        this.loadingTable = false;
    }
    @observable
    searchForm: any = {};

    @action
    setSearchForm(d) {
        this.searchForm = d;
    }
}

export default new SearchPageStore();
