import Mock from 'mockjs';

export default {
    'POST /api/table/search': (req, res) => {
        const {
            body: { pagination },
        } = req;
        const { current, pageSize } = pagination;

        let obj = {};

        obj[`dataSource|${pageSize}-${pageSize}`] = [
            {
                id: '@id',
                name: '@name',
                city: '@city',
                date: '@date',
                email: '@email',
            },
        ];

        setTimeout(() => {
            res.send(
                Mock.mock({
                    code: 200,
                    msg: 'msg',
                    data: {
                        total: pageSize * 5, // 数据总数
                        pageSize: pageSize, // 每页条数
                        current: current, //当前页码
                        ...obj, // 数据数组
                    },
                }),
            );
        }, 600);
    },
};
