Ext.define('SHOGun.admin.view.panel.layer.Style',{
    extend: 'Ext.panel.Panel',

    xtype: 'shogun-layer-style',

    requires: [
        'SHOGun.admin.view.panel.style.Styler'
    ],

    routeId: 'style',

    bind: {
        title: '{style.title}'
    },

    scrollable: 'y',

    padding: 20,

    items: [{
        xtype: 'fieldset',
        bind: {
            title: '{style.fieldsetTitle}'
        },
        items: [{
            xtype: 'shogun-panel-style-styler',
            bind: {
                dspLayerName: 'DSP {layer.name}'
            },
            layerUrl: '/shogun2-webapp/geoserver.action'
        }]
    }]
});
