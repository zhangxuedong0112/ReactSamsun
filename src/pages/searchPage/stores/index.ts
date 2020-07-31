import { observable, action } from 'mobx';

export class SearchPageStore {
    @observable
    searchForm: any = {};

    @action
    setSearchForm(d) {
        this.searchForm = d;
    }
}

export default new SearchPageStore();
