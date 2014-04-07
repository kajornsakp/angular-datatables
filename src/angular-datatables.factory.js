(function(angular) {
    'use strict';
    angular.module('datatables.factory', []).
    constant('DT_OPTION_KEYS', {
        ajaxSource: 'sAjaxSource',
        ajaxDataProp: 'sAjaxDataProp',
        fnServerData: 'fnServerData'
    }).
    factory('DTOptionsBuilder', function(DT_OPTION_KEYS) {
        var DTOptions = function(sAjaxSource) {
            if (angular.isString(sAjaxSource)) {
                this[DT_OPTION_KEYS.ajaxSource] = sAjaxSource;
            }
            
            this.addOption = function(key, value) {
                if (angular.isString(key)) {
                    this[key] = value;
                }
                return this;
            };
            this.addSource = function(sAjaxSource) {
                this.addOption(DT_OPTION_KEYS.ajaxSource, sAjaxSource);
                return this;
            };
            this.addDataProp = function(dataProp) {
                this.addOption(DT_OPTION_KEYS.ajaxDataProp, dataProp);
                return this;
            };
            this.addFnServerData = function(fn) {
                if (!angular.isFunction(fn)) {
                    throw new Error('The parameter must be a function');
                }
                this.addOption(DT_OPTION_KEYS.fnServerData, fn);
                return this;
            };
        };
        
        return {
            newOptions: function() {
                return new DTOptions();
            },
            fromSource: function(sAjaxSource) {
                return new DTOptions(sAjaxSource);
            }
        };
    }).
    factory('DTColumnBuilder', function() {
        var DTColumn = function(mData) {
            this.label = '';
            this.mData = mData;
            this.sClass = '';
            this.bVisible = true;
            this.withLabel = function(label) {
                this.label = label;
                return this;
            };
            this.withClass = function(sClass) {
                this.sClass = sClass;
                return this;
            };
            this.setVisible = function(bVisible) {
                this.bVisible = bVisible;
                return this;
            };
        };
        
        return {
            newColumn: function(mData) {
                return new DTColumn(mData);
            }
        };
    });
})(angular);