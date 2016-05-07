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
