Ext.define('SHOGun.admin.view.viewport.Viewport', {
    extend: 'Ext.container.Viewport',
    xtype: 'shogun-mainviewport',

    requires: [
        'Ext.list.Tree',

        'SHOGun.admin.view.viewport.ViewportController',
        'SHOGun.admin.view.viewport.ViewportModel',
        'SHOGun.admin.view.container.MainContainer',
        'SHOGun.admin.view.grid.ApplicationList',
        'SHOGun.admin.view.grid.LayerList',
        'SHOGun.admin.view.grid.UserList',
        'SHOGun.admin.view.panel.ProfilePanel',
        'SHOGun.admin.view.panel.GroupPanel',
        'SHOGun.admin.view.button.translation.ToGerman',
        'SHOGun.admin.view.button.translation.ToEnglish'
    ],

    controller: 'shogun-mainviewport',

    viewModel: {
        type: 'shogun-mainviewport'
    },

    cls: 'sencha-dash-viewport',

    itemId: 'mainView',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        beforerender: 'getUserBySession',
        render: 'onMainViewRender'
    },

    items: [{
        xtype: 'toolbar',
        cls: 'viewport-header-headerbar toolbar-btn-shadow',
        height: 64,
        itemId: 'headerBar',
        items: [{
            xtype: 'image',
            reference: 'headerLogo',
            cls: 'viewport-header-logo',
            src: 'resources/images/shogun-logo-full-150px.png',
            height: 43
        }, {
            xtype: 'tbspacer',
            flex: 1
        }, {
            xtype: 'shogun-translation-de-button'
        }, {
            xtype: 'shogun-translation-en-button'
        }, {
            xtype: 'button',
            cls: 'delete-focus-bg',
            iconCls: 'x-fa fa-power-off',
            bind: {
                tooltip: '{i18n.logoutTitle}'
            },
            handler: 'logOut'
        }, {
            xtype: 'tbtext',
            cls: 'header-toolbar-text',
            bind: {
                text: '{user.fullName}'
            }
        }, {
            xtype: 'image',
            cls: 'header-right-profile-image',
            style: {
                'border-radius': '20px'
            },
            height: 35,
            width: 35,
            alt: 'current user image',
            bind: {
                src: '{profileImage}'
            }
        }]
    }, {
        xtype: 'shogun-maincontainerwrap',
        reference: 'mainContainerWrap',
        flex: 1,
        items: [{
            xtype: 'container',
            reference: 'navigationContainer',
            layout: 'vbox',
            defaults: {
                width: 250
            },
            items: [{
                xtype: 'treelist',
                ui: 'navigation',
                reference: 'navigationTreeList',
                store: 'NavigationTree',
                expanderFirst: false,
                expanderOnly: false,
                listeners: {
                    selectionchange: 'onNavigationTreeSelectionChange'
                }
            }, {
                xtype: 'button',
                iconCls: 'x-fa fa-angle-left',
                enableToggle: true,
                pressed: true,
                listeners: {
                    toggle: 'onToggleNavigationSize',
                    beforerender: 'onToggleNavigationRender'
                }
            }]
        }, {
            xtype: 'container',
            flex: 1,
            reference: 'mainCardPanel',
            cls: 'main-card-panel',
            itemId: 'contentPanel',
            layout: {
                type: 'card'
            }
        }]
    }]
});
