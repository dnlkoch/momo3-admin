Ext.define('SHOGun.admin.view.grid.ApplicationListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.shogun-applicationlist',

    data: {
        applicationsTitle: 'All applications',
        applicationsCreateApp: 'Create',
        applicationsCopyApp: 'Copy',
        applicationsDeleteApp: 'Delete',
        applicationsFilterByName: 'Filter by name',
        applicationsRefreshText: 'Refresh',
        applicationsSettings: 'Settings',
        applicationsPreview: 'Open'
    }
});
