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
        unbind: function(){
            this.$trigger.off('change.toggler, click.toggler');
        },
        destroy: function(){
            this.$trigger.removeData('toggler');
            this.unbind();
        },
        toggle: function(e) {
            return (this.targetIsVisible() ? this.hide() : this.show());
        },
        show: function(){
            var opts = {
                    method: this.opts.methodIn,
                    speed: this.opts.speedIn,
                    beforeCallback: this.opts.beforeInCallback,
                    afterCallback: this.opts.afterInCallback,
                    classToRemove: this.opts.targetOutClass,
                    classToAdd: this.opts.targetInClass
                };
            this.__transition(this.$target, opts);
        },
        hide: function(){
            var opts = {
                    method: this.opts.methodOut,
                    speed: this.opts.speedOut,
                    beforeCallback: this.opts.beforeOutCallback,
                    afterCallback: this.opts.afterOutCallback,
                    classToRemove: this.opts.targetInClass,
                    classToAdd: this.opts.targetOutClass
                };

            this.__transition(this.$target, opts);
        },
        __transition: function($el, opts){
            var _self = this,
                animClass = this.opts.targetAnimatingClass,
                triggerClass = this.opts.triggerTargetInClass;

            if ($.isFunction(opts.beforeCallback)){
                opts.beforeCallback();
            }

            $el.removeClass(opts.classToRemove).addClass(animClass);

            $el.stop()[opts.method](opts.speed, function(){
                var triggerMethod;

                //stopped animating, now in or out
                $el.removeClass(animClass).addClass(opts.classToAdd);

                //toggle the class on the trigger
                triggerMethod = _self.targetIsVisible ? 'addClass' : 'removeClass';
                _self.$trigger[triggerMethod](triggerClass);

                if ($.isFunction(opts.afterCallback)){
                    opts.afterCallback();
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
