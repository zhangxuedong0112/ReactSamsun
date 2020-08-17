import React from 'react';
import Stroe from '@/pages/searchPageAG/stores';
import { observer } from 'mobx-react';
import AntdTable from '@/components/antdTable';
import store from '../stores';
import { toJS } from 'mobx';

const Table: React.FC = observer(props => {
    const actionObj = {
        add: async () => {
            // console.log("add")

            let columns = [...store.columns];
            let obj = {};

            columns.map(item => {
                obj[item.field] = '';
            });

            console.log('add', obj);
            store.onAddRow(obj);
        },
        save: async () => {
            console.log(toJS(store.changedTableList));
            store.saveTable();
        },
        remove: {
            delete: () => {
                store.onDelete(store.selectedRowData, null, {});
            },
            length: [...store.selectedRowData].length,
        },
        upload: {
            upload: () => {
                let obj = {
                    data: {},
                    action: store.getUploadUrl(),
                };
                // console.log(obj)
                return obj;
            },
            search: () => {
                store.onSearch(store.filterParams);
            },
        },
        download: () => {
            const data = toJS(store.filterParams);
            store.onExport(data);
        },
        downloadTemplate: () => {
            const data = toJS(store.filterParams);
            store.downloadTemplate(data);
        },
    };

    return (
        <>
            <div>
                <AntdTable store={store} actionObj={actionObj} />
            </div>
        </>
    );
});

export default Table;
