steal('./disabler.js','srchr/models/search.js','funcunit/qunit',function(Disabler,Search){


var tabHTML = "<ul>\
	<li><a href='#flickr'>Flickr</a></li>\
	<li><a href='#upcoming'>Upcoming</a></li>\
</ul>"

	module("srchr/search",{
		setup : function(){
			var ul = $(tabHTML)
			$("#qunit-test-area").html(ul);
			this.current = can.compute();
			
			this.disabler = new Disabler(ul,{
				currentSearch: this.current
			})
			this.flickrLI = ul.find("li:eq(0)");
			this.upcomingLI = ul.find("li:eq(1)");
		},
		teardown: function(){
			$("#qunit-test-area").empty();
		}
	});
	
	test('disabled without a search',function(){
		ok( this.flickrLI.hasClass('disabled'),"first button disabled" );
		ok( this.upcomingLI.hasClass('disabled'),"second button disabled" )
	})
	
	test('setting currentSearch to a type enables a tab', function(){
		this.current( new Search({ types : ['Srchr.Models.Flickr']}) )
		// make sure that only flickr looks enabled
		ok(! this.flickrLI.hasClass('disabled'),"first button disabled" );
		ok( this.upcomingLI.hasClass('disabled'),"second button disabled" )
		
	})
	
	test('default activate events prevented on disabled tabs', function(){
		this.current( new Search({ types : ['Srchr.Models.Flickr']}) )
		
		this.flickrLI.bind('default.activate',function(){
			ok(true,"default activate event is called on flickr")
		});
		this.upcomingLI.bind('default.activate',function(){
			ok(false,"default activate event is called on flickr")
		})
		
		this.flickrLI.trigger('activate');
		this.flickrLI.trigger('activate');

		
	});

});