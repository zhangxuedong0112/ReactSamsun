import '@/style/base.less';

document['getQueryString'] = function(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
};

// import React from 'react';
// import {userStore} from "@/store"
// import { history } from 'umi';

// let extraRoutes;
// export function patchRoutes({ routes }) {
//   merge(routes, extraRoutes);
// }

// export function render() {
//   fetch('/api/routes').then((res) => { extraRoutes = res.routes })
// }

/* 合并router */
// export function patchRoutes({ routes }:any) {
//     routes.unshift({
//       path: '/foo',
//       exact: true,
//       component: require('@/pages/foo').default,
//     });
// }

/* 路由变化 */
// export function onRouteChange({ location, routes, action }) {
//     console.log("@@@@@@router 发成变化", location, routes, action)
//     if(!userStore.user.username && location.pathname != "/login"){
//         history.push('/login');
//     }
// }

// export function render(oldRender:any){
//     if(userStore.user.username){
//         oldRender()
//     }else{
//         history.push('/login');
//     }

// }ww
