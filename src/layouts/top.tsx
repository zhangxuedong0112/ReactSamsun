import React, { useState } from 'react';
import { Layout, Menu, BackTop, Breadcrumb } from 'antd';
import ProjectMenu from './menus';
import { observer } from 'mobx-react';
import Infinity from '@/components/Intensify';
// import SettingStore from "@/store/setting";
const { Header, Content, Footer } = Layout;

import './style.less';

const BreadcrumbSam: React.FC = Infinity([observer], props => {
    return (
        <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
    );
});

const Top: React.FC = props => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <ProjectMenu {...props} />
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <BreadcrumbSam></BreadcrumbSam>

                <div className="site-layout-content">{props.children}</div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2018 Created by Ant UED
            </Footer>
        </Layout>
    );
};

export default Top;
