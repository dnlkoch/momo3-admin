Ext.define('SHOGun.admin.view.panel.application.StartView', {
    extend: 'Ext.form.Panel',

    xtype: 'shogun-application-start-view',

    requires: [
        'SHOGun.admin.view.panel.application.StartViewController',
        'Ext.form.field.ComboBox',

        'GeoExt.component.Map'
    ],

    controller: 'shogun-application-start-view',

    routeId: 'start-view',

    bind: {
        title: '{i18n.startview.title}'
    },

    padding: 20,

    layout: 'fit',

    items: [{
        xtype: 'fieldset',
        bind: {
            title: '{i18n.startview.title}'
        },
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        defaults: {
            width: '100%'
        },
        items: [{
            xtype: 'container',
            layout: 'hbox',
            defaults: {
                xtype: 'fieldset',
                flex: 1,
                margin: '0 5 0 5',
                collapsible: true,
                collapsed: true,
                border: false,
                layout: 'column',
                defaults: {
                    xtype: 'numberfield',
                    padding: '0 5 5 5',
                    columnWidth: 1/2,
                    labelAlign: 'top',
                    step: 1,
                    allowBlank: false,
                    allowDecimals: true,
                    decimalPrecision: 4,
                    listeners: {
                        change: 'onFormFieldChange'
                    }
                }
            },
            items: [{
                hidden: true,
                bind: {
                    title: '{i18n.startview.projectionTitle}'
                },
                items: [{
                    xtype: 'combo',
                    name: 'mapProjection',
                    store: 'MapProjection',
                    allowBlank: false,
                    displayField: 'name',
                    valueField: 'code',
                    hidden: true,
                    forceSelection: true,
                    editable: false,
                    columnWidth: 1,
                    queryMode: 'local',
                    bind: {
                        fieldLabel: '{i18n.startview.projectionTitle}',
                        value: '{startview.values.projection}'
                    },
                    listeners: {
                        select: 'onMapProjectionSelect'
                    }
                }]
            }, {
                bind: {
                    title: '{i18n.startview.mapCenterTitle}'
                },
                items: [{
                    name: 'mapCenterX',
                    xtype: 'numberfield',
                    bind: {
                        fieldLabel: '{i18n.startview.mapCenterXLabel}',
                        value: '{startview.values.center.x}'
                    }
                }, {
                    name: 'mapCenterY',
                    bind: {
                        fieldLabel: '{i18n.startview.mapCenterYLabel}',
                        value: '{startview.values.center.y}'
                    }
                }]
            }, {
                bind: {
                    title: '{i18n.startview.mapZoomTitle}'
                },
                items: [{
                    columnWidth: 1/3,
                    step: 1,
                    minValue: 0,
                    name: 'mapZoom',
                    bind: {
                        fieldLabel: '{i18n.startview.mapZoomLabel}',
                        value: '{startview.values.zoom}'
                    }
                }
//                {
//                    columnWidth: 1/3,
//                    step: 1,
//                    minValue: 0,
//                    name: 'mapZoomMax',
//                    bind: {
//                        fieldLabel: '{startview.mapZoomMaxLabel}',
//                        value: '{startview.mapZoomMax}'
//                    }
//                }, {
//                    columnWidth: 1/3,
//                    step: 1,
//                    minValue: 0,
//                    name: 'mapZoomMin',
//                    bind: {
//                        fieldLabel: '{startview.mapZoomMinLabel}',
//                        value: '{startview.mapZoomMin}'
//                    }
//                }
                ]
            }, {
                bind: {
                    title: '{i18n.startview.mapExtentTitle}'
                },
                items: [{
                    readOnly: true,
                    bind: {
                        fieldLabel: '{i18n.startview.mapExtentMinXLabel}',
                        value: '{startview.mapExtent.minX}'
                    }
                }, {
                    readOnly: true,
                    bind: {
                        fieldLabel: '{i18n.startview.mapExtentMinYLabel}',
                        value: '{startview.mapExtent.minY}'
                    }
                }, {
                    readOnly: true,
                    bind: {
                        fieldLabel: '{i18n.startview.mapExtentMaxXLabel}',
                        value: '{startview.mapExtent.maxX}'
                    }
                }, {
                    readOnly: true,
                    bind: {
                        fieldLabel: '{i18n.startview.mapExtentMaxYLabel}',
                        value: '{startview.mapExtent.maxY}'
                    }
                }]
            }]
        }, {
            xtype: 'gx_map',
            flex: 1,
            listeners: {
                render: 'renderMap',
                boxready: 'addMapCrossHair'
            }
        }]
    }]

});
