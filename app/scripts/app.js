//var $ = require('jquery');

var LMI = {
    common: {
        init: function() {


        }
    }
};

var LMIModules = {
    fire: function(func, funcname, args) {

        var ns = LMI;

        funcname = (funcname === undefined) ? 'init' : funcname;
        if (func !== '' && ns[func] && typeof ns[func][funcname] === 'function') {
            ns[func][funcname](args);
        }
    },

    loadEvents: function() {
        //fire common functions first
        LMIModules.fire('common');

        //find modules to load based on data attributes
        var moduleTrigger = $('[data-module]');

        if (moduleTrigger.length) {

            var moduleNames = [];
            var modules = [];

            //find the names of each trigger
            moduleTrigger.each(function() {
                moduleNames.push($(this).data("module"));
            });

            //sort out duplicates
            for (var i = 0; i < moduleNames.length; i++) {
                if (($.inArray(moduleNames[i], modules)) === -1) {
                    modules.push(moduleNames[i]);
                }
            }

            //load function based on data attribute value as names
            $.each(modules, function(i, classnm) {
                LMIModules.fire(classnm);
            });
        }
    }
};

$(document).ready(LMIModules.loadEvents);
