/* global define, jQuery */
/**
 * A simple jQuery Plugin template that can optionally be loaded as an AMD module
 * 
 * @author  Tom Davies - Erskine Design
 * @version  0.1.0
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jQuery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    // // Example private function for debugging etc.
    // function private( $obj ) {
    //     if ( window.console && window.console.log ) {
    //         window.console.log( 'size of obj: ' + $obj.size() );
    //     }
    // };

    // // Example private config/settings object
    // var privateOpts = {
    //     key: 'value',
    //     bool: true
    // };

    var PluginName = function(el, opts) {
            this.$el = $(el);
            this.opts = opts;
            this.init();
        };

    PluginName.prototype = {
        constructor: PluginName,
        init: function() {
            // setup etc.
            this.addListeners();
        },

        addListeners: function() {
            // bind events
            this.$element.on('click', this.listenerAction);
        },

        listenerAction: function(e) {
            // one method per discrete action
            e.preventDefault();
            console.log('look Ma! I made a jQuery plugin!')
        }
    };

    $.fn.pluginName = function(option) {
        var opts = $.fn.pluginName.defaults;

        if (typeof option === 'object' && option) {
            opts = $.extend( {}, opts, option );
        }
        return this.each(function() {
            var $this = $(this),
            // don't call again if already initialised on this object
            data = $this.data('pluginName');
            if(!data){
                $this.data('pluginName', data = new PluginName(this, opts));
            }
            // allow the calling of plugin methods on an instance by name, eg: $item.pluginName('show')
            if (typeof option === 'string') {
                data[option]();
            }
        });
    };

    $.fn.pluginName.defaults = {};

    $(function() {
        // automatically bind to DOM elements on ready
        $('.someClass').pluginName();
    });

    $(document).on('click', '[data-plugin-name]', function(){
        $(this).pluginName();
    });
}));
