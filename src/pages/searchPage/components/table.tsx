import React from 'react';
import Stroe from '@/pages/searchPage/stores';
import { observer } from 'mobx-react';
import AgGridTable from '@/components/agGridTable';
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
            store.saveTable(null, {});
        },
        remove: () => {
            console.log('!!!!!!!!', store.selectedRowData);
            return {
                delete: () => {
                    store.onDelete(store.selectedRowData, null, {});
                },
                length: [...store.selectedRowData].length,
            };
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
                <AgGridTable store={store} actionObj={actionObj} />
            </div>
        </>
    );
});

export default Table;
