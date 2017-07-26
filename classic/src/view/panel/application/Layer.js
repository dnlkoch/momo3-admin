Ext.define('SHOGun.admin.view.panel.application.Layer', {
    extend: 'Ext.panel.Panel',

    xtype: 'shogun-application-layer',

    requires: [
        'SHOGun.admin.view.panel.application.LayerController',

        'SHOGun.admin.view.tree.LayerTree'
    ],

    controller: 'shogun-application-layer',

    routeId: 'layer',

    bind: {
        title: '{i18n.layer.title}'
    },

    padding: 20,

    layout: 'fit',

    items: [{
        xtype: 'fieldset',
        bind: {
            title: '{i18n.layer.title}'
        },
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'shogun-layerlist',
            scrollable: 'y',
            flex: 1,
            viewConfig: {
                plugins: {
                    ptype: 'gridviewdragdrop',
                    ddGroup: 'layertree-dd-group',
                    enableDrop: false
                }
            },
            selModel: {
                selType: 'rowmodel',
                mode: 'MULTI'
            },
            showCreateButton: false,
            showCopyButton: false,
            showDeleteButton: false,
            showLayerSettingsColumn: false,
            showLayerStyleColumn: false,
            showLayerPreviewColumn: true,
            showLayerDownloadColumn: false
        }, {
            xtype: 'displayfield',
            width: 15
        }, {
            xtype: 'shogun-layertree',
            scrollable: 'y',
            flex: 1
        }]
    }]

});
