import { useState, useEffect } from 'react';

export function UseFriendStatus(friendID: any) {
    const [isOnline, steIsOnline] = useState(false);

    function handleStatusChange(status: any) {
        steIsOnline(status.isOnline);
    }
    console.log('@@@@进入1', isOnline);

    useEffect(() => {
        if (friendID == 1) {
            handleStatusChange({ isOnline: true });
        } else {
            handleStatusChange({ isOnline: false });
        }

        return () => {
            /* 清空数据 */
        };
    });

    // setTimeout(()=>{
    //     console.log("change")
    //     handleStatusChange({isOnline: false})
    // }, 3000)

    return isOnline;
}
