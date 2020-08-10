import React, { useState, useEffect } from 'react';

export interface menuDatas {
    id: any;
    pid: any;
    label: any;
    icon: any;
    link: any;
    children: any;
}

export function useMenuDatas(uid?: any): any {
    /* react hook 获取状态语法 */
    const [menus, setMenus] = useState([
        {
            id: 100,
            pid: 0,
            label: '用户',
            icon: 'GithubOutlined',
        },
        {
            id: 101,
            pid: 100,
            label: '泡泡头',
            link: '/user',
            icon: 'AliwangwangOutlined',
        },

        {
            id: 200,
            pid: 0,
            label: '泡泡头拿出来',
            link: '/user',
            icon: 'AliwangwangOutlined',
        },

        {
            id: 300,
            pid: 0,
            label: 'Demo',
            icon: 'SmileOutlined',
        },
        {
            id: 301,
            pid: 300,
            label: '富文本包含mobx',
            link: '/editor',
            icon: 'ProfileOutlined',
        },
        {
            id: 302,
            pid: 300,
            label: 'mockDemo',
            link: '/mock',
            icon: 'ForkOutlined',
        },
        {
            id: 303,
            pid: 300,
            label: 'searchDemoAG',
            link: '/searchPageAG',
            icon: 'FileSearchOutlined',
        },
        {
            id: 304,
            pid: 300,
            label: 'searchPageAntd',
            link: '/searchPageAntd',
            icon: 'TableOutlined',
        },

        {
            id: 1000,
            pid: 0,
            label: '测试',
        },
        {
            id: 1001,
            pid: 1000,
            label: 'hookDemo',
            link: '/hookDemo',
        },
    ]);
    // 获取远程权限内目录

    return menus;
}
