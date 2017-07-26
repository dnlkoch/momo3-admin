Ext.define('SHOGun.admin.view.grid.EntityPermissions',{
    extend: 'Ext.grid.Panel',

    xtype: 'shogun-entitypermissions',

    requires: [
        'SHOGun.admin.view.grid.EntityPermissionsController',
        'SHOGun.admin.view.grid.EntityPermissionsModel',
        'SHOGun.admin.store.EntityPermissions'
    ],

    /**
     *
     */
    config: {
        /**
         * the entity we want to handle  -> 'ProjectLayer' or 'ProjectApplication'
         */
        entity: null,

        /**
         * the targetEntity we want to handle -> 'ProjectUser' or 'ProjectUserGroup'
         */
        targetEntity: null,

        /**
         * the id of the entity we want to use
         */
        id: null
    },

    controller: 'shogun-entitypermissions',

    store: {
        type: 'entitypermissions',
        sorters: [{
            property: 'displayTitle',
            direction: 'ASC'
        }],
        // filter out the admin user group, as it may not be edited
        filters: [
            function(item) {
                return item.get('displayTitle') !== "Admin User Group";
            }
        ]
    },

    viewModel: {
        type: 'shogun-entitypermissions'
    },

    columns: [{
        // handle different column names for users / groups
        renderer: function(value, cell, record, dataIndex, index, store, view) {
            var target = view.up().getTargetEntity();
            var grid = view.up();
            if (grid) {
                var columns = grid.getColumns();
                Ext.each(columns, function(column) {
                    if (column.dataIndex === 'displayTitle') {
                        if (target === 'ProjectUser') {
                            column.setText(
                                grid.getViewModel().get('i18n').usersColumnTitle
                            );
                        } else {
                            column.setText(
                                grid.getViewModel().get(
                                    'i18n').groupsColumnTitle
                            );
                        }
                    }
                });
            }
            return value;
        },
        dataIndex: 'displayTitle',
        width: '25%'
    }, {
        xtype: 'checkcolumn',
        // if you remove this line, no column texts will be rendered :-) ???
        text: 'Read',
        bind: {
            text: '{i18n.readPermissionColumnTitle}'
        },
        dataIndex: 'PERMISSION_READ',
        width: '25%'
    }, {
        xtype: 'checkcolumn',
        bind: {
            text: '{i18n.updatePermissionColumnTitle}'
        },
        dataIndex: 'PERMISSION_UPDATE',
        width: '25%'
    }, {
        xtype: 'checkcolumn',
        bind: {
            text: '{i18n.deletePermissionColumnTitle}'
        },
        dataIndex: 'PERMISSION_DELETE',
        width: '24%'
    }]
});
