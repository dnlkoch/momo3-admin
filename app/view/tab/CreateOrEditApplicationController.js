Ext.define('SHOGun.admin.view.tab.CreateOrEditApplicationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.shogun-create-or-edit-application',
    requires: [
        'BasiGX.util.Object'
    ],

    /**
     * Cleanup Applicationdata to avoid artifacts when navigating through the
     * admin frontend.
     */
    onHide: function(){
        var me = this;
        var viewModel = me.getViewModel();
        viewModel.set('entityId', null);
        viewModel.set('application', Ext.create(
                'SHOGun.admin.model.Application'));
    },

    /**
     *
     */
    loadApplicationData: function() {
        var me = this;
        var viewModel = me.getViewModel();
        var applicationId = viewModel.get('entityId');

        if (applicationId) {
            SHOGun.admin.model.Application.load(applicationId, {
                scope: this,
                success: function(record) {
                    viewModel.set('application', record);
                    var mapConfig = BasiGX.util.Object.getValue(
                        'mapConfig', record);
                    viewModel.set('startview.values', mapConfig);
                    var proj = viewModel.get('startview.values.projection') ||
                        'EPSG:3857';
                    if (proj.indexOf('EPSG') < 0) {
                        viewModel.set('startview.values.projection', 'EPSG:' +
                            proj);
                    }
                    var layerTab = me.getView().down('shogun-application-layer');
                    var layerTreePanel = layerTab.down('shogun-layertree');
                    layerTreePanel.getController().loadStoreData();
                    me.loadEntityPermissionStores();
                },
                failure: function() {
                    Ext.toast(viewModel.
                      get('i18n.couldNotLoadApplicationDataMsg'));
                }
            });
        } else {
            var layerTab = me.getView().down('shogun-application-layer');
            var layerTreePanel = layerTab.down('shogun-layertree');
            layerTreePanel.getController().loadStoreData();
            me.loadEntityPermissionStores();
        }
        var generalTab = me.getView().down('shogun-application-general');
        me.getView().setActiveItem(generalTab);
    },

    onSaveClick: function() {
        var me = this;
        var viewport = me.getView().up('viewport');
        var layerTreePanel = me.getView().down('shogun-layertree');
        var layerTreePanelCtrl = layerTreePanel.getController();
        var viewModel = me.getView().lookupViewModel();

        // validate fields in all tabs
        var allFieldsValid = me.validateFields();

        if (allFieldsValid) {

            viewport.setLoading(true);

            layerTreePanelCtrl.syncTreeStore(me.saveApplication, me);

        } else {
            Ext.toast(
              viewModel.get('i18n.saveApplicationProvideAllRequiredFieldsMsg'),
              null, 'b');
        }
    },

    /**
     *
     */
    saveApplication: function() {
        var me = this;
        var viewModel = me.getViewModel();
        var viewport = me.getView().up('viewport');
        var appId = viewModel.get('application.id');
        var action = Ext.isNumber(appId) ? 'update' : 'create';

        Ext.Ajax.request({
            url: BasiGX.util.Url.getWebProjectBaseUrl() +
                    'projectapps/' + action + '.action',
            method: 'POST',
            defaultHeaders: BasiGX.util.CSRF.getHeader(),
            jsonData: me.collectAppData(),
            scope: me,
            callback: function() {
                viewport.setLoading(false);
            },
            success: function(response) {
                var json = JSON.parse(response.responseText);
                var msgTemplate = viewModel.
                  get('i18n.saveApplicationResponseTpl');
                Ext.toast(
                  Ext.String.format(msgTemplate, action, json.name), null, 'b');
                var appList = viewport.down('shogun-applicationlist');
                if (appList) {
                    appList.getStore().load();
                }
                this.redirectTo('applications');
            },
            failure: function(response) {
                var errorPrefix = 'Could not ' + action + ' application:<br>';
                var errorMessage = errorPrefix +
                    'An unknown error occured.';

                if(response.status && response.statusText) {
                    if(response.status === 500) {
                        var json = JSON.parse(response.responseText);
                        errorMessage = errorPrefix + json.message;
                    } else {
                        errorMessage = errorPrefix + 'HTTP-Status: ' +
                        response.statusText + ' (' + response.status + ')';
                    }
                }

                Ext.Msg.alert('Error', errorMessage);
            }
        });

        // update permissions if necessary
        if (action === 'update') {
            var permissionGrids = me.getView().query(
                'shogun-entitypermissions');
            Ext.each(permissionGrids, function(grid) {
                grid.getController().updatePermissions();
            });
        }
    },

    /**
     *
     */
    setAppData: function(applicationRecord) {
        var me = this;
        var generalTab = me.getView().down('shogun-application-general');
        var startViewTab = me.getView().down('shogun-application-start-view');
        var layerTab = me.getView().down('shogun-application-layer');
        var layerTreePanel = layerTab.down('shogun-layertree');
        var generalTabViewModel = generalTab.getViewModel();
        var startViewTabViewModel = startViewTab.getViewModel();
        var appData = applicationRecord.getData();

        generalTabViewModel.set('appData', {
            name: appData.name,
            description: appData.description,
            language: appData.language,
            isPublic: appData.open,
            isActive: appData.active
        });

        startViewTabViewModel.set('appData', {
            mapProjection: 'EPSG:3857',
            mapCenter: {
                x: 1095801,
                y: 6726458
            },
            mapZoom: 5
        });

        layerTreePanel.setTreeConfigId(appData.layerTree.id);
        layerTreePanel.getController().loadStoreData();
        me.loadEntityPermissionStores();
    },

    /**
     *
     */
    loadEntityPermissionStores: function() {
        var permissionTab = this.getView().down(
            'shogun-application-permission');
        var grids = permissionTab.query('shogun-entitypermissions');
        Ext.each(grids, function(grid) {
            grid.getController().loadStore();
        });
    },

    /**
     *
     */
    collectAppData: function() {
        var me = this;
        var layerTab = me.getView().down('shogun-application-layer');
        var layerTreePanel = layerTab.down('shogun-layertree');
        var viewModel = me.getViewModel();
        var application = viewModel.get('application');
        var startView = viewModel.get('startview.values');

        var appData = {
            id: application.get('id') || null,
            name: application.get('name'),
            description: application.get('description'),
            language: application.get('language'),
            isPublic: application.get('open'),
            isActive: application.get('active'),
            activeTools: application.get('activeTools'),
            projection: startView.projection,
            center: {
                x: startView.center.x,
                y: startView.center.y
            },
            zoom: startView.zoom,
            layerTree: layerTreePanel.getTreeConfigId()
        };

        return appData;
    },

    /**
     *
     */
    onCancelClick: function() {
        var me = this;

        Ext.Msg.confirm(
            'Please confirm',
            'All unsaved changes will be lost. Do you really want to quit?',
            function(choice) {
                if (choice === 'yes') {
                    this.redirectTo('applications');
                } else {
                    return false;
                }
            }, me
        );
    },

    /**
     *
     */
    validateFields: function() {
        var view = this.getView();
        var valid = true;
        Ext.each(view.query('field'), function(field) {
            if(!field.validate()){
                valid = false;

                // set active tab where validation failed
                var invalidPanel =
                    field.up('panel[xtype^=shogun\-application\-]');
                invalidPanel.up().setActiveTab(invalidPanel);

                return false; // -> break Ext.each
            }
        });
        return valid;
    }

});
