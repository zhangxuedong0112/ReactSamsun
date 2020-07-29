import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { UseFriendStatus } from '@/pages/hookDemo/store';

export default function(props: any) {
    const [count, setCount] = useState(0); //0是默认值
    const [friendId, setFriendId] = useState(1);

    // let s = setInterval(()=>{
    //     console.log("@@@@@time")
    // }, 1000)

    /* componentDidMount 但，每次修改状态都会进来 */
    useEffect(() => {
        //在执行 DOM 更新之后调用
        console.log('@@@进来了1');
        document.title = `you clicked ${count} times`;

        /* 相当于 componentWillUnmount*/
        return () => {
            // console.log("@@@@清除")
            // clearInterval(s)
        };
    }, [
        count,
    ]); /* 第二个参数，在此状态改变时调用方法，用于性能优化 , 可不传， 可传空[] 代表只执行一次*/

    return (
        <div>
            <p>You clicked {count} times</p>
            <Button onClick={() => setCount(count + 1)}>Click me</Button>
            <p>friend aa is onLine ? {UseFriendStatus(count) + ''}</p>
        </div>
    );
}
