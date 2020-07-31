import { bindAll } from 'lodash-decorators';
import axios from 'axios';
import moment from 'moment';
import { notification } from 'antd';
import NProgress from 'nprogress';

const env = process.env.REACT_APP_ENV || 'dev';
const development = env == 'dev';

@bindAll()
class ReqAxios {
    cacheReq: any = {};
    CacheRequest: any = {};

    //默认sit
    token =
        'eyJhbGciOiJIUzI1NiJ9.eyJzZXJ2aWNlTmFtZSI6IjIyNjQiLCJzZXJ2aWNlS2V5IjoiNTAyMWFjNDhiOWEwNDIxNTkxNzJmZDg2YjFlZWJiZjUiLCJzZXJ2aWNlVHlwZSI6IjEiLCJzZXJ2aWNlQXBwIjoiOTkxIiwic2VydmljZUNsdXN0ZXIiOiIyIiwianRpIjoiOGIwZmJhYmY1YjU0NGIxODk0YTAzMzdlYjNlYWE5ZGQiLCJpYXQiOjE1ODg5MDcwMjl9._QMXwVlIItlRIj2c6uqBnockaT2psxWggp3YuuYIYx0';

    constructor() {
        // 默认超时设置
        axios.defaults.timeout = 1000 * 60;

        // 相对路径设置
        if (env == 'dev') {
            axios.defaults.baseURL = '/api';
        } else {
            axios.defaults.baseURL =
                'http://zuul-dev.lmp-sy.xpaas.lenovo.com/lasdms';
        }

        // //多环境配置，读取配置文件数据
        // if (process.env.REACT_APP_SERVER_BASE_URL) {
        //     axios.defaults.baseURL = process.env.REACT_APP_SERVER_BASE_URL;
        // }

        // if (process.env.REACT_APP_SERVER_TOKEN) {
        //     this.token = process.env.REACT_APP_SERVER_TOKEN;
        // }

        //http response 拦截器
        axios.interceptors.response.use(
            (res: any) => {
                NProgress.done();
                if (res) {
                    return res;
                }
            },
            err => {
                NProgress.done();
                return Promise.reject(err);
            },
        );

        //http request 拦截器
        axios.interceptors.request.use(
            config => {
                NProgress.start();
                // 获取token
                const sessionToken = sessionStorage.getItem('token');
                const token = sessionToken || '';
                // 设置参数格式
                if (!config.headers['Content-Type']) {
                    config.headers = {
                        'Content-Type': 'application/json',
                    };
                }
                // 添加token到headers
                const defaultToken =
                    env == 'dev'
                        ? 'eyJ1c2VySWQiOiJ3ZW54cTEiLCJ1c2VyTmFtZSI6IlhpblFpYW9XZW4iLCJidXNpbmVzc0dyb3VwTGlzdCI6WyJQQ0ciLCJEQ0ciXSwicmVnaW9uTGlzdCI6WyJCcmF6aWwiLCJMQVMiXSwiZXhwaXJlVGltZSI6IjIwMjAwNzA2MTgwNDEzIiwidmFsaWRUaW1lTnVtYmVyIjozMH0'
                        : '';
                config.headers.token = token || defaultToken;

                // 鉴权参数设置
                if (config.method === 'get') {
                    //get请求下 参数在params中，其他请求在data中
                    // console.log("@@@@222222", config)
                    // if(config.params){
                    //     console.log("@@@@222222", config.params)
                    // }
                    // config.params = config.params || {};
                    // let json = JSON.parse(JSON.stringify(config.params));
                    //一些参数处理
                } else {
                    config.data = config.data || {};
                    //一些参数处理
                }
                return config;
            },
            err => {
                return Promise.reject(err);
            },
        );
    }

    initGetProps(props) {
        let str = '';

        if (props.url.indexOf('?') == -1) {
            str = '?';
        } else {
            str = '&';
        }

        for (let key in props.body) {
            str += `${key}=${props.body[key]}&`;
        }

        str = str.substr(0, str.length - 1);

        props.url += str;

        return props;
    }

