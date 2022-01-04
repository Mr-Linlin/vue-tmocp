export const rights= [
    {
        id: 111,
        title: '用户管理',
        icon: "iconlzt icon-lzt-yonghuguanli",
        children: [{ name: 'userList', title: '用户列表', path: 'userList', icon: "iconlzt icon-lzt-yonghuguanli" }]
    },
    {
        id: 112,
        title: '课程管理',
        icon: "iconlzt icon-lzt-kechengguanli",
        children: [
            { name: '', title: '课程', path: 'courseList', icon: "iconlzt icon-lzt-kechengguanli" },
            { name: '', title: '课程专业', path: 'courseProfessional', icon: "iconlzt icon-lzt-kechengguanli" }
        ]
    },
    {
        id: 113,
        title: '订单管理',
        icon: "iconlzt icon-lzt-dingdanguanli",
        children: [
            { name: '', title: '订单', path: 'orderList', icon: "iconlzt icon-lzt-dingdanguanli" },
            { name: '', title: '订单流水', path: 'orderWater', icon: "iconlzt icon-lzt-dingdanguanli" }
        ]
    },
    {
        id: 114,
        title: '学习管理',
        icon: "iconlzt icon-lzt-xuexiguanli",
        children: [
            { name: '', title: '学习记录', path: 'learnRecord', icon: "iconlzt icon-lzt-xuexiguanli" },
        ]
    },
]