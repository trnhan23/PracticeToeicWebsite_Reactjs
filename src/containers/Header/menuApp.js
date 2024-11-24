export const adminMenu = [
    
    //quản lý hệ thống
    {
        name: 'menu.admin.parent-manage',
        menus: [
            {
                name: 'menu.admin.manage.user', link: '/system/user-manage'
            },
            {
                name: 'menu.admin.manage.test-add', link: '/system/test-manage'
            },
        ]
    },

    // chuyển trang user
    {
        name: 'menu.admin.parent-user',
        menus: [
            {
                name: 'menu.admin.user.change', link: '/home'
            }
        ]
    },
];