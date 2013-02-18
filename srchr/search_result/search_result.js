steal('can',
	'srchr/models/search.js',
	'./results.ejs',
	'./search_result.less',
	function(can, Search, resultsEJS){
	
	window.foo = function(){
		debugger;
	}
	
/**
 * Shows the search results of a query.
 * @tag controllers, home
 */
return can.Control(
/* @static */
{
	defaults: {
		resultTemplate : "//srchr/search_result/result.ejs"
	},
	pluginName: 'srchr-search-result'
},
/* @prototype */
{	
	init: function(){
		this.options.id = this.element.prop('id')
		this.options.list = new this.options.modelType.List();
		this.options.searching = can.compute(false);
		this.element.html( resultsEJS(this.options) );
		this.on();
	},
	"{list} length": function(){
		console.log("length change",this.options.list.length)
	},
	"{searching} change": function(searching, ev, newVal){
		console.log("searching change",newVal)
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
				console.log("searching")
				// and set a callback to render the results.
				var searching = this.options.searching;
				searching(true)
				
				var deferredItems = this.options.modelType.findAll(
						{query: currentSearch.query}, 
						function(){
							console.log("changing searching")
							searching(false)
						})
						
				this.options.list.replace( deferredItems );
				
				this.searched = currentSearch.query;
			}
			
		}
		
	}
});
	
});
	 