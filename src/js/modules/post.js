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
