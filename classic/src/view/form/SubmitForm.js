Ext.define("SHOGun.admin.view.form.SubmitForm",{
    extend: "Ext.form.Panel",

    xtype: 'shogun-form-submitform',

    requires: [
        'BasiGX.util.CSRF'
    ],

    bodyPadding: 0,

    bodyStyle: {
        background: 'none'
    },

    defaultItems: [{
        xtype: 'hiddenfield',
        name: '_csrf',
        value: BasiGX.util.CSRF.getValue()
    }],

    initComponent: function() {
        this.callParent(arguments);
        this.add(this.defaultItems);
    }

});
