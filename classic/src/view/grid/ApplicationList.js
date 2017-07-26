Ext.define('SHOGun.admin.view.grid.ApplicationList',{
    extend: 'Ext.grid.Panel',

    xtype: 'shogun-applicationlist',

    requires: [
        'SHOGun.admin.view.grid.ApplicationListController',
        'SHOGun.admin.view.grid.ApplicationListModel',

        'SHOGun.admin.store.Applications'
    ],

    controller: 'shogun-applicationlist',

    viewModel: {
        type: 'shogun-applicationlist'
    },

    store: {
        type: 'applications',
        sorters: [{
            property: 'name',
            direction: 'ASC'
        }]
    },

    bind: {
        title: '{i18n.applicationsTitle}'
    },

    hideHeaders: true,

    selModel: {
        type: 'checkboxmodel',
        checkOnly: true,
        columnSelect: true,
        mode: 'MULTI',
        checkboxSelect: true
    },

    tools: [{
        itemId: 'refresh',
        type: 'refresh',
        bind: {
            tooltip: '{i18n.applicationsRefreshText}'
        },
        callback: 'loadStore'
    }],

    columns: [{
        xtype: 'templatecolumn',
        flex: 10,
        tpl: new Ext.XTemplate(
                '<div data-qtip="{name}">',
                '{name}',
                '<tpl if="active === false">',
                    ' <i class="fa fa-eye-slash"></i>',
                '</tpl>',
                '</div>'
            )
    },{
        xtype: 'gridcolumn',
        flex: 1,
        align: "center",
        renderer: function() {
            return '<i class="fa fa-gear fa-2x" data-qtip="' +
                this.getViewModel().get('i18n').applicationsSettings + '">';
        }
//        bind: {
//            hidden: '{!allowCreateOrEditWebmaps}'
//        }
    },{
        xtype: 'gridcolumn',
        flex: 1,
        align: "center",
        renderer: function() {
            return '<i class="fa fa-eye fa-2x" data-qtip="' +
                this.getViewModel().get('i18n').applicationsPreview + '">';
        }
    }],

    tbar: [{
        xtype: 'button',
        bind: {
            text: '{i18n.applicationsCreateApp}',
            hidden: '{!allowCreateOrEditWebmaps}'
        },
        scale: 'large',
        ui: 'shogun',
        iconCls: 'fa fa-plus fa-2x',
        handler: 'onCreateClick'
    }, {
        xtype: 'button',
        bind: {
            text: '{i18n.applicationsCopyApp}',
            hidden: '{!allowCreateOrEditWebmaps}'
        },
        scale: 'large',
        ui: 'shogun',
        iconCls: 'fa fa-copy fa-2x',
        handler: 'onCopyClick'
    }, {
        xtype: 'button',
        bind: {
            text: '{i18n.applicationsDeleteApp}'
        },
        scale: 'large',
        ui: 'shogun',
        iconCls: 'fa fa-minus fa-2x',
        handler: 'onDeleteClick'
    }, '->', {
        xtype: 'textfield',
        bind: {
            fieldLabel: '{i18n.applicationsFilterByName}'
        },
        labelWidth: undefined,
        triggers: {
            clear: {
                cls: 'x-form-clear-trigger',
                handler: function(){
                    // Will trigger the change listener
                    this.reset();
                }
            }
        },
        listeners: {
            change: 'onFilterChange',
            buffer: 250
        }
    }],

    initComponent: function() {
        var me = this;
        me.callParent(arguments);
        me.getView().on('cellclick', 'handleCellClick');
        me.getView().on('render', 'loadStore');
    }

});
