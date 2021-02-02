import { action, observable, runInAction, computed, toJS } from 'mobx';

export class SettingStore {
    @observable
    _custRouter: any = {
        custRouter: null,
        pRouter: null,
    }; /* {custRouter:{icon: "ProfileOutlined"
                        id: 301
                        label: "富文本包含mobx"
                        link: "/editor"
                        pid: 300}, 

                        pRouter:{icon: "SmileOutlined"
                        id: 300
                        label: "Demo"
                        pid: 0}
                    } */

    @computed
    get custRouter() {
        return toJS(this._custRouter);
    }
    set custRouter(r) {
        this._custRouter = { ...r };
    }
}

export default new SettingStore();
