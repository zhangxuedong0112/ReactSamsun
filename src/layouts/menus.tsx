import React, { useState } from "react"
import { Layout, Menu } from 'antd';
import { Link } from 'umi';
import {useMenuDatas, menuDatas} from "@/app/menuDatas"
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import "./style.less"

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

export default function(props:any){

    let m = (pid?)=>{
        let arr = []
        // console.log("@@@@@@@", useMenuDatas())
        useMenuDatas().map((d:menuDatas)=>{
            if(!pid && d.pid == 0){
                arr.push(<SubMenu key={d.id} icon={<MailOutlined />} title={d.label}>
                    {m(d.id)}
                </SubMenu>)
            }else{
                if(d.pid == pid){
                    arr.push(<Menu.Item key={d.id}><Link to={d.link}>{d.label}</Link></Menu.Item>)
                }

            }
        })

        return arr.length>0?arr:null;
    }

    return  <Menu theme="dark" mode="inline" defaultSelectedKeys={['100']} defaultOpenKeys={['101']}>
            {m()}
    </Menu>

}