Ext.define('SHOGun.admin.model.User', {

    extend: 'SHOGun.admin.model.Base',

    proxy: {
        type: 'rest',
        url: BasiGX.util.Url.getWebProjectBaseUrl() + 'rest/projectusers',
        headers: BasiGX.util.CSRF.getHeader()
    },

    fields: [{
        name: 'accountName',
        type: 'string'
    }, {
        name: 'active',
        type: 'boolean'
    }, {
        name: 'email',
        type: 'string',
        vtype: 'email' // requires value to be a valid email adress format
    }, {
        name: 'password',
        type: 'string'
    }, {
        name: 'firstName',
        type: 'string'
    }, {
        name: 'fullName',
        type: 'string',
        calculate: function(data){
            return data.firstName + ' ' + data.lastName;
        },
        depends: [ 'firstName', 'lastName' ],
        persist: false
    }, {
        name: 'language',
        type: 'string'
    }, {
        name: 'lastName',
        type: 'string'
    }, {
        name: 'department',
        type: 'string'
    }, {
        name: 'telephone',
        type: 'string'
    }]

});
