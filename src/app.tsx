import React from 'react';
import {userStore} from "@/store"
import { history } from 'umi';

/*  */
// export function patchRoutes({ routes }:any) {
//     routes.unshift({
//       path: '/foo',
//       exact: true,
//       component: require('@/pages/foo').default,
//     });
// }

export function render(oldRender:any){
    // oldRender()
    if(userStore.username){
        oldRender()
    }else{
        history.push('/login');
    }
    
}