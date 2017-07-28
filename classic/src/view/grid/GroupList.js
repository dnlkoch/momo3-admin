Ext.define('SHOGun.admin.view.grid.GroupList',{
    extend: 'Ext.grid.Panel',

    xtype: 'shogun-grouplist',

    requires: [
        'SHOGun.admin.view.grid.GroupListController',
        'SHOGun.admin.view.grid.GroupListModel',

        'SHOGun.admin.store.Groups'
    ],

    controller: 'shogun-grouplist',

    viewModel: {
        type: 'shogun-grouplist'
    },

    store: {
        type: 'groups',
        sorters: [{
            property: 'name',
            direction: 'ASC'
        }],
        // filter out the admin user group, as it may not be edited
        filters: [
            function(item) {
                return item.get('name') !== "Admin User Group";
            }
        ]
    },

    bind: {
        title: '{i18n.groupGridTitle}'
    },

    collapseMode: 'header',

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
            tooltip: '{i18n.groupGridRefresh}'
        },
        callback: 'loadStore'
    }],

    columns: [{
        xtype: 'templatecolumn',
        flex: 10,
        tpl: '<div data-qtip="{name}">{name}</div>'
    },{
        xtype: 'gridcolumn',
        width: 40,
        align: "center",
        renderer: function() {
            return '<i class="fa fa-plus fa-2x" data-qtip="' +
                this.getViewModel().get('i18n').groupAddUserBtnText + '">';
        }
    },{
        xtype: 'gridcolumn',
        width: 40,
        align: "center",
        renderer: function() {
            return '<i class="fa fa-gear fa-2x" data-qtip="' +
                this.getViewModel().get('i18n').groupSettings + '">';
        }
    }],

    tbar: [{
        xtype: 'button',
        bind: {
            text: '{i18n.groupGridCreateGroup}'
        },
        scale: 'large',
        ui: 'shogun',
        iconCls: 'fa fa-plus fa-2x',
        handler: 'onCreateClick'
    }, {
        xtype: 'button',
        bind: {
            text: '{i18n.groupGridDeleteGroup}'
        },
        scale: 'large',
        ui: 'shogun',
        iconCls: 'fa fa-minus fa-2x',
        handler: 'onDeleteClick'
    }, '->', {
        xtype: 'textfield',
        bind: {
            fieldLabel: '{i18n.groupGridFilterByName}'
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

    initComponent: function(){
        this.callParent(arguments);
        this.getView().on('cellclick', 'handleCellClick');
        this.getView().on('render', 'loadStore');
    }

});
