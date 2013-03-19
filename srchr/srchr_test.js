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

		S('input[value=Twitter]').click();
		S('#query').click().type('Dogs\r');

		// wait until there are 2 results
		S("#Twitter li").exists(function() {

			ok(true, "We see results in twitter");
			// make sure we see dogs in the history
			var r = /Dogs\s+t/;

			ok(r.test(S("#history li.selected").text()), "we see dogs correctly");

			// make sure flickr and everyone else is diabled
			ok(S('#results li:contains(Flickr)').hasClass('disabled'), "Flickr is disabled.");
			ok(S('#results li:contains(Google)').hasClass('disabled'), "Google is disabled.");
		});



	})

	test('Switching results tabs', function() {
		S('input[value=Twitter]').click();
		S('input[value=Flickr]').click();

		S('#query').click().type('Cats\r');

		S("#Flickr li").size(function( size ) {
			return size > 1
		}, function() {

			equals(S('#Flickr').css('display'), 'block', 'Twitter results panel is visible')

		})

		S('#results li:contains(Twitter) a').exists().click(function() {
			equals(S('#Flickr').css('display'), 'none', 'Twitter results panel is hidden')
			equals(S('#Twitter').css('display'), 'block', 'Flickr results panel is visible')
		})
	})

	test('Clicking history entries re-creates the search', function() {
		S('#history li:contains(Dogs)').click(function() {
			equals(S('#query').val(), "Dogs", 'Dogs was put back into the query field')
		});
		S("#Twitter li.result").exists(function() {
			ok(true, "We see results in twitter");
		})
	})


	test('All history entries are deletable', function() {
		for ( var i = S('#history li').size() - 1; i > -1; i-- ) {
			S('#history li a.remove:eq(' + i + ')').click()
		}

		S('#history li').size(0)
		ok(S('#history li').size(), 'All history entries were removed.')
	})

});