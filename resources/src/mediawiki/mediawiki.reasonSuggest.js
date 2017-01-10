/*!
* Add autocomplete suggestions for action forms reasons.
*/
( function ( mw, $ ) {
	$( function () {
		var api = new mw.Api(), reasons = [];
		// These messages can be really big, so its loaded on-the-go
		api.loadMessagesIfMissing( [ mw.config.get( 'reasons' ) ] )
			.done( function () {
				// Convert from string to array, first index is unneeded
				reasons = mw.msg( mw.config.get( 'reasons' ) ).split( '\n** ' );
				reasons.splice( 0, 1 );
			} );

		// Add relevant suggestion
		$( '#mwProtect-reason, #wpReason, #mw-input-wpReason-other' ).suggestions( {
			fetch: function () {
				var $this = $( this ), relevantSuggestions;
				relevantSuggestions = $.grep( reasons, function ( reason ) {
					return ( reason.toLowerCase().indexOf( $this.val().toLowerCase() ) > -1 );
				} );
				$this.suggestions( 'suggestions', relevantSuggestions );
			},
			highlightInput: true
		} );
	} );
}( mediaWiki, jQuery ) );