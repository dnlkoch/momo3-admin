Ext.define('SHOGun.admin.view.panel.application.GeneralController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.shogun-application-general',

    onPublicCheckboxChange: function(box) {
        var me = this;
        var viewModel = me.getView().lookupViewModel();

        if (box.checked) {
            Ext.toast(viewModel.get('i18n.general.publicBoxToastText'),
              null, 'b');
        }
    },

    onActiveCheckboxChange: function(box) {
        var me = this;
        var viewModel = me.getView().lookupViewModel();

        if (!box.checked) {
            Ext.toast(viewModel.get('i18n.general.activeBoxToastText'),
              null, 'b');
        }
    }

});
