import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { history } from 'umi';
import { useMenuDatas, menuDatas } from '@/app/menuDatas';
import * as Icon from '@ant-design/icons';
import _ from 'lodash';
import './style.less';

const { SubMenu } = Menu;

function initMenuDatas(menus, pid = 0) {
    let arr = [];

    menus.map(d => {
        if (d.pid == pid) {
            let children = initMenuDatas(menus, d.id);

            if (children.length == 0) {
                children = null;
            }

            arr.push({
                ...d,
                children: children,
            });
        }
    });

    return arr;
}

/* 初始化菜单 */
export default function(props: any) {
    const { location } = props;
    let defaultSelectedKeys = [];
    let defaultOpenKeys = [];

    let arrDatas = useMenuDatas();
    /* 初始化成带children 结构*/
    let arrMenuDatas = initMenuDatas(arrDatas);

    let custRouter: menuDatas = _.find(arrDatas, { link: location.pathname });

    if (custRouter) {
        defaultSelectedKeys = [custRouter.id + ''];
        defaultOpenKeys = [custRouter.pid + ''];
    }

    let renderItem = children => {
        let arr = [];

        children.map((d: menuDatas) => {
            arr.push(
                <Menu.Item
                    icon={d.icon && React.createElement(Icon[d.icon])}
                    key={d.id + ''}
                    onClick={() => {
                        history.push(d.link);
                    }}
                >
                    {' '}
                    {d.label}{' '}
                </Menu.Item>,
            );
        });

        return arr;
    };

    let m = () => {
        let arr = [];

        arrMenuDatas.map((d: menuDatas) => {
            if (d.pid == 0) {
                if (d.children && d.children.length > 0) {
                    arr.push(
                        <SubMenu
                            key={d.id + ''}
                            icon={d.icon && React.createElement(Icon[d.icon])}
                            title={d.label}
                        >
                            {renderItem(d.children)}
                        </SubMenu>,
                    );
                } else {
                    let items = renderItem([d]);
                    arr.push(items[0]);
                }
            }
        });

        return arr.length > 0 ? arr : null;
    };

    return (
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={defaultSelectedKeys}
            defaultOpenKeys={defaultOpenKeys}
        >
            {m()}
        </Menu>
    );
}
