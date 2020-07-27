import React from "react"

export default (props:any) =>{

    return <div>
        <div>header</div>
         {props.children}
         <div>footer</div>
    </div>

}