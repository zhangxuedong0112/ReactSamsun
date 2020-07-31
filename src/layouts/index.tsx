import React, { useState } from 'react';
import { Layout, Menu, BackTop } from 'antd';
import ProjectMenu from './menus';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import './style.less';

const { Header, Sider, Content } = Layout;

export default (props: any) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout className="components-layout-demo-custom-trigger">
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{
                    minHeight: '100%',
                }}
            >
                <div className="logo" />
                <ProjectMenu {...props} />
            </Sider>

            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{ padding: 0 }}
                >
                    {React.createElement(
                        collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                        {
                            className: 'trigger',
                            onClick: () => {
                                setCollapsed(!collapsed);
                            },
                        },
                    )}
                </Header>
                <Content className="site-layout-background mainPreSam">
                    {/* 渲染 */}
                    {props.children}

                    {/* 回到顶端 */}
                    <BackTop>
                        <div
                            style={{
                                height: 40,
                                width: 40,
                                lineHeight: '40px',
                                borderRadius: 4,
                                backgroundColor: '#1088e9',
                                color: '#fff',
                                textAlign: 'center',
                                fontSize: 14,
                            }}
                        >
                            UP
                        </div>
                    </BackTop>
                </Content>
            </Layout>
        </Layout>
    );
};
