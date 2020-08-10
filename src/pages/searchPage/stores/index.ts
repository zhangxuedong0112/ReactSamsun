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
            },
            columns: [
                {
                    headerName: 'ID',
                    field: 'id',
                    key: 'id',
                },
                {
                    headerName: 'Name',
                    field: 'name',
                    key: 'name',
                },
                {
                    headerName: 'City',
                    field: 'city',
                    key: 'city',
                },
                {
                    headerName: 'Email',
                    field: 'email',
                    key: 'email',
                },
                {
                    headerName: 'Date',
                    field: 'date',
                    key: 'date',
                },
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
