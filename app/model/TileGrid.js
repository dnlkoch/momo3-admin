Ext.define('SHOGun.admin.model.TileGrid', {
    extend: 'SHOGun.admin.model.Base',

    requires: [
        'SHOGun.admin.model.Extent'
    ],

    proxy: {
        type: 'rest',
        url: BasiGX.util.Url.getWebProjectBaseUrl() + 'rest/tilegrids',
        headers: BasiGX.util.CSRF.getHeader()
    },

    fields: [{
        name: 'type',
        type: 'string'
    }, {
        name: 'tileGridOrigin',
        type: 'auto'
    }, {
        name: 'tileSize',
        type: 'integer'
    }, {
        name: 'tileGridResolutions',
        type: 'auto'
    }, {
        name: 'tileGridExtentId',
        reference: {
            type: 'Extent',
            unique: true
        }
    }]
});
