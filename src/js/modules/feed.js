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
