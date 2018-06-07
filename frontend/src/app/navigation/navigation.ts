export const navigation = [
    {
        'id'      : 'applications',
        'title'   : 'Applications',
        'translate': 'NAV.APPLICATIONS',
        'type'    : 'group',
        'children': [
            {
                'id'   : 'home',
                'title': 'Home',
                'translate': 'NAV.SAMPLE.TITLE',
                'type' : 'item',
                'icon' : 'home',
                'url'  : '/home'
            },
            {
                'id'   : 'usuarios',
                'title': 'Usuarios',
                'translate': 'NAV.SAMPLE.TITLE',
                'type' : 'item',
                'icon' : 'group',
                'url'  : '/usuarios'
            }
        ]
    }
];
