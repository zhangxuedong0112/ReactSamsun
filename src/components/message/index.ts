import { message } from 'antd';

const Message = {
    success: msg => {
        goNot('success', msg);
    },
    warning: msg => {
        goNot('warning', msg);
    },
    error: msg => {
        goNot('error', msg);
    },
};

const goNot = (type: string, msg: string) => {
    message[type](msg);
};

export default Message;
