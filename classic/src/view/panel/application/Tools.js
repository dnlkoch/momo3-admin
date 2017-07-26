Ext.define('SHOGun.admin.view.panel.application.Tools', {
    extend: 'Ext.panel.Panel',

    xtype: 'shogun-application-tools',

    requires: [
        'SHOGun.admin.view.panel.application.ToolsController'
    ],

    controller: 'shogun-application-tools',

    routeId: 'tools',

    bind: {
        title: '{i18n.tools.title}'
    },

    padding: 20,

    scrollable: 'y',

    items: [{
        xtype: 'fieldset',
        bind: {
            title: '{i18n.tools.title}'
        },
        items: [{
            xtype: 'displayfield',
            bind: {
                value: '{i18n.tools.helpText}'
            }
        }]
    }],

    initComponent: function(){
        this.callParent();
        var me = this;
        this.store = Ext.create('SHOGun.admin.store.Tools', {
            autoLoad: true,
            listeners: {
                scope: me,
                load: me.getController().createToolButtons
            }
        });
    }

});