    initUrl(url) {
        // let baseFrom = "/base/";
        // let programFrom = "/program/";
        // let calculationFrom = "/calculation/";
        // let baseTo = "/base/";
        // let programTo = "/program/";
        // let calculationTo = "/calculation/";
        // let isReplace = false;

        // //手动代理，uat 环境前缀不一样,添加新环境需要配置
        // switch (process.env.REACT_APP_BASE_ENV) {
        //     case "uat":
        //         baseTo = "/baseuat/";
        //         programTo = "/programuat/";
        //         calculationTo = "/calculationuat/";
        //         isReplace = true
        //         break;
        // }

        // if (url && isReplace) {
        //     if (url.indexOf(baseFrom) == 0) {
        //         url = baseTo + url.substr(baseFrom.length)
        //     } else if (url.indexOf(programFrom) == 0) {
        //         url = programTo + url.substr(programFrom.length)
        //     } else if (url.indexOf(calculationFrom) == 0) {
        //         url = calculationTo + url.substr(calculationFrom.length)
        //     }
        // }

        return url;
    }

    cache(props) {
        return new Promise(async (res, rej) => {
            let url = `${props.url}?${JSON.stringify(props.body)}`;

            if (this.cacheReq[url] != undefined) {
                console.info(
                    `request from cache \n req: "${url}" ;  \n \n res: "${JSON.stringify(
                        this.cacheReq[url],
                    )}" \n \n ---------------`,
                );
                return res(this.cacheReq[url]);
            }

            /** 缓存request，同时发起同一请求时，仅请求一次 */
            let ajaxObservable = null;
            // 读缓存
            if (this.CacheRequest[url]) {
                ajaxObservable = this.CacheRequest[url];
            } else {
                // 设缓存
                ajaxObservable = this.ajax(props);
                this.CacheRequest[url] = ajaxObservable;
            }
            try {
                const d = await ajaxObservable;
                this.cacheReq[url] = d;
                return res(d);
            } catch (error) {
                return rej(error);
            }

            // try {
            //     let d = await this.ajax(props)
            //     this.cacheReq[url] = d
            //     return res(d)
            // } catch (error) {
            //     return rej(error)
            // }
        });
    }

    ajax(props) {
        props.url = this.initUrl(props.url);
        if (props.method == 'get') {
            if (!!window['ActiveXObject'] || 'ActiveXObject' in window) {
                //ie get 添加 ts防止走缓存
                props.body = props.body || {};

                props.body = {
                    ...props.body,
                    ts: new Date().getTime(),
                };

                props = this.initGetProps(props);
            } else if (props.body) {
                props = this.initGetProps(props);
            }
        }

        return new Promise((res, rej) => {
            axios[props.method](props.url, props.body, props.header)
                .then(data => {
                    data = data.data;

                    if (data.code == 200) {
                        return res(data.data);
                    } else if (data.messageCode == 510 || data.code == 510) {
                        notification.warning({ message: data.message });
                    } else {
                        notification.error({ message: data.message });
                    }
                    console.log('ajax code not 200', data);
                    return rej(data);
                })
                .catch((e: any) => {
                    let response = e.response;
                    console.log('ajax catch', response);
                    //System error,please raise ticket to contact IT engineer.
                    if (response) {
                        if (response.data.messageCode == 510) {
                            notification.warning({
                                message: response.data.message,
                            });
                        } else if (response && response.data.message) {
                            notification.error({
                                description: development
                                    ? response.data.path
                                    : 'error',
                                message: development
                                    ? response.data.message
                                    : 'System error,please raise ticket to contact IT engineer.',
                            });
                        } else {
                            notification.error({
                                message: `${response.status} ${response.statusText}`,
                            });
                        }
                    } else {
                        notification.error({ message: 'Time Out' });
                    }
                    rej(e);
                });
        });
    }

