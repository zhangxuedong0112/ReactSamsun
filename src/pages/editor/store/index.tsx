import { observable, action } from 'mobx';

class EditorStore {
    @observable
    html = '<p>欢迎使用wangeditor</p>';

    @action
    setHtml(val) {
        this.html = val;
    }
}

export default new EditorStore();
