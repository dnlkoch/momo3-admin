Ext.define('SHOGun.admin.view.panel.GroupPanel',{
    extend: 'Ext.form.Panel',

    xtype: 'shogun-grouppanel',

    bodyPadding: 5,

    requires: [
        'SHOGun.admin.view.panel.GroupPanelController',
        'SHOGun.admin.view.panel.GroupPanelModel',
        'SHOGun.admin.view.grid.GroupList',
        'SHOGun.admin.view.grid.GroupPermissionGrid'
    ],

    controller: 'shogun-grouppanel',

    viewModel: {
        type: 'shogun-grouppanel'
    },

    listeners: {
        groupsreloaded: 'reloadData'
    },

    bind: {
        title: '{i18n.grouppanelTitle}'
    },
    height: 400,
    scrollable: 'y',

    items: [{
        xtype: 'container',
        layout: 'hbox',
        items: [{
            xtype: 'fieldset',
            minWidth: 620,
            minHeight: 350,
            flex: 1,
            defaults: {
                width: '100%'
            },
            items: [{
                xtype: 'shogun-grouplist'
            }]
        }, {
            xtype: 'fieldset',
            flex: 2,
            minHeight: 350,
            items: [{
                xtype: 'panel',
                bind: {
                    title: '{i18n.grouppanelEditPermissionsTitle}'
                },
                items: [{
                    xtype: 'displayfield',
                    bind: {
                        value: '{i18n.grouppanelPermissionGridDescription}'
                    }
                }, {
                    xtype: 'shogun-grouppermissiongrid'
                }]
            }]
        }]
    }],


    bbar: [{
        xtype: 'button',
        formBind: true,
        bind: {
            text: '{i18n.grouppanelSaveButtonText}'
        },
        scale: 'large',
        ui: 'shogun',
        iconCls: 'fa fa-save fa-2x',
        handler: 'onSaveClick'
    }]

});
