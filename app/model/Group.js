Ext.define('SHOGun.admin.model.Group', {

    extend: 'SHOGun.admin.model.Base',
    requires: ['SHOGun.admin.data.identifier.Null'],
    clientIdProperty: 'clientId',
    identifier: 'null',
    proxy: {
        type: 'rest',
        url: BasiGX.util.Url.getWebProjectBaseUrl() + 'rest/projectusergroups',
        headers: BasiGX.util.CSRF.getHeader()
    },

    fields: [{
        name: 'name',
        type: 'string'
    }, {
        name: 'owner',
        type: 'auto'
    }]

});