    fileDownload(method, url, body, header = {}) {
        //post get
        url = this.initUrl(url);
        return new Promise(async (promiseRes, rej) => {
            // window["showLoadingTitle"]("Create Download File...");
            axios[method](url, body, { ...header, responseType: 'arraybuffer' })
                .then(async res => {
                    // window["hideLoadingTitle"]();
                    let str = moment(new Date()).format('YYYYMMDD');
                    var fileName = str + '.xlsx';

                    if (res.headers['content-disposition']) {
                        fileName = res.headers['content-disposition']
                            .split(';')[1]
                            .split('filename=')[1];
                        // 创建Blob对象，设置文件类型
                        let blob = new Blob([res.data], {
                            type: 'application/vnd.ms-excel',
                        });
                        let objectUrl = URL.createObjectURL(blob); // 创建URL

                        // ie
                        if (
                            window.navigator &&
                            window.navigator.msSaveOrOpenBlob
                        ) {
                            window.navigator.msSaveOrOpenBlob(blob, fileName);
                        } else {
                            const link = document.createElement('a');
                            link.href = objectUrl;
                            link.download = fileName; // 自定义文件名
                            link.click(); // 下载文件
                        }

                        URL.revokeObjectURL(objectUrl); // 释放内存

                        return promiseRes();
                    } else {
                        try {
                            let strData: any = await this.getUint8Value(
                                res.data,
                            );
                            strData = JSON.parse(strData);
                            if (strData.messageCode == '510') {
                                notification.error({
                                    message: strData.message,
                                });
                            }

                            return rej();
                        } catch (e) {
                            return rej(e);
                            console.log(e);
                        }
                    }
                })
                .catch(async err => {
                    const res: any =
                        err && err.response && err.response.data
                            ? await this.getUint8Value(err.response.data)
                            : '';
                    console.log('file download res: ', JSON.parse(res).message);
                    notification.error({
                        message: (res
                            ? JSON.parse(res)
                            : { message: 'Download error' }
                        ).message,
                    });
                    // window["hideLoadingTitle"]();
                    return rej(err);
                });
        });
    }

    getUint8Value(e) {
        return new Promise((res, rej) => {
            for (
                var a = e, i = new DataView(a), n = '', s = 0;
                s < i.byteLength;
                s++
            ) {
                n += String.fromCharCode(i.getUint8(s));
            }
            res(n);
        });
    }

    fileUpload(option) {
        option.url = this.initUrl(option.action);
        return new Promise(async (promiseRes, rej) => {
            // window["showLoadingTitle"]("Uploading...");
            let formData = new FormData();
            formData.append('file', option.file);

            for (var key in option.data) {
                formData.append(key, option.data[key]);
            }

            axios['post'](option.url, formData, { responseType: 'arraybuffer' })
                .then(async res => {
                    // window["hideLoadingTitle"]();
                    let str = moment(new Date()).format('YYYYMMDD');
                    var fileName = str + '.xlsx';

                    if (res.headers['content-disposition']) {
                        fileName = res.headers['content-disposition']
                            .split(';')[1]
                            .split('filename=')[1];
                        // 创建Blob对象，设置文件类型
                        let blob = new Blob([res.data], {
                            type: 'application/vnd.ms-excel',
                        });
                        let objectUrl = URL.createObjectURL(blob); // 创建URL

                        // ie
                        if (
                            window.navigator &&
                            window.navigator.msSaveOrOpenBlob
                        ) {
                            window.navigator.msSaveOrOpenBlob(blob, fileName);
                        } else {
                            const link = document.createElement('a');
                            link.href = objectUrl;
                            link.download = fileName; // 自定义文件名
                            link.click(); // 下载文件
                        }

                        URL.revokeObjectURL(objectUrl); // 释放内存
                        notification.error({
                            message: `${option.file.name} Upload Error`,
                        });
                        return rej();
                    } else {
                        try {
                            let strData: any = await this.getUint8Value(
                                res.data,
                            );

                            strData = JSON.parse(strData);
                            if (strData.code == 200) {
                                notification.success({
                                    message: `${option.file.name} Upload Success`,
                                });

                                return promiseRes(strData.data);
                            } else {
                                notification.warning({
                                    message: `${strData.msg ||
                                        strData.message}`,
                                });
                                return rej();
                            }
                        } catch (e) {
                            notification.error({
                                message: `${option.file.name} Upload Error`,
                            });
                            return rej();
                        }
                    }
                })
                .catch(async res => {
                    let strData: any;
                    try {
                        res = res.response;
                        strData = await this.getUint8Value(res.data);
                        strData = JSON.parse(strData);
                    } catch (error) {
                        strData = {
                            message: '',
                        };
                    }

                    // window["hideLoadingTitle"]();
                    notification.warning({
                        message: `${option.file.name} Upload Error ! \n ${strData.message}`,
                    });
                    rej();
                });
        });
    }
}

export default new ReqAxios();
