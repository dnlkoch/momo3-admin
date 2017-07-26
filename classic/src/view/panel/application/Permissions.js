Ext.define('SHOGun.admin.view.panel.application.Permissions', {
    extend: 'Ext.panel.Panel',

    xtype: 'shogun-application-permission',

    requires: [
        'SHOGun.admin.view.grid.EntityPermissions'
    ],

    routeId: 'permissions',

    bind: {
        title: '{i18n.permissions.applicationpermissionstitle}'
    },

    padding: 20,

    scrollable: 'y',

    items: [{
        xtype: 'displayfield',
        bind: {
            value: '{i18n.permissions.applicationpermissionsdescriptiontext}'
        }
    }, {
        xtype: 'fieldset',
        layout: 'hbox',
        bind: {
            title: '{i18n.permissions.applicationpermissionstitle}'
        },
        items: [{
            xtype: 'shogun-entitypermissions',
            flex: 1,
            entity: 'ProjectApplication',
            targetEntity: 'ProjectUser'
        }, {
            xtype: 'shogun-entitypermissions',
            flex: 1,
            entity: 'ProjectApplication',
            targetEntity: 'ProjectUserGroup'
        }]
    }]

});
