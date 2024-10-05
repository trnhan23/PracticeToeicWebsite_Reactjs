export const adminMenu = [
    //quản lý người dùng
    {
        name: 'menu.admin.parent-user-manage',
        menus: [
            {
                name: 'menu.admin.user-manage.admin', link: '/system/user-manage'
            },
            {
                name: 'menu.admin.user-manage.user'
            },
            {
                name: 'menu.admin.user-manage.redux', link: '/system/user-redux'
            },
        ]
    },

    //quản lý bài thi
    {
        name: 'menu.admin.parent-test-manage',
        menus: [
            {
                name: 'menu.admin.test-manage.add', link: '/system/test-manage'
            },
            {
                name: 'menu.admin.test-manage.update'
            },
            {
                name: 'menu.admin.test-manage.delete'
            },
        ]
    },

    //quản lý từ vựng
    {
        name: 'menu.admin.parent-vocabulary-manage',
        menus: [
            {
                name: 'menu.admin.vocabulary-manage.add', link: '/system/vocabulary-manage'
            },
            {
                name: 'menu.admin.vocabulary-manage.update'
            },
            {
                name: 'menu.admin.vocabulary-manage.delete'
            },
        ]
    },

    //quản lý bài viết
    {
        name: 'menu.admin.parent-blog-manage',
        menus: [
            {
                name: 'menu.admin.blog-manage.add', link: '/system/blog-manage'
            },
            {
                name: 'menu.admin.blog-manage.update'
            },
            {
                name: 'menu.admin.blog-manage.delete'
            },
        ]
    },
];