Ext.define('SHOGun.admin.view.panel.layer.General',{
    extend: 'Ext.panel.Panel',

    xtype: 'shogun-layer-general',

    requires: [
        'Ext.form.FieldContainer',

        'SHOGun.admin.view.panel.layer.GeneralController',

        'SHOGun.admin.view.form.SubmitForm',
        'SHOGun.admin.store.Epsg',
        'SHOGun.admin.util.TextfieldValidator'
    ],

    controller: 'shogun-layer-general',

    routeId: 'general',

    bind: {
        title: '{i18n.general.generalTitle}'
    },

    scrollable: 'y',

    padding: 20,

    items: [{
        xtype: 'fieldset',
        bind: {
            title: '{i18n.general.generalTitle}'
        },
        layout: 'column',
        scrollable: 'y',
        items: [{
            xtype: 'fieldcontainer',
            columnWidth: 0.5,
            items: [{
                xtype: 'textfield',
                bind: {
                    fieldLabel: '{i18n.general.layerName}',
                    value: '{layer.name}',
                    emptyText: '{i18n.general.layerNameEmptyText}'
                },
                msgTarget: 'under',
                validator: SHOGun.admin.util.TextfieldValidator.
                    checkForWhiteSpaces,
                allowBlank: false,
                name: 'layerName',
                width: '100%'
            }, {
                xtype: 'shogun-form-submitform',
                url: BasiGX.util.Url.getWebProjectBaseUrl() +
                        'import/create-layer.action',
                // set to hidden:true initially to avoid ugly blinking onRender
//                hidden: true,
                // show for createLayer only
                bind: {
                    hidden: '{!isNewLayer}'
                },
                items: [{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    width: '100%',
                    items: [{
                        xtype: 'fileuploadfield',
                        flex: 1,
                        bind: {
                            fieldLabel: '{i18n.general.fileUploadFieldLabel}',
                            emptyText: '{i18n.general.fileUploadEmptyText}',
                            buttonText: '{i18n.general.fileSelectBtnText}'
                        },
                        setButtonText: function(value) {
                            // needed since it isn't bindable
                            this.button.setText(value);
                        },
                        name: 'file',
                        allowBlank: false,
                        required: true,
                        listeners: {
                            change: 'onFileUploadFieldChanged'
                        }
                    }, {
                        xtype: 'button',
                        bind: {
                            text: '{i18n.general.fileUploadButtonText}'
                        },
                        formBind: true,
                        margin: '0 0 0 5px',
                        handler: 'uploadButtonPressed'
                    }]
                }, {
                    xtype: 'fieldset',
                    name: 'upload-file-infos',
                    bind: {
                        hidden: '{!upload.fileName}',
                        title: '{upload.fileName}'
                    }
                }, {
                    xtype: 'hiddenfield',
                    name: 'dataType',
                    bind: {
                        value: '{upload.dataType}'
                    }
                }, {
                    xtype: 'hiddenfield',
                    name: 'fileProjection',
                    value: ''
                }]
            }, {
                xtype: 'textarea',
                width: '100%',
                name: 'layerDescription',
                bind: {
                    fieldLabel: '{i18n.general.layerDescription}',
                    value: '{layer.description}',
                    hidden: true //'{isNewLayer}'
                }
            },{
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [{
                    xtype: 'slider',
                    width: 400,
                    minValue: 0,
                    maxValue: 1,
                    increment: 0.01,
                    decimalPrecision: 2,
                    submitValue: false,
                    bind:{
                        fieldLabel: '{i18n.general.layerOpacity}',
                        value: '{layer.appearance.opacity}',
                        hidden: '{isNewLayer}'
                    },
                    margin: '0 10px 0 0'
                }, {
                    xtype: 'numberfield',
                    hideTrigger: true,
                    width: 60,
                    minValue: 0,
                    maxValue: 1,
                    name: 'layerOpacity',
                    bind:{
                        value: '{layer.appearance.opacity}',
                        hidden: '{isNewLayer}'
                    }
                }]
            }, {
                xtype: 'fieldcontainer',
                layout: {
                    type: 'hbox',
                    align: 'stretchmax'
                },
                bind: {
                    hidden: '{!isHoverable}'
                },
                items: [{
                    xtype: 'textfield',
                    width: 400,
                    name: 'layerHoverTemplate',
                    margin: '0 5px 0 0',
                    flex: 1,
                    bind: {
                        fieldLabel: '{i18n.general.hoverTemplate}',
                        value: '{layer.appearance.hoverTemplate}'
                    }
                }, {
                    xtype: 'button',
                    bind: {
                        text: '{i18n.general.availableAttributes}'
                    },
                    handler: 'onAttributesButtonClicked'
                }]
            }]
        },{
            xtype: 'container',
            columnWidth: 0.5
        }]
    }]
});
