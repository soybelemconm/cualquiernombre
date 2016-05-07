(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=/*

  Caesar Config

*/

{

  "author"  : "mikedidthis",
  "version" : "1.1.2",

  "dribbble" : {
    "data" : {
      "access_token": "",
      "page" : 1,
      "per_page" : 4
    },
    "cache" : true,
    "dataType" : "jsonp",
    "url" : ""
  },

  "instagram" : {
    "data" : {
      "access_token" : "",
      "count" : 4,
      "page" : 1
    },
    "cache" : true,
    "dataType" : "jsonp",
    "url" : ""
  },

  "share" : {
    "data" : {
      "apikey" : "",
      "url" : "",
    },
    "cache" : true,
    "dataType" : "json",
    "url" : "//free.sharedcount.com/"
  },

  "post" : {
    "overlay" : false,
    "wideContent" : false
  }

}

},{}],2:[function(require,module,exports){
/*

  Caesar Core - <3 mikedidthis

*/

'use strict';

// Require.
// Core.
var config     = require( './config.json' );

// Events.
var click      = require( './events/click' );
var overlay    = require( './events/overlay' );

// Modules.
var Dribbble   = require( './modules/dribbble' );
var Instagram  = require( './modules/instagram' );
var Post       = require( './modules/post' );
var Share      = require( './modules/share' );

// Selectors.
var $dribbble  = $( '[data-js~="dribbble"]' );
var $embed     = $( '[data-js~="embed"]' );
var $instagram = $( '[data-js~="instagram"]' );
var $main      = $( '[data-js~="main"]' );
var $popup     = $( '[data-js~="popup"]' );
var $post      = $( '[data-js~="post"]' );
var $side      = $( '[data-js~="sidebar"]' );

// Start Method.
var start = function ( options ) {

  // Merge options into config.
  config = $.extend( true, config, options );

  // Deferred.
  var $deferred = new $.Deferred();

  // Store instances and promises.
  var instances = [];
  var promises  = [];

  // Create Dribbble instances, store instances and promises.
  var dribbble = Dribbble.create( $dribbble );

  for ( var i = 0, len = dribbble.length; i < len; i++ ) {
    instances.push( dribbble[ i ] );
    promises.push( dribbble[ i ].$deferred );
  }

  // Create Instagram instances, store instances and promises.
  var instagram = Instagram.create( $instagram );

  for ( var j = 0, jen = instagram.length; j < jen; j++ ) {
    instances.push( instagram[ j ] );
    promises.push( instagram[ j ].$deferred );
  }

  // Create Post instances, store instances only.
  var post = Post.create( $post );

  for ( var k = 0, ken = post.length; k < ken; k++ ) {
    instances.push( post[ k ] );
  }

  // Start all instances.
  for ( var x = 0, xen = instances.length; x < xen; x++ ) {
    instances[ x ].start();
  };

  // Handle Deferred States.
  $.when.apply( $, promises ).done( function () {

    $deferred.resolve();

  }).fail( function () {

    $deferred.reject();

  }).always( function () {

    // Bind events.
    click();
    overlay();

    // Add states to main & sidebar elements.
    $main.attr( 'data-js', $main.attr( 'data-js' ) + ' main-start' );
    $side.attr( 'data-js', $side.attr( 'data-js' ) + ' sidebar-start' );

  });

  // Return Deferred Promise.
  return $deferred.promise();

};

// Expose core to window.
window.caesar = {
  config : config,
  start : start
};

},{"./config.json":1,"./events/click":6,"./events/overlay":7,"./modules/dribbble":17,"./modules/instagram":19,"./modules/post":20,"./modules/share":21}],3:[function(require,module,exports){
// Require.
var truncate = require( '../helpers/truncate' );

// Directive.
var dribbble = {

  'data' : {

    'widget-media' : {

      src : function () {
        return this.images.hidpi;
      }

    },

    'widget-like' : {

      href : function () {
        return this.html_url + '/fans';
      },
      text : function () {
        return truncate( this.likes_count );
      }

    }

  }


};

// Exports.
module.exports = dribbble;

},{"../helpers/truncate":9}],4:[function(require,module,exports){
// Require.
var truncate = require( '../helpers/truncate' );

// Directive.
var instagram = {

  'data' : {

    'widget-media' : {
      
      src : function () {
        return this.images.standard_resolution.url;
      }

    },

    'widget-like' : {

      href : function () {
        return this.link;
      },
      text : function () {
        return truncate( this.likes.count );
      }

    }

  }

};

// Exports.
module.exports = instagram;

},{"../helpers/truncate":9}],5:[function(require,module,exports){
// Require.
var truncate  = require( '../helpers/truncate' );
var pluralize = require( '../helpers/pluralize' );

// Directive.
var share = {

  

  'share-facebook-count' : {
    text : function () {
      var count = this.Facebook.share_count;
      this.Total = this.Total || 0;
      this.Total = count + this.Total;
      return truncate( count );
    }
  },
 'share-facebook-plural' : {
    text : function () {
      return pluralize( this.Facebook.share_count, arguments[ 0 ].element.innerHTML );
    }
  },

  'share-googleplus-count' : {
    text : function () {
      var count = this.GooglePlusOne;
      this.Total = this.Total || 0;
      this.Total = count + this.Total;
      return truncate( count );
    }
  },
  'share-googleplus-plural' : {
    text : function () {
      return pluralize( this.GooglePlusOne, arguments[ 0 ].element.innerHTML );
    }
  },

  'share-linkedin-count' : {
    text : function () {
      var count = this.LinkedIn;
      this.Total = this.Total || 0;
      this.Total = count + this.Total;
      return truncate( count );
    }
  },
  'share-linkedin-plural' : {
    text : function () {
      return pluralize( this.LinkedIn, arguments[ 0 ].element.innerHTML );
    }
  },

  'share-pinterest-count' : {
    text : function () {
      var count = this.Pinterest;
      this.Total = this.Total || 0;
      this.Total = count + this.Total;
      return truncate( count );
    }
  },
  'share-pinterest-plural' : {
    text : function () {
      return pluralize( this.Pinterest, arguments[ 0 ].element.innerHTML );
    }
  },

  'share-stumbleupon-count' : {
    text : function () {
      var count = this.StumbleUpon;
      this.Total = this.Total || 0;
      this.Total = count + this.Total;
      return truncate( count );
    }
  },
  'share-stumbleupon-plural' : {
    text : function () {
      return pluralize( this.StumbleUpon, arguments[ 0 ].element.innerHTML );
    }
  },

  'share-twitter-count' : {
    text : function () {
      var count = this.Twitter;
      this.Total = this.Total || 0;
      this.Total = count + this.Total;
      return truncate( this.Twitter );
    }
  },
  'share-twitter-plural' : {
    text : function () {
      return pluralize( this.Twitter, arguments[ 0 ].element.innerHTML );
    }
  },

  'share-total-count' : {
    text : function () {
      return truncate( this.Total );
    }
  },
  'share-total-plural' : {
    text : function () {
      return pluralize( this.Total, arguments[ 0 ].element.innerHTML );
    }
  }

};

// Exports.
module.exports = share;

},{"../helpers/pluralize":8,"../helpers/truncate":9}],6:[function(require,module,exports){
// Binds click event and adds a state.

// Method.
var click = function () {

  var state = function ( e ) {

    e.preventDefault();
    e.stopPropagation();

    var $el   = $( this );

    if ( $el.is( '[data-js~="click-active"]' ) ) {

      $el.attr( 'data-js', $el.attr( 'data-js' ).replace( ' click-active', '' ) );

    } else {

      $el.attr( 'data-js', $el.attr( 'data-js' ) + ' click-active' );

    }

  };

  // Click.
  $( 'body' ).on( 'click', '[data-js~="click"]', state );

  // Click Children.
  $( 'body' ).on( 'click', '[data-js~="click"] > *', function ( e ) {
    e.stopPropagation();
    $( this ).closest( '[data-js~="click"]' ).trigger( 'click' );
  });

};

// Exports.
module.exports = click;

},{}],7:[function(require,module,exports){
// Binds click event and adds a state.

// Method.
var overlay = function () {

  var disabled = function () {

    var $el = $( this ).parents( '[data-js~="overlay"]' );

    $el.attr( 'data-js', $el.attr( 'data-js' ).replace( ' overlay-active', '' ) );

  };

  $( 'body' ).on( 'click', '[data-js~="overlay-close"]', disabled );
  
};

// Exports.
module.exports = overlay;

},{}],8:[function(require,module,exports){
// Adds a character if value not one.

var pluralizeString = function ( value, string ) {

  if ( value > 1 || value < 1 ) {
    string = string + 's'
  } 

  return string;

};

module.exports = pluralizeString;

},{}],9:[function(require,module,exports){
// Truncates a number to one decimal place. 

var truncateNumber = function ( number ) {
  if ( number >= 1000000000 ) {
    return ( number / 1000000000 ).toFixed( 1 ) + 'G';
  }
  if ( number >= 1000000 ) {
    return ( number / 1000000 ).toFixed( 1 ) + 'M';
  }
  if ( number >= 1000 ) {
    return ( number / 1000 ).toFixed( 1 ) + 'K';
  }
  return number;
};

module.exports = truncateNumber;

},{}],10:[function(require,module,exports){
var Attribute, AttributeFactory, BooleanAttribute, Class, Html, Text, helpers, _,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ = require('../lib/lodash');

helpers = require('./helpers');

module.exports = AttributeFactory = {
  Attributes: {},
  createAttribute: function(element, name) {
    var Attr;
    Attr = AttributeFactory.Attributes[name] || Attribute;
    return new Attr(element, name);
  }
};

Attribute = (function() {
  function Attribute(el, name) {
    this.el = el;
    this.name = name;
    this.templateValue = this.el.getAttribute(this.name) || '';
  }

  Attribute.prototype.set = function(value) {
    this.el[this.name] = value;
    return this.el.setAttribute(this.name, value.toString());
  };

  return Attribute;

})();

BooleanAttribute = (function(_super) {
  var BOOLEAN_ATTRIBUTES, name, _i, _len;

  __extends(BooleanAttribute, _super);

  BOOLEAN_ATTRIBUTES = ['hidden', 'async', 'defer', 'autofocus', 'formnovalidate', 'disabled', 'autofocus', 'formnovalidate', 'multiple', 'readonly', 'required', 'checked', 'scoped', 'reversed', 'selected', 'loop', 'muted', 'autoplay', 'controls', 'seamless', 'default', 'ismap', 'novalidate', 'open', 'typemustmatch', 'truespeed'];

  for (_i = 0, _len = BOOLEAN_ATTRIBUTES.length; _i < _len; _i++) {
    name = BOOLEAN_ATTRIBUTES[_i];
    AttributeFactory.Attributes[name] = BooleanAttribute;
  }

  function BooleanAttribute(el, name) {
    this.el = el;
    this.name = name;
    this.templateValue = this.el.getAttribute(this.name) || false;
  }

  BooleanAttribute.prototype.set = function(value) {
    this.el[this.name] = value;
    if (value) {
      return this.el.setAttribute(this.name, this.name);
    } else {
      return this.el.removeAttribute(this.name);
    }
  };

  return BooleanAttribute;

})(Attribute);

Text = (function(_super) {
  __extends(Text, _super);

  AttributeFactory.Attributes['text'] = Text;

  function Text(el, name) {
    var child;
    this.el = el;
    this.name = name;
    this.templateValue = ((function() {
      var _i, _len, _ref, _results;
      _ref = this.el.childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        if (child.nodeType === helpers.TEXT_NODE) {
          _results.push(child.nodeValue);
        }
      }
      return _results;
    }).call(this)).join('');
    this.children = _.toArray(this.el.children);
    if (!(this.textNode = this.el.firstChild)) {
      this.el.appendChild(this.textNode = this.el.ownerDocument.createTextNode(''));
    } else if (this.textNode.nodeType !== helpers.TEXT_NODE) {
      this.textNode = this.el.insertBefore(this.el.ownerDocument.createTextNode(''), this.textNode);
    }
  }

  Text.prototype.set = function(text) {
    var child, _i, _len, _ref, _results;
    while (child = this.el.firstChild) {
      this.el.removeChild(child);
    }
    this.textNode.nodeValue = text;
    this.el.appendChild(this.textNode);
    _ref = this.children;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      _results.push(this.el.appendChild(child));
    }
    return _results;
  };

  return Text;

})(Attribute);

