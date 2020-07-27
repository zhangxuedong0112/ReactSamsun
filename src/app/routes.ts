const routes = [
    {path: '/login', component: "@/pages/user/login"},
    
    { 
        path: '/', 
        component: '@/layouts',
        routes: [
            {path: "/test", component: "@/pages/test"},
            {path: "/user", component: "@/pages/user"},


            { component: '@/pages/404' },
        ],
    },

    { component: '@/pages/404' },
]


export default routes 