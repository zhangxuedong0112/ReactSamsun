import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { history } from 'umi';
import { useMenuDatas, menuDatas } from '@/app/menuDatas';
import SettingStore from '@/store/setting';
import conf from '@/global.conf';
import * as Icon from '@ant-design/icons';
import _ from 'lodash';
import './style.less';

const { SubMenu } = Menu;

/* 根据pid把平级结构转正children 层级结构*/
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

/* 菜单组件 */
export default function(props: any) {
    const { location } = props;
    let defaultSelectedKeys = [];
    let defaultOpenKeys = [];

    let arrDatas = useMenuDatas();
    /* 初始化成带children 结构*/
    let arrMenuDatas = initMenuDatas(arrDatas);

    let custRouter: menuDatas = _.find(arrDatas, { link: location.pathname });

    // let pRouter: menuDatas;
    // if(custRouter.pid){
    //     pRouter = _.find(arrDatas, { id: custRouter.pid });
    // }

    // try {
    //     SettingStore.custRouter = {
    //         custRouter,
    //         pRouter
    //     }
    // } catch (error) {

    // }

    // console.log("@@@@location", custRouter)

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

    /* 目前只支持两级或者一级结构 */
    let renderMenu = () => {
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
            mode={conf.menu == 'top' ? 'horizontal' : 'inline'}
            defaultSelectedKeys={defaultSelectedKeys}
            defaultOpenKeys={conf.menu == 'top' ? [] : defaultOpenKeys}
        >
            {renderMenu()}
        </Menu>
    );
}
