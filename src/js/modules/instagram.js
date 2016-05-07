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
