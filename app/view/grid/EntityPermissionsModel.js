Ext.define('SHOGun.admin.view.grid.EntityPermissionsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.shogun-entitypermissions',

    data: {
        usersColumnTitle: 'Users',
        groupsColumnTitle: 'Groups',
        readPermissionColumnTitle: 'Read',
        updatePermissionColumnTitle: 'Update',
        deletePermissionColumnTitle: 'Delete',
        permissionsUpdatesSuccessTitle: 'Success',
        permissionsUpdatesSuccessText: 'Permissions updated',
        permissionsUpdatesFailureTitle: 'Failure',
        permissionsUpdatesFailureText: 'Permissions failed to update'
    }
});