Html = (function(_super) {
  __extends(Html, _super);

  AttributeFactory.Attributes['html'] = Html;

  function Html(el) {
    this.el = el;
    this.templateValue = '';
    this.children = _.toArray(this.el.children);
  }

  Html.prototype.set = function(html) {
    var child, _i, _len, _ref, _results;
    while (child = this.el.firstChild) {
      this.el.removeChild(child);
    }
    this.el.innerHTML = html + this.templateValue;
    _ref = this.children;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      _results.push(this.el.appendChild(child));
    }
    return _results;
  };

  return Html;

})(Attribute);

Class = (function(_super) {
  __extends(Class, _super);

  AttributeFactory.Attributes['class'] = Class;

  function Class(el) {
    Class.__super__.constructor.call(this, el, 'class');
  }

  return Class;

})(Attribute);

},{"../lib/lodash":15,"./helpers":13}],11:[function(require,module,exports){
var Context, Instance, after, before, chainable, cloneNode, _ref;

_ref = require('./helpers'), before = _ref.before, after = _ref.after, chainable = _ref.chainable, cloneNode = _ref.cloneNode;

Instance = require('./instance');

module.exports = Context = (function() {
  var attach, detach;

  detach = chainable(function() {
    this.parent = this.el.parentNode;
    if (this.parent) {
      this.nextSibling = this.el.nextSibling;
      return this.parent.removeChild(this.el);
    }
  });

  attach = chainable(function() {
    if (this.parent) {
      if (this.nextSibling) {
        return this.parent.insertBefore(this.el, this.nextSibling);
      } else {
        return this.parent.appendChild(this.el);
      }
    }
  });

  function Context(el, Transparency) {
    this.el = el;
    this.Transparency = Transparency;
    this.template = cloneNode(this.el);
    this.instances = [new Instance(this.el, this.Transparency)];
    this.instanceCache = [];
  }

  Context.prototype.render = before(detach)(after(attach)(chainable(function(models, directives, options) {
    var children, index, instance, model, _i, _len, _results;
    while (models.length < this.instances.length) {
      this.instanceCache.push(this.instances.pop().remove());
    }
    while (models.length > this.instances.length) {
      instance = this.instanceCache.pop() || new Instance(cloneNode(this.template), this.Transparency);
      this.instances.push(instance.appendTo(this.el));
    }
    _results = [];
    for (index = _i = 0, _len = models.length; _i < _len; index = ++_i) {
      model = models[index];
      instance = this.instances[index];
      children = [];
      _results.push(instance.prepare(model, children).renderValues(model, children).renderDirectives(model, index, directives).renderChildren(model, children, directives, options));
    }
    return _results;
  })));

  return Context;

})();

},{"./helpers":13,"./instance":14}],12:[function(require,module,exports){
var AttributeFactory, Checkbox, Element, ElementFactory, Input, Radio, Select, TextArea, VoidElement, helpers, _,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ = require('../lib/lodash.js');

helpers = require('./helpers');

AttributeFactory = require('./attributeFactory');

module.exports = ElementFactory = {
  Elements: {
    input: {}
  },
  createElement: function(el) {
    var El, name;
    if ('input' === (name = el.nodeName.toLowerCase())) {
      El = ElementFactory.Elements[name][el.type.toLowerCase()] || Input;
    } else {
      El = ElementFactory.Elements[name] || Element;
    }
    return new El(el);
  }
};

Element = (function() {
  function Element(el) {
    this.el = el;
    this.attributes = {};
    this.childNodes = _.toArray(this.el.childNodes);
    this.nodeName = this.el.nodeName.toLowerCase();
    this.classNames = this.el.className.split(' ');
    this.originalAttributes = {};
  }

  Element.prototype.empty = function() {
    var child;
    while (child = this.el.firstChild) {
      this.el.removeChild(child);
    }
    return this;
  };

  Element.prototype.reset = function() {
    var attribute, name, _ref, _results;
    _ref = this.attributes;
    _results = [];
    for (name in _ref) {
      attribute = _ref[name];
      _results.push(attribute.set(attribute.templateValue));
    }
    return _results;
  };

  Element.prototype.render = function(value) {
    return this.attr('text', value);
  };

  Element.prototype.attr = function(name, value) {
    var attribute, _base;
    attribute = (_base = this.attributes)[name] || (_base[name] = AttributeFactory.createAttribute(this.el, name, value));
    if (value != null) {
      attribute.set(value);
    }
    return attribute;
  };

  Element.prototype.renderDirectives = function(model, index, attributes) {
    var directive, name, value, _results;
    _results = [];
    for (name in attributes) {
      if (!__hasProp.call(attributes, name)) continue;
      directive = attributes[name];
      if (!(typeof directive === 'function')) {
        continue;
      }
      value = directive.call(model, {
        element: this.el,
        index: index,
        value: this.attr(name).templateValue
      });
      if (value != null) {
        _results.push(this.attr(name, value));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  return Element;

})();

Select = (function(_super) {
  __extends(Select, _super);

  ElementFactory.Elements['select'] = Select;

  function Select(el) {
    Select.__super__.constructor.call(this, el);
    this.elements = helpers.getElements(el);
  }

  Select.prototype.render = function(value) {
    var option, _i, _len, _ref, _results;
    value = value.toString();
    _ref = this.elements;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      option = _ref[_i];
      if (option.nodeName === 'option') {
        _results.push(option.attr('selected', option.el.value === value));
      }
    }
    return _results;
  };

  return Select;

})(Element);

VoidElement = (function(_super) {
  var VOID_ELEMENTS, nodeName, _i, _len;

  __extends(VoidElement, _super);

  function VoidElement() {
    return VoidElement.__super__.constructor.apply(this, arguments);
  }

  VOID_ELEMENTS = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

  for (_i = 0, _len = VOID_ELEMENTS.length; _i < _len; _i++) {
    nodeName = VOID_ELEMENTS[_i];
    ElementFactory.Elements[nodeName] = VoidElement;
  }

  VoidElement.prototype.attr = function(name, value) {
    if (name !== 'text' && name !== 'html') {
      return VoidElement.__super__.attr.call(this, name, value);
    }
  };

  return VoidElement;

})(Element);

Input = (function(_super) {
  __extends(Input, _super);

  function Input() {
    return Input.__super__.constructor.apply(this, arguments);
  }

  Input.prototype.render = function(value) {
    return this.attr('value', value);
  };

  return Input;

})(VoidElement);

TextArea = (function(_super) {
  __extends(TextArea, _super);

  function TextArea() {
    return TextArea.__super__.constructor.apply(this, arguments);
  }

  ElementFactory.Elements['textarea'] = TextArea;

  return TextArea;

})(Input);

Checkbox = (function(_super) {
  __extends(Checkbox, _super);

  function Checkbox() {
    return Checkbox.__super__.constructor.apply(this, arguments);
  }

  ElementFactory.Elements['input']['checkbox'] = Checkbox;

  Checkbox.prototype.render = function(value) {
    return this.attr('checked', Boolean(value));
  };

  return Checkbox;

})(Input);

Radio = (function(_super) {
  __extends(Radio, _super);

  function Radio() {
    return Radio.__super__.constructor.apply(this, arguments);
  }

  ElementFactory.Elements['input']['radio'] = Radio;

  return Radio;

})(Checkbox);

},{"../lib/lodash.js":15,"./attributeFactory":10,"./helpers":13}],13:[function(require,module,exports){
var ElementFactory, expando, html5Clone, _getElements;

ElementFactory = require('./elementFactory');

exports.before = function(decorator) {
  return function(method) {
    return function() {
      decorator.apply(this, arguments);
      return method.apply(this, arguments);
    };
  };
};

exports.after = function(decorator) {
  return function(method) {
    return function() {
      method.apply(this, arguments);
      return decorator.apply(this, arguments);
    };
  };
};

exports.chainable = exports.after(function() {
  return this;
});

exports.onlyWith$ = function(fn) {
  if ((typeof jQuery !== "undefined" && jQuery !== null) || (typeof Zepto !== "undefined" && Zepto !== null)) {
    return (function($) {
      return fn(arguments);
    })(jQuery || Zepto);
  }
};

exports.getElements = function(el) {
  var elements;
  elements = [];
  _getElements(el, elements);
  return elements;
};

_getElements = function(template, elements) {
  var child, _results;
  child = template.firstChild;
  _results = [];
  while (child) {
    if (child.nodeType === exports.ELEMENT_NODE) {
      elements.push(new ElementFactory.createElement(child));
      _getElements(child, elements);
    }
    _results.push(child = child.nextSibling);
  }
  return _results;
};

exports.ELEMENT_NODE = 1;

exports.TEXT_NODE = 3;

html5Clone = function() {
  return document.createElement('nav').cloneNode(true).outerHTML !== '<:nav></:nav>';
};

exports.cloneNode = (typeof document === "undefined" || document === null) || html5Clone() ? function(node) {
  return node.cloneNode(true);
} : function(node) {
  var cloned, element, _i, _len, _ref;
  cloned = Transparency.clone(node);
  if (cloned.nodeType === exports.ELEMENT_NODE) {
    cloned.removeAttribute(expando);
    _ref = cloned.getElementsByTagName('*');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      element = _ref[_i];
      element.removeAttribute(expando);
    }
  }
  return cloned;
};

expando = 'transparency';

exports.data = function(element) {
  return element[expando] || (element[expando] = {});
};

exports.nullLogger = function() {};

exports.consoleLogger = function() {
  return console.log(arguments);
};

exports.log = exports.nullLogger;

},{"./elementFactory":12}],14:[function(require,module,exports){
var Instance, chainable, helpers, _,
  __hasProp = {}.hasOwnProperty;

_ = require('../lib/lodash.js');

chainable = (helpers = require('./helpers')).chainable;

module.exports = Instance = (function() {
  function Instance(template, Transparency) {
    this.Transparency = Transparency;
    this.queryCache = {};
    this.childNodes = _.toArray(template.childNodes);
    this.elements = helpers.getElements(template);
  }

  Instance.prototype.remove = chainable(function() {
    var node, _i, _len, _ref, _results;
    _ref = this.childNodes;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      node = _ref[_i];
      _results.push(node.parentNode.removeChild(node));
    }
    return _results;
  });

  Instance.prototype.appendTo = chainable(function(parent) {
    var node, _i, _len, _ref, _results;
    _ref = this.childNodes;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      node = _ref[_i];
      _results.push(parent.appendChild(node));
    }
    return _results;
  });

  Instance.prototype.prepare = chainable(function(model) {
    var element, _i, _len, _ref, _results;
    _ref = this.elements;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      element = _ref[_i];
      element.reset();
      _results.push(helpers.data(element.el).model = model);
    }
    return _results;
  });

  Instance.prototype.renderValues = chainable(function(model, children) {
    var element, key, value, _results;
    if (_.isElement(model) && (element = this.elements[0])) {
      return element.empty().el.appendChild(model);
    } else if (typeof model === 'object') {
      _results = [];
      for (key in model) {
        if (!__hasProp.call(model, key)) continue;
        value = model[key];
        if (value != null) {
          if (_.isString(value) || _.isNumber(value) || _.isBoolean(value) || _.isDate(value)) {
            _results.push((function() {
              var _i, _len, _ref, _results1;
              _ref = this.matchingElements(key);
              _results1 = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                element = _ref[_i];
                _results1.push(element.render(value));
              }
              return _results1;
            }).call(this));
          } else if (typeof value === 'object') {
            _results.push(children.push(key));
          } else {
            _results.push(void 0);
          }
        }
      }
      return _results;
    }
  });

  Instance.prototype.renderDirectives = chainable(function(model, index, directives) {
    var attributes, element, key, _results;
    _results = [];
    for (key in directives) {
      if (!__hasProp.call(directives, key)) continue;
      attributes = directives[key];
      if (!(typeof attributes === 'object')) {
        continue;
      }
      if (typeof model !== 'object') {
        model = {
          value: model
        };
      }
      _results.push((function() {
        var _i, _len, _ref, _results1;
        _ref = this.matchingElements(key);
        _results1 = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          element = _ref[_i];
          _results1.push(element.renderDirectives(model, index, attributes));
        }
        return _results1;
      }).call(this));
    }
    return _results;
  });

  Instance.prototype.renderChildren = chainable(function(model, children, directives, options) {
    var element, key, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = children.length; _i < _len; _i++) {
      key = children[_i];
      _results.push((function() {
        var _j, _len1, _ref, _results1;
        _ref = this.matchingElements(key);
        _results1 = [];
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          element = _ref[_j];
          _results1.push(this.Transparency.render(element.el, model[key], directives[key], options));
        }
        return _results1;
      }).call(this));
    }
    return _results;
  });

  Instance.prototype.matchingElements = function(key) {
    var el, elements, _base;
    elements = (_base = this.queryCache)[key] || (_base[key] = (function() {
      var _i, _len, _ref, _results;
      _ref = this.elements;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        el = _ref[_i];
        if (this.Transparency.matcher(el, key)) {
          _results.push(el);
        }
      }
      return _results;
    }).call(this));
    helpers.log("Matching elements for '" + key + "':", elements);
    return elements;
  };

  return Instance;

})();

},{"../lib/lodash.js":15,"./helpers":13}],15:[function(require,module,exports){
 var _ = {};

_.toString = Object.prototype.toString;

_.toArray = function(obj) {
  var arr = new Array(obj.length);
  for (var i = 0; i < obj.length; i++) {
    arr[i] = obj[i];
  }
  return arr;
};

_.isString = function(obj) { return _.toString.call(obj) == '[object String]'; };

_.isNumber = function(obj) { return _.toString.call(obj) == '[object Number]'; };

_.isArray = Array.isArray || function(obj) {
  return _.toString.call(obj) === '[object Array]';
};

_.isDate = function(obj) {
  return _.toString.call(obj) === '[object Date]';
};

_.isElement = function(obj) {
  return !!(obj && obj.nodeType === 1);
};

_.isPlainValue = function(obj) {
  var type;
  type = typeof obj;
  return (type !== 'object' && type !== 'function') || exports.isDate(obj);
};

_.isBoolean = function(obj) {
  return obj === true || obj === false;
};

module.exports = _;

},{}],16:[function(require,module,exports){
var $, Context, Transparency, helpers, _,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

_ = require('../lib/lodash.js');

helpers = require('./helpers');

Context = require('./context');

Transparency = {};

Transparency.render = function(context, models, directives, options) {
  var log, _base;
  if (models == null) {
    models = [];
  }
  if (directives == null) {
    directives = {};
  }
  if (options == null) {
    options = {};
  }
  log = options.debug && console ? helpers.consoleLogger : helpers.nullLogger;
  log("Transparency.render:", context, models, directives, options);
  if (!context) {
    return;
  }
  if (!_.isArray(models)) {
    models = [models];
  }
  context = (_base = helpers.data(context)).context || (_base.context = new Context(context, Transparency));
  return context.render(models, directives, options).el;
};

Transparency.matcher = function(element, key) {
  return element.el.id === key || __indexOf.call(element.classNames, key) >= 0 || element.el.name === key || element.el.getAttribute('data-bind') === key;
};

Transparency.clone = function(node) {
  return $(node).clone()[0];
};

Transparency.jQueryPlugin = helpers.chainable(function(models, directives, options) {
  var context, _i, _len, _results;
  _results = [];
  for (_i = 0, _len = this.length; _i < _len; _i++) {
    context = this[_i];
    _results.push(Transparency.render(context, models, directives, options));
  }
  return _results;
});

if ((typeof jQuery !== "undefined" && jQuery !== null) || (typeof Zepto !== "undefined" && Zepto !== null)) {
  $ = jQuery || Zepto;
  if ($ != null) {
    $.fn.render = Transparency.jQueryPlugin;
  }
}

if (typeof module !== "undefined" && module !== null ? module.exports : void 0) {
  module.exports = Transparency;
}

if (typeof window !== "undefined" && window !== null) {
  window.Transparency = Transparency;
}

if (typeof define !== "undefined" && define !== null ? define.amd : void 0) {
  define(function() {
    return Transparency;
  });
}

},{"../lib/lodash.js":15,"./context":11,"./helpers":13}],17:[function(require,module,exports){
// Dribbble - Based on Feed.

// Require.
var config    = require( '../config.json' );
var directive = require( '../directives/dribbble' );
var Feed      = require( './feed' );

// Object.
var Dribbble = Object.create( Feed, {

  module : {
    value : 'dribbble'
  },

  create : {
    value : function ( $els ) {

      var instances = [];

      // Check we have a URL.
      if ( !( config.dribbble.url === '' ) ) {

        instances = Feed.create.call( this, $els, config.dribbble, directive );

      }

      return instances;

    }
  }

});

// Exports.
module.exports = Dribbble;

},{"../config.json":1,"../directives/dribbble":3,"./feed":18}],18:[function(require,module,exports){
// Feed - Fetch and render data from API.

// Require.
var Transparency = require( '../lib/transparency' );

// Set $.fn.render to Transparency.
$.fn.render      = Transparency.jQueryPlugin;

// Change Transparency mather to data-js.
window.Transparency.matcher = function( element, key ) {
  return element.el.getAttribute( 'data-js' ) == key;
};

// Object.
var Feed = {

  module : 'feed',

  create : function ( $els, api, directive ) {

    // Store instances.
    var instances = [];

    for ( var i = 0, len = $els.length; i < len; i++ ) {

      // Create instance.
      var feed         = Object.create( this );

      // Populate $el and $deferred.
      feed.$el         = $els.eq( i );
      feed.$deferred   = new $.Deferred();

      // Populate data.
      feed.api         = $.extend( true, {}, api );
      feed.api.context = feed;
      feed.data        = [];
      feed.directive   = directive;

      // Store instance.
      instances.push( feed );

    }

    // Return Instances.
    return instances;

  },

  fetch : function () {

    return $.ajax( this.api );

  },

  get : function ( ) {

    return this.data;

  },

  set : function ( data ) {

    this.data = data;

  },

  render : function ( ) {

    this.$el.render( this.get(), this.directive );

  },

  start : function () {

    this.fetch().done( function ( response ) {
      this.set( response );
      this.render();
      this.$deferred.resolve( this );
      this.$el.attr( 'data-js', this.$el.attr( 'data-js' ) + ' ' + this.module + '-start' );

    }).fail( function () {

      this.$deferred.reject( this );

    });

    return this.$deferred.promise();

  }

};

// Exports.
module.exports = Feed;

},{"../lib/transparency":16}],19:[function(require,module,exports){
// Instagram - Based on Feed.

// Require.
var config    = require( '../config.json' );
var directive = require( '../directives/instagram' );
var Feed      = require( './feed' );

// Object.
var Instagram = Object.create( Feed, {

  module : {
    value : 'instagram'
  },

  create : {
    value : function ( $els ) {

      var instances = [];

      // Check we have an access token and URL.
      if ( !( config.instagram.data.access_token === '' ) || !( config.instagram.url === '' ) ) {

        instances = Feed.create.call( this, $els, config.instagram, directive );

      }

      return instances;

    }
  }

});

// Exports.
module.exports = Instagram;

},{"../config.json":1,"../directives/instagram":4,"./feed":18}],20:[function(require,module,exports){
// Post - Handles anything related to the post.

// Require.
var config  = require( '../config.json' );
var Share   = require( '../modules/share' );

// Object.
var Post = {

  module : 'post',

  create : function ( $els ) {

    // Store instances.
    var instances = [];

    for ( var i = 0, len = $els.length; i < len; i++ ) {

      // Create instance.
      var post       = Object.create( this );

      // Cache $el.
      var $el        = $els.eq( i );

      // Populate $el, $body, $embed, $sidebar and $deferred.
      post.$deferred = new $.Deferred();  
      post.$el       = $el;
      post.$body     = $el.find( '[data-js~="post-body"]' );
      post.$embed    = $el.find( '[data-js~="post-embed"]' );
      post.$sidebar  = $el.find( '[data-js~="post-sidebar"]' );

      // Populate data.
      post.type = {
        overlay     : $el.is( '[data-js~="post--cover"][data-js~="post--overlay"][data-js~="post--index"]' ),
        wideContent : $el.is( '[data-js~="post--wide"][data-js~="post--permalink"]' )
      };
      if ( $el.is( '[data-js~="post--cover"]' ) && $el.is( '[data-js~="post--index"]' ) && config.post.overlay ) {
        post.type.overlay = true;
      }
      if ( $el.is( '[data-js~="post--permalink"]' ) && config.post.wideContent ) {
        post.type.wideContent = true;
      }

      // Add Share.
      post.Share = Share.create( $el.find( '[data-js~="share"]' ) )[ 0 ];

      // Add Share URL.
      if ( post.Share ) {
        post.Share.api.data.url = $el.data( 'permalink' );
      }

      // Store instance.
      instances.push( post );

    }

    // Return instances.
    return instances;

  },

  // Make Fluid Embed.
  embed : function () {

    // Cache iframe / embed.
    var $iframe = this.$embed.find( 'iframe, embed' );

    // Cache dimensions.
    var width  = parseInt( $iframe.attr( 'width' ), 10 );
    var height = parseInt( $iframe.attr( 'height' ), 10 );
    
    if ( $iframe.attr( 'width' ) === '100%' ) {
      width = height;
    }
    if ( $iframe.attr( 'height' ) === '100%' ) {
      height = width;
    }
    
    // Render.
    this.$embed.css( 'paddingTop', ( ( 100 / width ) * height ) + '%' );

  },

  // Make Overlay Content.
  overlay : function () {
    
    this.$el.addClass( 'post--overlay' );
    
  },

  // Make Wide Content.
  wideContent : function () {

    var $wide = this.$body.find( 'blockquote, pre' ).add( this.$body.find( 'img' ).parent() );
    var limit = ( this.$sidebar.position().top + this.$sidebar.outerHeight( true ) ) || 0;
    
    $.each( $wide, function () {

      if ( $( this ).position().top > limit ) {
        $( this ).addClass( 'post-wide' );
      }

    });

  },

  start : function () {

    // Store promises.
    var promises = [];

    // Start Share.
    if ( this.Share ) {

      // When Share done, render total.
      this.Share.start().done( $.proxy( function ( module ) {
        this.$el.find( '[data-js~="share-total"]' ).render( module.data, module.directive );
      }, this ) );

    }

    // Make fluid embeds.
    if ( this.$embed.length ) {
      this.embed();
    }

    // Make overlay.
    if ( this.type.overlay ) {
      this.overlay();
    }

    // Make widecontent.
    if ( this.type.wideContent ) {
      this.wideContent();
    }

    // Wait for module instances promises to complete.
    $.when.apply( $, promises ).done( $.proxy( function () {
      this.$deferred.resolve( this );
      this.$el.attr( 'data-js', this.$el.attr( 'data-js' ) + ' ' + this.module + '-start' );
    }, this ) );
    
    return this.$deferred.promise();

  }

};

// Exports.
module.exports = Post;

},{"../config.json":1,"../modules/share":21}],21:[function(require,module,exports){
// Share - Based on Feed.

// Require.
var config    = require( '../config.json' );
var directive = require( '../directives/share' );
var Feed      = require( './feed' );

// Object.
var Share = Object.create( Feed, {

  module : {
    value : 'share'
  },

  create : {
    value : function ( $els ) {

      var instances = [];

      // Check we have an API key.
      if ( !( config.share.data.apikey === '' ) ) {

        instances = Feed.create.call( this, $els, config.share, directive );

      }

      return instances;

    }
  }

});

// Exports.
module.exports = Share;

},{"../config.json":1,"../directives/share":5,"./feed":18}]},{},[2]);
