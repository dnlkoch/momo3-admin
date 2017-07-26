Ext.define('SHOGun.admin.store.Roles', {
    extend: 'Ext.data.Store',

    alias: 'store.roles',

    proxy: {
        type: 'rest',
        url: BasiGX.util.Url.getWebProjectBaseUrl() + 'rest/roles',
        headers: BasiGX.util.CSRF.getHeader()
    }

});
