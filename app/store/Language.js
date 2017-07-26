Ext.define('SHOGun.admin.store.Language', {
    extend: 'Ext.data.Store',

    storeId: 'Language',

    fields: [{
        locale: 'Locale',
        name: 'Name'
    }],

    data: [{
        locale: 'de',
        name: 'Deutsch'
    }, {
        locale: 'en',
        name: 'English'
    }]

});
