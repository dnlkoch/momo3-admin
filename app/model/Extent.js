Ext.define('SHOGun.admin.model.Extent', {
    extend: 'SHOGun.admin.model.Base',

    proxy: {
        type: 'rest',
        url: BasiGX.util.Url.getWebProjectBaseUrl() + 'rest/extents',
        headers: BasiGX.util.CSRF.getHeader()
    },

    fields: [{
        name: 'lowerLeft',
        type: 'auto'
    }, {
        name: 'upperRight',
        type: 'auto'
    }]
});
