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
