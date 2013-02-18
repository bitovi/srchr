steal('./search_result.js',
	'srchr/models/search.js',
	'funcunit', 
	'can/util/fixture',
	function(SearchResult, Search, S, fixture){
	
	module("srchr/search_result",{
		setup: function(){
			var self = this;
			
			this.currentSearch = can.compute();
		  	
		    this.searches = 0;
  			var Google = can.Model({
  				findAll: "/google"
  			},{})
  			
  			fixture("/google",function(request){
  				var results = [];
				var length = parseInt( Math.random()*10+1 );
				for(var i =0; i < length; i++){
					results.push({
						title : i+"th search result for "+request.data.query,
					})
				}
				this.searches++;
				return results;
  			});
			$("<div id='content'/>").appendTo("#qunit-test-area");
  			new SearchResult("#content",{
  				modelType : Google,
  				currentSearch: this.currentSearch
  			})
  			
		},
		teardown: function(){
			$("#qunit-test-area").empty()
		}
	})
	
	test("results shown", function(){
		this.currentSearch( new Search({
			query: "Cats",
			types: ["Srchr.Models.Flickr"]
		}) );
		
		S("#content li.result").exists("results have been shown");
	})

	test("results not retrieved when hidden", function(){
		$("#content").hide();
		
		this.currentSearch( new Search({
			query: "Cats",
			types: ["Srchr.Models.Flickr"]
		}) );
		var self = this;
		
		
		S.wait(20, function(){
			equal( self.searches, 0, "" )
		});
		
	});
	
	test("results retrieved when shown",function(){
		$("#content").hide();
		
		this.currentSearch( new Search({
			query: "Cats",
			types: ["Srchr.Models.Flickr"]
		}) );
		
		var self = this;
		S.wait(40, function(){
			equal( self.searches, 0, "" )
		});
		
		$("#content").trigger("show");
		S("#content li.result").exists("results have been shown",function(){
			equal( self.searches, 1, "" )
		});
		
	})
	
});




