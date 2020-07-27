const routes = [
    { 
        path: '/', 
        component: '@/pages/index',
        routes: [
            {path: "/test", component: "@/pages/test"},
            {path: "/user", component: "@/pages/user"},


            { component: '@/pages/404' },
        ],
    },

    { component: '@/pages/404' },
]


export default routes 