Ext.define('SHOGun.admin.view.panel.style.Rules', {
    extend: 'Ext.panel.Panel',
    xtype: 'shogun-panel-style-rules',

    requires: [
        'SHOGun.admin.util.Sld',
        'SHOGun.admin.view.panel.style.Rule',
        'SHOGun.admin.view.panel.style.RulesController',
        'SHOGun.admin.view.panel.style.RulesModel'
    ],

    controller: 'panel.style.rules',
    viewModel: {
        type: 'panel.style.rules'
    },

    bodyStyle: {
        background: '#f6f6f6'
    },

    config: {
        sld: null
    },

    sldObj: null,

    numberOfRules: null,

    items: [{
        xtype: 'container',
        layout: {
            type: 'vbox',
            align: 'middle'
        },
        items: [{
            xtype: 'button',
            bind: {
                text: '{addRuleButtonText}',
                iconCls: '{addRuleButtonIconCls}'
            },
            handler: 'addRule'
        }]
    }],

    initComponent: function() {
        var me = this;
        me.callParent();
        this.sldObj = SHOGun.admin.util.Sld.toSldObject(this.getSld());

        if (this.sldObj) {
            // TODO: If the sldObj contains multiple sld:UserStyle elements,
            // only the first one will be returned by rulesFromSldObject()
            this.rules = SHOGun.admin.util.Sld.rulesFromSldObject(this.sldObj);
            if (this.rules) {
                me.initRuleComponents();
            } else {
                me.setDisabled(true);
            }
        } else {
            me.setDisabled(true);
        }
    },

    initRuleComponents: function() {
        var me = this;
        var rules = me.rules;
        Ext.each(rules, function(rule) {
            rule.id = Ext.id();
            me.add({
                xtype: 'shogun-panel-style-rule',
                margin: 10,
                rule: rule,
                listeners: {
                    rulechanged: 'onRuleChanged'
                }
            });
        });
    }
});
