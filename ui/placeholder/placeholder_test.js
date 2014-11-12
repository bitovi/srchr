steal('test/qunit.js', 'funcunit', 'ui/placeholder', function(QUnit, S, Placeholder) {

	QUnit.module("ui/placeholder", {
		setup: function(){
			S.open( window );
			$("#qunit-test-area").html("<input id='placeholder'/>")
		},
		teardown: function(){
			$("#qunit-test-area").empty();
		}
	});
	
	test("Shows placeholder with empty text", function(){
		new Placeholder('#placeholder',{
			placeholder : "placeholder text"
		});
		equal( $('#placeholder').val(), "placeholder text","text set");
		ok( $('#placeholder').hasClass('placeholder'), "placeholder set"  );
		
		S('#placeholder').type("something",function(){
			ok( !$('#placeholder').hasClass('placeholder'), "placeholder removed");
		});
	});

});