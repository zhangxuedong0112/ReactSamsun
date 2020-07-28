import React, { useState, useEffect } from 'react';

export interface menuDatas {
    id: any,
    pid: any,
    label: any,
    icon: any,
    link: any,
    children: any
}

function initMenuDatas(menus, pid=0) {
    let arr = [];

    menus.map((d)=>{
        if(d.pid == pid){
            let children = initMenuDatas(menus, d.id)

            if(children.length == 0){
                children = null
            }


            arr.push({
                ...d,
                children: children
            })
        }
    })

    return arr

}

export function useMenuDatas(uid?:any):any {
    /* react hook 获取状态语法 */
    const [menus, setMenus] = useState([
        {
            id: 100,
            pid: 0,
            label: "用户",
            icon: "GithubOutlined"
        },
        {
            id: 101,
            pid: 100,
            label: "用户列表",
            link: "/user",
            icon: "AliwangwangOutlined"
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
        },
        {
            id: 999,
            pid: 0,
            label: "用户列表",
            link: "/user",
            icon: "AliwangwangOutlined"
        }
    ])
    // 获取远程权限内目录

    return initMenuDatas(menus)
} 