steal("funcunit", 'srchr/search', function(S, Search){

	module("srchr/search",{
		setup : function(){
			this.currentSearch = can.compute(false);
			$("<div id='content'/>").appendTo(document.body);					
		 	new Search('#content', {currentSearch: this.currentSearch});
		},
		teardown: function () {
			$("#content").remove();
		}
	});
	
	
	test("Empty the search field and blur it", function(){
		S("input[name=query]").click(function(){
			ok(!$('input[name=query]').val().length, 'Text field is empty!')
		})
		
		S('input[type=checkbox]').click( function(){	
		console.log($('input[name=query]').val());		
			ok($('input[name=query]').val(), 'Text field is filled!')
			ok($('input[name=query]').hasClass('blurred'), 'Clicked query box is grayed out')
		})
	});
	
	
	test("Selected search box is not blurred and is empty", function(){		
		S('input[name=query]').click({}, function(){
			ok(!$('input[name=query]').hasClass('blurred'), 'Clicked query box is not grayed out')
		})
	});
	
	test("Submit form with no query and no type", function(){	
		var self = this;
		S('input[type=submit]').click(function(){
			ok (!self.currentSearch(), "Search was not submitted");
		});
	});
	
	test("Submit form with a query but no type", function(){
		var self = this;
		S('input[name=query]').type('hello world')
		S('input[type=submit]').click({}, function(){
			var srch = self.currentSearch();

			equal(srch.query, 'hello world', 'Current search contains valid query');
			ok(!srch.types.length, 'Current search contains no type');
		}, 'A search was not submitted')
	});
	
	test("Submit form with a valid query and type", function(){
		var self = this;
		S('input[name=query]').click()
		S('input[name=query]').type('testing...')
		S('input#cb_twitter[type=checkbox]').click();
				
		S('input[type=submit]').click({}, function(){
			var srch = self.currentSearch();
		
			equal(srch.query, 'testing...', 'Current search contains valid query');
			equal(srch.types[0], 'Srchr.Models.Twitter', 'Current search contains a valid type');
		}, 'A search was submitted');	
	});
});