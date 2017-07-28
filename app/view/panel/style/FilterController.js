Ext.define('SHOGun.admin.view.panel.style.FilterController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.panel.style.filter',

    requires: [
        'SHOGun.admin.util.Sld'
    ],

    onBoxReady: function() {
        this.setFilterComponents();
        this.applyListeners();
    },

    applyListeners: function(){
        var view = this.getView();
        var fields = view.query('field');

        Ext.each(fields, function(field){
            field.on('change', function(){
                var values = {};
                Ext.each(fields, function(f){
                    if(f.name !== "useFilterCheckbox"){
                        values[f.name] = f.getValue();
                    }
                });
                view.filter = SHOGun.admin.util.Sld
                        .filterValuesToSldFilter(values);
                view.fireEvent('filterchanged', view.filter);
            });
        });
    },

    attributeComboBoxReady: function(combo){
        var styler = combo.up('shogun-panel-style-styler');
        var store = combo.getStore();
        var proxy = store.getProxy();
        var layerUrl = styler.getLayerUrl();
        var layerName = styler.getLayerName();

        var queryParams = {
            service: 'WFS',
            request: 'DescribeFeatureType',
            version: '1.1.0',
            typeName: layerName
        };

        var url = Ext.String.format('{0}?{1}', layerUrl,
                Ext.Object.toQueryString(queryParams));

        proxy.setUrl(url);
        store.load();
    },

    setFilterComponents: function() {
        var me = this;
        var filter = me.getView().getFilter();
        var sldUtil = SHOGun.admin.util.Sld;

        if(filter){
            if (sldUtil.isComparisonFilter(filter)) {
                this.addComparisonFilter(filter);
            } else if (sldUtil.isSpatialFilter(filter)) {
                this.addSpatialFilter(filter);
            } else if (sldUtil.isLogicalFilter(filter)) {
                this.addLogicalFilter(filter);
            }
        }
    },

    addComparisonFilter: function(filter) {
        var me = this;
        var view = me.getView();
        var combo = view.down('combo[name="operatorCombo"]');
        var fieldset = view.down('fieldset[name="comparison-fieldset"]');

        // If we load a filter from an SLD we have to fill up the value fields
        if(filter){
            var operator = filter.comparisonOps.name.localPart;
            combo.setValue(operator);
            fieldset.expand();
        }
    },

    operatorComboChanged: function(combo, newValue){
        var view = this.getView();
        var viewModel = this.getViewModel();
        var filter = view.filter;
        var attributeCombo = view.down(
                'combobox[name="attributeCombo"]');
        var literalNumberField1 = view.down(
                'numberfield[name="literalNumberField1"]');
        var literalNumberField2 = view.down(
                'numberfield[name="literalNumberField2"]');
        var literalTextField = view.down('textfield[name="literalTextField"]');
        var literalValues;

        switch(newValue) {
            case "PropertyIsEqualTo":
                if(filter){
                    literalValues = SHOGun.admin.util.Sld
                            .getLiteralValuesFromFilter(filter);
                    if(literalValues){
                        literalTextField.setValue(literalValues[0]);
                    }
                }
                literalNumberField1.hide();
                literalNumberField2.hide();
                literalTextField.show();
                break;
            case "PropertyIsNotEqualTo":
                if(filter){
                    literalValues = SHOGun.admin.util.Sld
                            .getLiteralValuesFromFilter(filter);
                    if(literalValues){
                        literalTextField.setValue(literalValues[0]);
                    }
                }
                literalNumberField1.hide();
                literalNumberField2.hide();
                literalTextField.show();
                break;
            case "PropertyIsLike":
                if(filter){
                    literalValues = SHOGun.admin.util.Sld
                            .getLiteralValuesFromFilter(filter);
                    if(literalValues){
                        literalTextField.setValue(literalValues[0]);
                    }
                }
                literalNumberField1.hide();
                literalNumberField2.hide();
                literalTextField.show();
                break;
            case "PropertyIsNull":
                literalNumberField1.hide();
                literalNumberField2.hide();
                literalTextField.hide();
                break;
            case "PropertyIsBetween":
                if(filter){
                    literalValues = SHOGun.admin.util.Sld
                            .getLiteralValuesFromFilter(filter);
                    if(literalValues && Ext.isNumeric(literalValues[0]) &&
                            Ext.isNumeric(literalValues[1])){
                        literalNumberField1.setValue(literalValues[0]);
                        literalNumberField2.setValue(literalValues[1]);
                    }
                }
                literalNumberField1.show();
                literalNumberField2.show();
                literalTextField.hide();
                viewModel.set('literalNumberField2Label', 'Upper boundary');
                break;
            case "PropertyIsLessThan":
            case "PropertyIsLessThanOrEqualTo":
            case "PropertyIsGreaterThan":
            case "PropertyIsGreaterThanOrEqualTo":
                if(filter){
                    literalValues = SHOGun.admin.util.Sld
                            .getLiteralValuesFromFilter(filter);

                    if(literalValues && Ext.isNumeric(literalValues[0])){
                        literalNumberField2.setValue(literalValues[0]);
                    }
                }
                literalNumberField2.show();
                literalNumberField1.hide();
                literalTextField.hide();
                viewModel.set('literalNumberField2Label', 'Value');
                break;
            default:
                break;
        }

        if(filter){
            var propertyName = SHOGun.admin.util.Sld
                    .getPropertyNameFromFilter(filter);
            attributeCombo.setValue(propertyName);
        }
    },

    addSpatialFilter: function(filter) {
        return filter;
    },

    addLogicalFilter: function(filter) {
        return filter;
    }

});
