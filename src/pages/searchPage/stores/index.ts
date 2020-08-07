import { observable, action } from 'mobx';
import agGrid from '@/store/agGrid';

export class SearchPageStore extends agGrid {
    constructor() {
        super({
            Target: '/api', //默认 /api
            Apis: {},
            columns: [
                {
                    headerName: 'Item No',
                    field: 'itemNo',
                    key: 'itemNo',
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
