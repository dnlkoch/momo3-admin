Ext.define('SHOGun.admin.data.identifier.Null', {
    extend: 'Ext.data.identifier.Generator',

    alias: 'data.identifier.null',

    generate: function () {
        return null;
    }

});
