Ext.define('SHOGun.admin.view.grid.UserList',{
    extend: 'Ext.grid.Panel',

    xtype: 'shogun-userlist',

    requires: [
        'SHOGun.admin.view.grid.UserListController',
        'SHOGun.admin.view.grid.UserListModel',

        'SHOGun.admin.store.Users'
    ],

    controller: 'shogun-userlist',

    viewModel: {
        type: 'shogun-userlist'
    },

    store: {
        type: 'users',
        sorters: [{
            property: 'lastName',
            direction: 'ASC'
        }]
    },

    bind: {
        title: '{title}'
    },

    hideHeaders: false,

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
        tooltip: 'Refresh',
        callback: 'loadStore'
    }],

    columns: [{
        xtype: 'templatecolumn',
        width: 50,
        tpl: '<img height="24" src="{profileImage}"></img>'
    }, {
        xtype: 'templatecolumn',
        width: 40,
        tpl: '<div class="x-btn-icon-el-default-toolbar-small ' +
            'trans-{language}" style="margin-top: 8px;"> </div>'
    }, {
        xtype: 'templatecolumn',
        flex: 10,
        bind: {
            text: '{i18n.userlistFirstNameLabel}/{i18n.userlistLastNameLabel}'
        },
        tpl: '<div data-qtip="{fullName}">{fullName}</div>'
    }, {
        xtype: 'templatecolumn',
        flex: 10,
        bind: {
            text: '{i18n.userlistEmailLabel}'
        },
        tpl: '<div data-qtip="{fullName}">{email}</div>'
    }, {
        xtype: 'templatecolumn',
        flex: 10,
        bind: {
            text: '{i18n.userlistDepartmentLabel}'
        },
        tpl: '<div data-qtip="{fullName}">{department}</div>'
    }, {
        xtype: 'templatecolumn',
        flex: 10,
        bind: {
            text: '{i18n.userlistTelephoneLabel}'
        },
        tpl: '<div data-qtip="{fullName}">{telephone}</div>'
    }],

    tbar: [
        {
            xtype: 'button',
            bind: {
                text: '{deleteUser}'
            },
            scale: 'large',
            ui: 'shogun',
            iconCls: 'fa fa-minus fa-2x',
            handler: 'onDeleteClick'
        }, '->', {
            xtype: 'textfield',
            bind: {
                fieldLabel: '{filterByName}'
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
        }
    ],

    initComponent: function() {
        this.callParent(arguments);
        this.getView().on('render', 'loadStore');
    }

});
