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
