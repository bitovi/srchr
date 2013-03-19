steal('ui/placeholder','funcunit', function( Placeholder, S ) {

	module("ui/placeholder", { 
		setup: function(){
			S.open( window );
			$("#qunit-test-area").html("<div id='placeholder'></div>")
		},
		teardown: function(){
			$("#qunit-test-area").empty();
		}
	});
	
	test("updates the element's html", function(){
		new Placeholder('#placeholder');
		ok( $('#placeholder').html() , "updated html" );
	});

});