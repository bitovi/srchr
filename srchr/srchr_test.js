steal('funcunit',
	'ui/tabs/tabs_test.js',
	'ui/list/list_test.js',
	'ui/placeholder/placeholder_test.js',
	'srchr/history/history_test.js',
	'srchr/models/models_test.js',
	'srchr/search/search_test.js',
	'srchr/results/results_test.js',
	
	function( S ) {


	module("srchr", {
		setup: function() {
			S.open("//srchr/srchr.html");
		}
	});



	test('Search shows results in selected service', function() {

		S('input[value=Reddit]').click();
		S('#query').click().type('Dogs\r');

		// wait until there are 2 results
		S("#Reddit li").exists(function() {

			ok(true, "We see results in Reddit");
			// make sure we see dogs in the history
			var r = /Dogs\s+r/i;

			ok(r.test(S("#history li.selected").text()), "we see dogs correctly");

			// make sure flickr and everyone else is diabled
			ok(S('#results li:contains(Flickr)').hasClass('disabled'), "Flickr is disabled.");
			ok(S('#results li:contains(Google)').hasClass('disabled'), "Google is disabled.");
		});



	})

	test('Switching results tabs', function() {
		S('input[value=Reddit]').click();
		S('input[value=Flickr]').click();

		S('#query').click().type('Cats\r');

		S("#Flickr li").size(function( size ) {
			return size > 1
		}, function() {

			equals(S('#Flickr').css('display'), 'block', 'Reddit results panel is visible')

		})

		S('#results li:contains(Reddit) a').exists().click(function() {
			equals(S('#Flickr').css('display'), 'none', 'Flickr results panel is hidden')
			equals(S('#Reddit').css('display'), 'block', 'Reddit results panel is visible')
		})
	})

	test('Clicking history entries re-creates the search', function() {
		S('#history li:contains(Dogs)').click(function() {
			equals(S('#query').val(), "Dogs", 'Dogs was put back into the query field')
		});
		S("#Reddit li.result").exists(function() {
			ok(true, "We see results in Reddit");
		})
	})


	test('All history entries are deletable', function() {
		for ( var i = S('#history li').size() - 1; i > -1; i-- ) {
			S('#history li a.remove:eq(' + i + ')').click()
		}
		// wait for all entries to be removed
		S('#history li').size(0, 'All history entries were removed.');
	})

});