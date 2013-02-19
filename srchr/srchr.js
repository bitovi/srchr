// Load all of the plugin dependencies
steal(
	'srchr/history',
	'srchr/models',
	'srchr/search',
	'srchr/search_result',
	'srchr/tabs',
	'srchr/templates',
	'./srchr.less',
	function( History, models, Search, SearchResult, Tabs, templates){
	
	// don't run if rhino
	if(steal.isRhino){
		return
	}
	
	// This is the Srchr application.  It intergrates all of the Srchr modules.
	
	
	// Create the state that will be shared by everything
	var currentSearch = can.compute()
	
	
	
	// Create a new History controller on the #history element
	new History("#history",{
		currentSearch: currentSearch
	});
	
	var modelNames = [];
	for (var modelName in models ) {

		// make a tab button for it
		$("#resultsTab").append($('<li>').html(
			$('<a>', {
				href: '#' + modelName
			}).html(modelName))
		);
		
		// Create the content containers for each respective tab.
		var div = $('<div>', {
			id: modelName
		})
		$("#resultsTab").after(div);
		new SearchResult(div,{
			modelType : models[modelName],
			currentSearch: currentSearch,
			resultTemplate: templates[modelName]
		})
		modelNames.push(modelName)
	}
	
	// Create new Tabs and Disabler controllers on the #resultsTab element 
	new Tabs("#resultsTab",{
		enabled: can.compute(function(){
			var current = currentSearch()
			if(current){
				return current.types
			} else {
				return [];
			}
		})
	});
	
	
	// Create a new Search controller on the #searchArea element
	new Search("#searchArea",{
		currentSearch: currentSearch,
		modelNames: modelNames
	});
	
});
