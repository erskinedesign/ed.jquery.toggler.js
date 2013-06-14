ed.jquery.toggler.js
============================

 A simple jQuery Plugin for toggling the visibility of elements, that can optionally be loaded as an AMD module.

## Why?

Because show me a website that uses jQuery and doesn't show/hide dom elements.

## Dependencies

* A vaguely recent version of jQuery, 1.9 is probably not a bad idea, but 1.7+ _should_ be fine (untested).

## Installation

    bower install ed.jquery.toggler

## Usage

`toggler()` binds to an arbitrary toggle element and looks at either it's `href` attribute (in the first instance) or for a `data-target` attribute, which should contain an id value (including the `#`) for a target in the same document. It then shows or hides that element based on the target's current visibility, using the options you set. You set the initial visibility of your targets with CSS.

It works with `click` events on anchors and `<button>` elements and with `change` events on form `<input>`/`<select>` elements.


Thats about it.
### Binding to all the things:

Invoke directly on a collection:

    $('.my-class').toggler();

Or auto initialise on click/change via the magic of `data` attributes and event delegation:

    <button data-target="#id1" data-toggle>Toggle content</button>
    <a href="#id1" data-toggle>Toggle content</a>
    <div id="#id1">
        Content to toggle.
    </div>

### <a id="toggle-groups">Toggle groups</a>

If you set a `data-toggle-group` value on the trigger element, or pass a string as the value of the `toggleGroup` key when initialising the plugin you will create a linked toggle group. Openning one member of a toggle group will trigger any other open members of the toggle group to close. Open members are closed via their own parent toggle instances, so custom close methods are respected.

eg: toggle #1 is visible

    <a href="#1" data-toggle class="toggler--target-in" data-toggle-group="some-group">Toggle content</a>
    <div id="#id1" class="toggler--in">
        Content to toggle.
    </div>


Now clicking toggle #2 will cause `#id1` above to close as these toggles share a toggle-group attr:

    <a href="#id2" data-toggle data-toggle-group="some-group">Toggle content</a>
    <div id="#id2">
        Content to toggle.
    </div>


## Configuration

Set options by passing a config option when bound:

    $('.my-class').toggler({
        methodIn: 'fadeIn',
        speedIn: 500
    });

Or set global defaults via the `$.fn.toggler.defaults` object, before your toggler instance(s) has been created:

    $.fn.toggler.defaults.methodIn = 'fadeIn';

## Options and defaults

* `methodIn`            : jQuery method to use when showing the target, as a string
* `speedIn`             : speed in milliseconds to use when showing the target
* `beforeInCallback`    : callback fn to be executed before target shown
* `afterInCallback`     : callback fn to be executed after target shown
* `methodOut`           : jQuery method to use when hiding the target, as a string
* `speedOut`            : speed in milliseconds to use when hiding the target
* `beforeOutCallback`   : callback fn to be executed before target hidden
* `afterOutCallback`    : callback fn to be executed after target hidden
* `targetInClass`       : HTML classname applied to the target after it has finished showing. Only applied after the target has been shown by the plugin for the first time
* `targetOutClass`      : HTML classname applied to the target after it has finished hiding. Only applied after the target has been hidden by the plugin for the first time
* `targetAnimatingClass`: HTML classname applied to the target while it is animating.
* `triggerTargetInClass`: HTML classname applied to the *trigger* element when its target is visible. Only applied after the target has been shown or hidden for the first time
* `toggleGroup`         : String value representing the toggle group to assign this toggle to. See [above for how to use](#toggle-groups)

### Defaults


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


## To do

* Unit tests

## Bugs / contributing

The former are likely, the latter welcome. Please open an issue / pull request as appropriate.

## Licence

The MIT License (MIT)

Copyright (c) 2012 Erskine Design

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

