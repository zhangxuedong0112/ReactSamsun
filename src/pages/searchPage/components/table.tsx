import React from 'react';
import Stroe from '@/pages/searchPage/stores';
import { observer } from 'mobx-react';

const Table: React.FC = observer(props => {
    return (
        <>
            <div className="search-result-list">
                <p>Search Result List</p>
            </div>
        </>
    );
});

export default Table;
