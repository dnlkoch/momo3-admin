Ext.define('SHOGun.admin.view.panel.style.Symbolizer', {
    extend: 'Ext.panel.Panel',
    xtype: 'shogun-panel-style-symbolizer',

    requires: [
        'SHOGun.admin.util.Sld',
        'SHOGun.admin.view.panel.style.SymbolizerController',
        'SHOGun.admin.view.panel.style.SymbolizerModel'
    ],

    controller: 'panel.style.symbolizer',
    viewModel: {
        type: 'panel.style.symbolizer'
    },

    bodyStyle: {
        background: '#f6f6f6'
    },

    config: {
        symbolizer: null
    },

    listeners: {
        boxready: 'setupInitialUI'
    }
});
