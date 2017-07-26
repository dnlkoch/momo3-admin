Ext.define('SHOGun.admin.view.tab.CreateOrEditLayer', {
    extend: 'Ext.tab.Panel',

    xtype: 'shogun-create-or-edit-layer',

    requires: [
        'SHOGun.admin.view.tab.CreateOrEditLayerController',
        'SHOGun.admin.view.tab.CreateOrEditLayerModel',
        'SHOGun.admin.view.panel.layer.General',
        'SHOGun.admin.view.panel.layer.Metadata',
        'SHOGun.admin.view.panel.layer.Style',
        'SHOGun.admin.view.panel.layer.Permissions'
    ],

    controller: 'shogun-create-or-edit-layer',

    viewModel: {
        type: 'shogun-create-or-edit-layer'
    },

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
            text: '{i18n.saveBtnText}',
            disabled: '{isNewLayer}'
        },
        handler: 'onSaveClick'
    }],

    items: [{
        xtype: 'shogun-layer-general'
    },
//    {
//        xtype: 'shogun-layer-metadata',
//        bind: {
//            disabled: '{isNewLayer}'
//        }
//    },
    {
        xtype: 'shogun-layer-style',
        bind: {
            disabled: '{isNewLayer}'
        }
    }, {
        xtype: 'shogun-layer-permission',
        bind: {
            disabled: '{isNewLayer}'
        }
    }],

    listeners: {
        afterrender: 'loadLayerData',
        show: 'loadLayerData',
        // TODO We destroy the view in the onHide method for cleanup reasons.
        hide: 'onHide'
    }

});
