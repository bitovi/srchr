steal('can',
	'srchr/models/search.js',
	'./results.ejs',
	'./search_result.less',
	function(can, Search, resultsEJS){
	
/**
 * Shows the search results of a query.
 * @tag controllers, home
 */
return can.Control(
/* @static */
{
	defaults: {
		resultView : "//srchr/search_result/result.ejs"
	}
},
/* @prototype */
{	
	init: function(){
		this.options.list = new this.options.modelType.List();
		this.options.searching = can.compute(false);
		this.element.html( resultsEJS(this.options) );
	},
	/**
	 * If the results panel is visible, then get the results.
	 * @param {Object} el The element that the event was called on.
	 * @param {Object} ev The event that was called.
	 * @param {Object} searchInst The search instance to get results for.
	 */
	"{currentSearch} change": function(curSearch, ev, newValue){
		if (this.element.is(':visible')){
			this.getResults();
		}
	},
	
	/**
	 * Show the search results. 
	 */
	" show": "getResults",
	/**
	 * Get the appropriate search results that this Search Results container is supposed to show.
	 */
	getResults: function(){
		// If we have a search...
		var currentSearch = this.options.currentSearch()
		if (currentSearch){
			
			// and our search is new ...
			if(this.searched != currentSearch.query){
				// and set a callback to render the results.
				var searching = this.options.searching;
				searching(true)
				
				var deferredItems = this.options.modelType.findAll(
						{query: currentSearch.query}, 
						function(){
							searching(false)
						})
						
				this.options.list.replace( deferredItems );
				
				this.searched = currentSearch.query;
			}
			
		}else{
			// Tell the user to make a valid query
			this.element.html("Enter a search term!");
		}
		
	}
});
	
});
	 