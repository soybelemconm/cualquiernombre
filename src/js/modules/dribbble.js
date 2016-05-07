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
