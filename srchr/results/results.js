steal('can','./init.ejs',
	'srchr/models',
	'srchr/results/templates',
	'ui/list',
	'ui/tabs',
	function(can, initView, models, templates, List, Tabs){
    /**
     * @class srchr/results
	 * @alias Results   
     */
    return can.Control(
	/** @Static */
	{
		defaults : {},
		pluginName: 'srchr-results'
	},
	/** @Prototype */
	{
		init : function(){
			var currentSearch = this.options.currentSearch;
			
			var params = can.compute(function(){
				return {query: currentSearch() && currentSearch().query}
			})
			this.element.html(initView({
				models: models
			},{
				// a helper that creates a List for a given modelName
				listFor: function(modelName){
					return function(el){
						$(el).prop('id',modelName)
						new List(el,{
							modelType : models[modelName],
							params: params,
							resultTemplate: templates[modelName]
						})
					}
				}
			}));
			
			var enabled = can.compute(function(){
				var current = currentSearch()
				if(current){
					return current.types
				} else {
					return [];
				}
			})
			
			new Tabs( this.element.children('.resultsTab'),{
				enabled: enabled
			});
		}
	});
});