Ext.define('SHOGun.admin.model.LayerAppearance', {
    extend: 'SHOGun.admin.model.Base',

    proxy: {
        type: 'rest',
        url: BasiGX.util.Url.getWebProjectBaseUrl() + 'rest/layerappearances',
        headers: BasiGX.util.CSRF.getHeader()
    },

    fields: [{
        name: 'name',
        type: 'string'
    }, {
        name: 'hoverTemplate',
        type: 'string'
    }, {
        name: 'attribution',
        type: 'string'
    }, {
        name: 'maxResolution',
        type: 'number'
    }, {
        name: 'minResolution',
        type: 'number'
    }, {
        name: 'opacity',
        type: 'number',
        defaultValue: 1
    }, {
        name: 'visible',
        type: 'boolean'
    }]
});
