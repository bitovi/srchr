steal('can',
	'./results.ejs',
	'./search_result.less',
	function(can, resultsEJS){
	
/**
 * @class srchr/search_result
 * @parent index
 * @test srchr/search_result/test.html
 * @inherits can.Control
 * 
 * `new SearchResult(element, options)` show search results
 * for a given model, but only when the current element is visible.
 * 
 *     var currentSearch = can.compute({
 *       query: "Cats"
 *     })
 *     
 *     $("#google-results").hide()
 *     
 *     new SearchResult("#google-results",{
 *       modelType: Google,
 *       resultTemplate: can.view.ejs("<h2><%= title %></h2>"),
 *       currentSearch: currentSearch
 *     });
 * 
 *     $("#google-results").trigger("show").show()
 * 
 * @demo srchr/search_result/search_result.html
 * 
 * 
 * @param {HTMLElement} element the element to show results within.
 * @param {Object} options An object of the following options:
 * 
 * #### modelType `can.Model`
 * 
 * A [can.Model] with a `.findAll` method that can be used to retrieve 
 * the search results.
 * 
 * #### resultTemplate `can.view`
 * 
 * A template that is passed an individual instance of the search 
 * results.  The template should provide the html for that single instance.
 * 
 * ### currentSearch `can.compute`
 * 
 * The current search that should be performed.
 * 
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
			
		}
		
	}
});
	
});
	 