import React, { useState, useEffect } from 'react';

export interface menuDatas {
    id: any,
    pid: any,
    label: any,
    link: any
}

export function useMenuDatas(uid?:any):any {
    /* react hook 获取状态语法 */
    const [menus, setMenus] = useState([
        {
            id: 100,
            pid: 0,
            label: "用户",
        },
        {
            id: 101,
            pid: 100,
            label: "用户列表",
            link: "/user"
        },

        {
            id: 200,
            pid: 0,
            label: "测试",
        },
        {
            id: 201,
            pid: 200,
            label: "test",
            link: "/test"
        }
    ])
    // 获取远程权限内目录

    return menus
} 