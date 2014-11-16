steal('can',
	'./results.ejs!',
  './result.ejs!',
	'can/util/object',
	'./list.less!',
	function(can, resultsEJS, resultEJS, object){

/** @add ui/list */
return can.Control(
{
	defaults: {
		resultTemplate : resultEJS
	},
	pluginName: 'ui-list'
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
	"{params} change": function(curSearch, ev, newValue){
		if (this.element.is(':visible')){
			this.getResults();
		}
	},

	" show": "getResults",
	/**
	 * Get the appropriate search results that this Search Results container is supposed to show.
	 */
	getResults: function(){
		// If we have a search...
		var params = this.options.params()
		if (params){

			// and our search is new ...
			if( !object.same(this.oldParams, params) ){
				// and set a callback to render the results.
				var searching = this.options.searching;
				searching(true)

				var deferredItems = this.options.modelType.findAll(
						params,
						function(){
							searching(false)
						})

				this.options.list.replace( deferredItems );

				this.oldParams = params;
			}

		}

	}
});

});
