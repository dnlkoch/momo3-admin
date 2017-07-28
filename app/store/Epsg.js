/*eslint max-len: 0*/
Ext.define('SHOGun.admin.store.Epsg', {
    extend: 'Ext.data.ArrayStore',

    requires: [
        'Ext.data.proxy.JsonP'
    ],

    /**
     *
     */
    fields: [
        "code",
        {
            name: 'name',
            type: 'string',
            convert: function (v, rec) {
                return rec.get('name') + ' - (' + rec.get('code') + ')';
            }
        },
        "desc"],

    /**
     *
     */
    alias: 'store.epsg',

    proxy: {
        type: 'ajax',
        url : '/shogun2-webapp/admin/resources/data/codes.txt',
        reader: {
            type: 'array'
        }
    }

});
