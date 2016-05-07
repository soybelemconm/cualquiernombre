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
