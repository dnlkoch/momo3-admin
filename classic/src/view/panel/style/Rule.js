Ext.define('SHOGun.admin.view.panel.style.Rule', {
    extend: 'Ext.panel.Panel',
    xtype: 'shogun-panel-style-rule',

    requires: [
        'SHOGun.admin.util.Sld',
        'SHOGun.admin.view.panel.style.RuleController',
        'SHOGun.admin.view.panel.style.RuleModel',

        'SHOGun.admin.view.panel.style.Filter',
        'SHOGun.admin.view.panel.style.Symbolizer'
    ],

    controller: 'panel.style.rule',
    viewModel: {
        type: 'panel.style.rule'
    },

    config: {
        rule: null
    },

    bodyStyle: {
        background: '#f6f6f6'
    },

    filter: null,

    symbolizer: null,

    layout: 'fit',

    initComponent: function() {
        var me = this;
        me.callParent();
        if(this.rule){
            this.filter = this.rule.filter;
            this.symbolizer = this.rule.symbolizer;
            this.getViewModel().set({
                rule: this.rule
            });
        }
        me.initBaseFieldset();
        me.initFilterSymbolizerComponents();
    },

    initBaseFieldset: function() {
        this.add({
            xtype: 'fieldset',
            title: this.getViewModel().get('titlePrefix'),
            bind: {
                title: '{titlePrefix} {fieldsetTitle}'
            },
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                defaultType: 'textfield',
                items: [{
                    // setting a default value to have validation returning true
                    // when panel has not been shown and user saves layer.
                    // if not done, field would be invalid as e.g. viemodel may
                    // not be ready
                    value: 'new Rule',
                    bind: {
                        value: '{rule.name}',
                        fieldLabel: '{ruleNameText}'
                    },
                    allowBlank: false,
                    margin: '0 10px 0 0',
                    flex: 1,
                    listeners: {
                        change: function(){
                            var view = this.up('shogun-panel-style-rule');
                            view.fireEvent('rulechanged', view.rule);
                        }
                    }
                }, {
                    bind: {
                        value: '{rule.title}',
                        fieldLabel: '{ruleTitleText}'
                    },
                    margin: '0 10px 0 0',
                    flex: 1,
                    listeners: {
                        change: function(){
                            var view = this.up('shogun-panel-style-rule');
                            view.fireEvent('rulechanged', view.rule);
                        }
                    }
                }, {
                    xtype: 'button',
                    bind: {
                        text: '{removeRuleButtonText}',
                        iconCls: '{removeRuleButtonIconCls}'
                    },
                    handler: 'removeRule'
                }]
            }]
        });
    },

    initFilterSymbolizerComponents: function() {
        this.down('fieldset').add({
            xtype: 'container',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            margin: '10px 0 0 0',
            items: [{
                xtype: 'shogun-panel-style-symbolizer',
                symbolizer: this.symbolizer,
                flex: 1,
                listeners: {
                    symbolizerschanged: 'onSymbolizersChanged'
                }
            },{
                xtype: 'shogun-panel-style-filter',
                filter: this.filter,
                flex: 1,
                margin: '0 10px 0 0',
                listeners: {
                    filterchanged: 'onFilterChanged'
                }
            }]
        });
    }

});
