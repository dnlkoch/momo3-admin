Ext.define('SHOGun.admin.view.panel.layer.Permissions', {
    extend: 'Ext.panel.Panel',

    xtype: 'shogun-layer-permission',

    requires: [
        'SHOGun.admin.view.grid.EntityPermissions'
    ],

    routeId: 'permissions',

    bind: {
        title: '{i18n.permissions.layerpermissionstitle}'
    },

    padding: 20,

    scrollable: 'y',

    items: [{
        xtype: 'displayfield',
        bind: {
            value: '{i18n.permissions.layerpermissionsdescriptionText}'
        }
    }, {
        xtype: 'fieldset',
        layout: 'hbox',
        bind: {
            title: '{i18n.permissions.layerpermissionstitle}'
        },
        items: [{
            xtype: 'shogun-entitypermissions',
            flex: 1,
            entity: 'ProjectLayer',
            targetEntity: 'ProjectUser'
        }, {
            xtype: 'shogun-entitypermissions',
            flex: 1,
            entity: 'ProjectLayer',
            targetEntity: 'ProjectUserGroup'
        }]
    }]

});
