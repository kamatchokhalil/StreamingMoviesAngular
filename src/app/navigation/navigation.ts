import {FuseNavigation} from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        children: [
            {
                id: 'sample',
                title: 'Sample',
                translate: 'NAV.SAMPLE.TITLE',
                type: 'item',
                icon: 'email',
                url: '/sample',
                badge: {
                    title: '25',
                    translate: 'NAV.SAMPLE.BADGE',
                    bg: '#F44336',
                    fg: '#FFFFFF'
                },
            }
        ]
    },
    {
        id: 'adsItem',
        title: 'adsItem',
        translate: 'NAV.AdsItem',
        type: 'collapsable',
        icon: 'dvr',
        children: [
            {
                id: 'Ads',
                title: 'categories',
                translate: 'NAV.categories.TITLE',
                type: 'item',
                icon: '',
                url: '/Ads',

            },
            {
                id: 'Ads',
                title: 'All ads',
                translate: 'NAV.getAll.TITLE',
                type: 'item',
                icon: '',
                url: '/categories',
            }
        ]
    },
    {
        id: 'EntertainmentItem',
        title: 'Entertainment',
        translate: 'NAV.EntertainmentItem',
        type: 'collapsable',
        icon: 'movie',
        children: [

            {
                id: 'allMovies',
                title: 'All Movies',
                translate: 'NAV.movie.TITLE',
                type: 'item',
                icon: '',
                url: '/movies',

            },
            {
                id: 'upload',
                title: 'Upload',
                translate: 'NAV.upload.TITLE',
                type: 'item',
                icon: '',
                url: '/movie',

            },
            {
                id: 'movieGenres',
                title: 'Movie genres',
                translate: 'NAV.movieCategories.TITLE',
                type: 'item',
                icon: '',
                url: '/categories',
            }
        ]
    },
    {
        id: 'StoreItem',
        title: 'Stores',
        translate: 'NAV.StoreItem',
        type: 'collapsable',
        icon: 'store',
        children: [
            {
                id: 'addStore',
                title: 'Add store',
                translate: 'NAV.addstore.TITLE',
                type: 'item',
                icon: '',
                url: '/addSore',

            },
            {
                id: 'allStores',
                title: 'All stores',
                translate: 'NAV.stores.TITLE',
                type: 'item',
                icon: '',
                url: '/stores',

            },
            {
                id: 'movieGenres',
                title: 'Location',
                translate: 'NAV.location.TITLE',
                type: 'item',
                icon: '',
                url: '/categories',
            }
        ]
    },
    {
        id: 'chat',
        title: 'Chat',
        translate: 'NAV.Chat.TITLE',
        type: 'item',
        icon: 'email',
        url: '/chat',

    },
    {

        id: 'analytics',
        title: 'Analytics',
        translate: 'NAV.analytics.TITLE',
        type: 'item',
        icon: 'chart',
        url: '/analytics',

    },
    {
        id: 'usersConrol',
        title: 'User',
        translate: 'NAV.User',
        type: 'collapsable',
        icon: 'supervised_user_circle',
        children: [
            {
                id: 'addusers',
                title: 'Add user',
                translate: 'NAV.addstore.TITLE',
                type: 'item',
                icon: '',
                url: '/addUser',

            },

            {
                id: 'getUsers',
                title: 'show users',
                translate: 'show ',
                type: 'item',
                icon: '',
                url: '/getUsers',

            }


        ]
    },
    {
        id: 'fournisseur',
        title: 'Supplier',
        translate: 'NAV.supplier.TITLE',
        type: 'collapsable',
        icon: 'receipt',
        children: [
            {
                id: 'addfour',
                title: 'Add Supplier',
                translate: 'NAV.addfour.TITLE',
                type: 'item',
                icon: '',
                url: '/addsupplier',

            },

            {
                id: 'getfour',
                title: 'Show Supplier',
                translate: 'NAV.getfour.TITLE',
                type: 'item',
                icon: '',
                url: '/getsupplier',

            }
        ]
    }
];
