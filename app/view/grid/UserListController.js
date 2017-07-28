Ext.define('SHOGun.admin.view.grid.UserListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.shogun-userlist',

    requires: [
        // 'SHOGun.admin.view.tab.CreateOrEditApplication'
    ],

    loadStore: function(){
        this.getView().getStore().load();
    },

    /**
     * examples/kitchensink/#filtered-tree
     */
    onFilterChange: function(filterField) {
        var grid = this.getView(),
            filters = grid.store.getFilters();

        if (filterField.value) {
            this.nameFilter = filters.add({
                filterFn: function(item) {
                    var d = item.data;
                    var v = filterField.value.toLowerCase();
                    return d.accountName.toLowerCase().indexOf(v) !== -1 ||
                        d.fullName.toLowerCase().indexOf(v) !== -1 ||
                        d.department &&
                        d.department.toLowerCase().indexOf(v) !== -1;
                }
            });
        } else if (this.nameFilter) {
            filters.remove(this.nameFilter);
            this.nameFilter = null;
        }
    },

    onDeleteClick: function() {
        var view = this.getView();
        var viewModel = view.getViewModel();
        var selection = view.getSelectionModel().getSelection();

        Ext.Msg.show({
            title: viewModel.get('i18n.deleteUser'),
            message: viewModel.get('i18n.deleteUserText'),
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'yes') {
                    view.setLoading(true);
                    Ext.each(selection, function(user) {
                        var userId = user.get('id');
                        Ext.Ajax.request({
                            url: BasiGX.util.Url.getWebProjectBaseUrl() +
                                'projectusers/delete.action?id=' + userId,
                            method: "POST",
                            defaultHeaders: BasiGX.util.CSRF.getHeader(),
                            scope: this,
                            callback: function(self, success, response) {
                                view.setLoading(false);
                                view.getStore().load();
                                if (success) {
                                    try {
                                        var res = Ext.decode(
                                            response.responseText);
                                        if (res.success) {
                                            Ext.Msg.alert(
                                                viewModel.get(
                                                    'i18n.action' +
                                                    'Success'),
                                                viewModel.get(
                                                    'i18n.deletion' +
                                                    'SuccessText')
                                            );
                                        } else {
                                            Ext.Msg.alert(
                                                viewModel.get(
                                                    'i18n.action' +
                                                    'Failure'),
                                                viewModel.get(
                                                    'i18n.deletion' +
                                                    'FailureText')
                                            );
                                        }
                                    } catch (e) {
                                        Ext.Msg.alert(
                                            viewModel.get(
                                                'i18n.actionFailure'),
                                            viewModel.get(
                                                'i18n.deletion' +
                                                'FailureText')
                                        );
                                    }
                                } else {
                                    Ext.Msg.alert(
                                        viewModel.get(
                                            'i18n.actionFailure'),
                                        viewModel.get(
                                            'i18n.deletionFailureText')
                                    );
                                }
                            }
                        });
                    });
                }
            }
        });
    }
});
