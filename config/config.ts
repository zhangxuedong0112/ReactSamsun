import { defineConfig } from 'umi';
import routes from '../src/app/routes';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

// console.log('@@@@@@@@@@', REACT_APP_ENV);
/*资料 https://v2.umijs.org/zh/config/#plugins */
export default defineConfig({
    base: '/',
    // publicPath: '/',
    hash: true,
    history: {
        // type: 'browser',
        type: 'hash',
    },
    locale: {
        // default zh-CN
        default: 'en-US',
        // default true, when it is true, will use `navigator.language` overwrite default
        antd: true,
        baseNavigator: true,
    },
    dynamicImport: {
        loading: '@/components/PageLoading/index',
    },
    targets: {
        ie: 10,
    },
    // layout: {},
    nodeModulesTransform: {
        type: 'none',
    },
    routes,
    useEslint: false,
    proxy: proxy[REACT_APP_ENV || 'dev'],

    // chainWebpack(config, { webpack }) {
    //   // 设置 alias
    //   // config.resolve.alias.set('@/', require('path').resolve(__dirname, './src'));

    // }
});
