Ext.define('SHOGun.admin.view.grid.LayerListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.shogun-layerlist',

    data: {
        layerlistTitle: '',
        layerlistCreateLayer: '',
        layerlistDeleteLayer: '',
        layerlistFilterByName: '',
        layerlistRefreshText: '',
        layerlistSettings: '',
        layerlistStyle: '',
        layerlistDownload: '',
        layerlistPreview: '',
        deletionErrorMsgTitle: '',
        deletionErrorMsgText: '',
        deletionMsgTemplate: '',
        unsuccessfulDeletionMsgTemplate: '',
        downloadStartingMsg: '',
        downloadFailureMsg: '',
        previewTemplate: ''
    }
});
