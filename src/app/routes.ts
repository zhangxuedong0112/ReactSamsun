const { REACT_APP_ENV } = process.env;

console.log('@@@@@@@@@@', REACT_APP_ENV);

const routes = [
    { exact: true, path: '/login', component: '@/pages/login' },

    {
        path: '/',
        component: REACT_APP_ENV == 'pre' ? '@/pages/index' : '@/layouts',
        routes: [
            { exact: true, path: '/', component: '@/pages/welcome' },
            { exact: true, path: '/hookDemo', component: '@/pages/hookDemo' },
            { exact: true, path: '/user', component: '@/pages/user' },
            { exact: true, path: '/mock', component: '@/pages/mock' },
            { exact: true, path: '/editor', component: '@/pages/editor' },
            {
                exact: true,
                path: '/searchPage',
                component: '@/pages/searchPage',
            },

            { component: '@/pages/404' },
        ],
    },

    { component: '@/pages/404' },
];

export default routes;
