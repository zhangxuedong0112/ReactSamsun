const routes = [
    {exact: true, path: '/login', component: "@/pages/user/login"},
    
    { 
        path: '/', 
        component: '@/layouts',
        // component: "@/pages/index",
        routes: [
            {exact: true, path: "/", component: "@/pages/welcome"},
            {exact: true, path: "/test", component: "@/pages/test"},
            {exact: true, path: "/user", component: "@/pages/user"},


            { component: '@/pages/404' },
        ],
    },

    { component: '@/pages/404' },
]


export default routes 