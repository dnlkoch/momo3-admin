Ext.define('SHOGun.admin.view.panel.application.ToolsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.shogun-application-tools',

    requires: [
        'SHOGun.admin.store.Tools',
        'SHOGun.admin.view.button.ToolToggle'
    ],

    createToolButtons: function(store, recs) {
        var view = this;
        var viewModel = view.lookupViewModel();
        var application = viewModel.get('application');
        var fieldset = view.down('fieldset');
        Ext.each(recs, function(rec) {
            if(rec.data.properties.ui === 'shogun-tools') {
                var btn = {
                    xtype: "shogun-button-tooltoggle",
                    cls: 'shogun-tool-selection',
                    glyph: rec.get('glyph'),
                    tooltip: rec.get('name'),
                    toolId: rec.get('id')
                };
                if(!application.get('id')){
                    if(!Ext.Array.contains(
                            application.data.activeTools, rec.get('id'))){
                        application.data.activeTools.push(rec.get('id'));
                    }
                }
                if(Ext.Array.contains(
                        application.data.activeTools, rec.get('id'))) {
                    btn.pressed = true;
                }
                fieldset.add(btn);
            }
        });
    }

});
