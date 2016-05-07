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
