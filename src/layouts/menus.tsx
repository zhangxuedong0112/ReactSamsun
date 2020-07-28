import React, { useState } from "react"
import { Layout, Menu } from 'antd';
import { history } from 'umi';
import {useMenuDatas, menuDatas} from "@/app/menuDatas"
import * as Icon from '@ant-design/icons';
import "./style.less"

const { SubMenu } = Menu;

export default function(props:any){

    console.log("@@@@@render")
    let arrMenuDatas = useMenuDatas();

    let renderItem = (children)=>{
        let arr = [];

        children.map((d:menuDatas)=>{
            arr.push(<Menu.Item icon={ d.icon && React.createElement(
                Icon[d.icon]
            )} key={d.id + ""} onClick={()=>{
                history.push(d.link)
            }}> { d.label } </Menu.Item>)
        })

        return arr
    }

    let m = ()=>{
        let arr = []
        
        arrMenuDatas.map((d:menuDatas)=>{
            if(d.pid == 0){
                if(d.children && d.children.length>0){
                    arr.push(<SubMenu key={d.id + ""} icon={ d.icon && React.createElement(
                        Icon[d.icon]
                    )} title={d.label}>
                        {renderItem(d.children)}
                    </SubMenu>)
                }else{
                    let items = renderItem([d]);
                    arr.push(items[0])
                }
                
            }
        })

        return arr.length>0?arr:null;
    }

    return  <Menu theme="dark" mode="inline" defaultSelectedKeys={['100']} defaultOpenKeys={['101']}>
            {m()}
            {/* <SubMenu key="sub1" icon={<Icon.MailOutlined />} title="Navigation One">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<Icon.AppstoreOutlined />} title="Navigation Two">
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu> */}
    </Menu>

}