import { action, observable, runInAction, computed, toJS } from 'mobx';

export class UserStore {
    @observable
    user:any = {}

    @action
    setUser(user){
        this.user = user
    }
}

export default new UserStore()