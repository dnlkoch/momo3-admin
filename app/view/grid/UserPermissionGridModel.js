Ext.define('SHOGun.admin.view.grid.UserPermissionGridModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.shogun-userpermissiongrid',

    data: {
        userPermissionGridPanelGroupColumnName: 'Group',
        userPermissionGridPanelSubadminColumnName: 'Sub-Admin',
        userPermissionGridPanelEditorColumnName: 'Editor',
        userPermissionGridPanelUserColumnName: 'User'
    }
});
