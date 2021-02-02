import React from 'react';
import Left from './left';
import Top from './Top';
import conf from '@/global.conf';

const Layouts: React.FC = props => {
    return (
        <>
            {conf.menu == 'left' && <Left {...props}></Left>}
            {conf.menu == 'top' && <Top {...props}></Top>}
        </>
    );
};

export default Layouts;
