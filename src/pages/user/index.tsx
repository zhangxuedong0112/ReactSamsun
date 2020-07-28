import React, { useEffect, useState } from "react"
import { Button } from 'antd'
import req from "@/service/req"

export default function(props:any){
    const [userList, setUserList] = useState([])


    useEffect(()=>{
        console.log("@@@@@@@@@@", 1, userList)
    })    

    return <div>
        <Button onClick={()=>{
            req.ajax({
                method: "get",
                url: "/users",
                body: null
            }).then((res:any)=>{
                console.log("res", res)
                setUserList(res.users)
            });
        }}>get Users</Button>
        <p>
            {/* {props} */}
            user
            {userList.join("/")}
        </p>
    </div>
}