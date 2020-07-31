import { notification } from 'antd';

const Notification = {
    success: msg => {
        goNot('success', msg);
    },
    info: msg => {
        goNot('info', msg);
    },
    warning: msg => {
        goNot('warning', msg);
    },
    error: msg => {
        goNot('error', msg);
    },
};

const goNot = (type: string, msg: string) => {
    notification[type]({
        message: type[0].toUpperCase() + type.substr(1),
        description: msg,
    });
};

export default Notification;
