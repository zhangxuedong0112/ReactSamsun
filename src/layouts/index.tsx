import React, { useState } from "react"
import { Layout, Menu } from 'antd';
import ProjectMenu from "./menus"
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import "./style.less"

const { Header, Sider, Content } = Layout;

export default (props:any) =>{
    const [collapsed, setCollapsed] = useState(false)

    return <Layout className="components-layout-demo-custom-trigger">
        <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <ProjectMenu/>
        </Sider>
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: ()=>{
                    setCollapsed(!collapsed)
                }
                })}
            </Header>
            <Content
                className="site-layout-background"
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                    height: "100%"
                }}
            >
                {props.children}
            </Content>
        </Layout>
  </Layout>

}