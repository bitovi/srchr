// Load all of the plugin dependencies
steal(
	'srchr/history',
	'srchr/search',
	'srchr/results',
	'srchr/models',
	'./srchr.less',
	function( History, Search, Results, models ){
	
	// don't run if rhino
	if(steal.isRhino) return;
	
	// Create the state that will be shared by everything
	var currentSearch = can.compute()
	
	// Create a new History controller on the #history element
	new History("#history",{
		currentSearch: currentSearch
	});
	
	var modelNames = [];
	for(var modelName in models){
		modelNames.push(modelName)
	}
	
	// Create a new Search controller on the #searchArea element
	new Search("#search",{
		currentSearch: currentSearch,
		modelNames: modelNames
	});
	
	new Results("#results",{
		currentSearch: currentSearch
	})
	
});
