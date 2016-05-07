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
