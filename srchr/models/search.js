steal('can',function(can) {
	/**
	 * @class srchr/models/search
	 * @inherits can.Model
	 * 
	 * Represents a search. A search model uses the `query` property
	 * as the model's [can.Model.static.id id].
	 * 
	 *     new Search({query: "Catz"})
	 * 
	 */
	return can.Model({
		id: "query"
	},{});
})