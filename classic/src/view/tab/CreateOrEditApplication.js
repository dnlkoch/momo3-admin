Ext.define('SHOGun.admin.view.tab.CreateOrEditApplication', {
    extend: 'Ext.tab.Panel',

    xtype: 'shogun-create-or-edit-application',

    requires: [
        'SHOGun.admin.view.tab.CreateOrEditApplicationController',
        'SHOGun.admin.view.tab.CreateOrEditApplicationModel',
        'SHOGun.admin.view.panel.application.General',
        'SHOGun.admin.view.panel.application.Layout',
        'SHOGun.admin.view.panel.application.Layer',
        'SHOGun.admin.view.panel.application.Tools',
        'SHOGun.admin.view.panel.application.StartView',
        'SHOGun.admin.view.panel.application.Permissions'
    ],

    controller: 'shogun-create-or-edit-application',

    viewModel: {
        type: 'shogun-create-or-edit-application'
    },

    routeId: 'createOrEdit',

    /**
     * It is important to set this to false to assure that the DOM of all
     * tabs will be build immediately to assure that the databinding is
     * working even if a user did not activate one of the tabs before saving.
     */
    deferredRender: false,

    bbar: [{
        xtype: 'tbfill'
    }, {
        xtype: 'button',
        bind: {
            text: '{i18n.cancelBtnText}'
        },
        handler: 'onCancelClick'
    }, {
        xtype: 'button',
        bind: {
            text: '{i18n.saveBtnText}'
        },
        handler: 'onSaveClick'
    }],

    items: [{
        xtype: 'shogun-application-general'
    },
//    {
//        xtype: 'shogun-application-layout',
//        disabled: true
//    },
    {
        xtype: 'shogun-application-tools'
    }, {
        xtype: 'shogun-application-start-view'
    }, {
        xtype: 'shogun-application-layer'
    }, {
        xtype: 'shogun-application-permission'
    }],

    listeners: {
        afterrender: 'loadApplicationData',
        show: 'loadApplicationData',
        hide: 'onHide'
    }

});
