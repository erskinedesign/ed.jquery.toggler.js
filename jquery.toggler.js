/* global define, jQuery */
/**
 * A simple jQuery Plugin for toggling the visibility of elements
 * 
 * @author  Tom Davies - Erskine Design
 * @version  0.5.1
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var Toggler = function(el, opts) {
        var $trigger = this.$trigger = $(el);
        this.opts = opts;

        this.targetSel = $trigger.attr('href') || $trigger.attr('data-target');
        this.$target = $(this.targetSel);

        this.init();
    };

    Toggler.prototype = {
        constructor: Toggler,
        init: function() {
            this.bind();
        },
        bind: function() {
            var _self = this;
            this.$trigger.off('change.toggler click.toggler');
            this.$trigger.on('change.toggler', function(e){
                _self.toggle();
            });
            if (this.$trigger.not('input[type=radio], input[type=checkbox], input[type=submit], select')){
                this.$trigger.on('click.toggler', function(e){
                    e.preventDefault();
                    _self.toggle();
                });
            }
        },

        toggle: function(e) {
            return (this.targetIsVisible() ? this.hide() : this.show());
        },
        show: function(){
            var method = this.opts.methodIn,
                speed  = this.opts.speedIn,
                callback = this.opts.inCallback,
                inClass = this.opts.targetInClass,
                outClass = this.opts.targetOutClass;

            this.__transition(method, speed, callback, inClass, outClass);
        },
        hide: function(){
            var method = this.opts.methodOut,
                speed  = this.opts.speedOut,
                callback = this.opts.outCallback,
                inClass = this.opts.targetInClass,
                outClass = this.opts.targetOutClass;

            this.__transition(method, speed, callback, outClass, inClass);
        },
        __transition: function(method, speed, callback, classToAdd, classToRemove){
            var _self = this,
                animClass = this.opts.targetAnimatingClass,
                triggerClass = this.opts.triggerTargetInClass;

            this.$target.removeClass(classToRemove).addClass(animClass);

            this.$target.stop()[method](speed, function(){
                var triggerMethod;

                //stopped animating, now in or out
                _self.$target.removeClass(animClass).addClass(classToAdd);

                //toggle the class on the trigger
                triggerMethod = _self.targetIsVisible ? 'addClass' : 'removeClass';
                _self.$trigger[triggerMethod](triggerClass);

                if ($.isFunction(callback)){
                    callback();
                }

            });
        },
        targetIsVisible: function(){
            return this.$target.is(':visible');
        }
    };

    $.fn.toggler = function(option) {
        var opts;

        if (typeof option === 'object' && option) {
            opts = $.extend(true, {}, $.fn.toggler.defaults, option);
        } else {
            opts = $.fn.toggler.defaults;
        }
        return this.each(function() {
            var $this = $(this),
            // don't call again if already initialised on this object
            data = $this.data('toggler');
            if(!data){
                $this.data('toggler', data = new Toggler(this, opts));
            }
            // allow the calling of plugin methods on an instance by name, eg: $item.toggler('show')
            if (typeof option === 'string') {
                data[option]();
            }
        });
    };

    $.fn.toggler.defaults = {
        methodIn: 'slideDown',
        speedIn: 200,
        methodOut: 'slideUp',
        speedOut: 200,
        targetInClass: 'toggler--in',
        targetOutClass: 'toggler--out',
        targetAnimatingClass: 'toggler--animating',
        triggerTargetInClass: 'toggler--target-in'
    };
    $(document).on('change.toggler', '[data-toggle]', function(){
        if(!$(this).data('toggler')){
            $(this).toggler('toggle');
        }
    });

    $(document).on('click.toggler', '[data-toggle]', function(e){
        if(!$(this).data('toggler')){
            e.preventDefault();
            $(this).toggler('toggle');
        }
    });
}));
