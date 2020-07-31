import React, { useEffect, useState } from 'react';
import './style.less';
import Search from './components/search';
import Table from './components/table';
import './style.less';

const SearchDemo: React.FC = props => {
    return (
        <>
            <Search {...props}></Search>

            <Table {...props}></Table>
        </>
    );
};

export default SearchDemo;
