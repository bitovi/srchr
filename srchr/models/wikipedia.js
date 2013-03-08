steal('can','can/construct/super',function(can){
	
	/**
	 * @class srchr/models/wikipedia
	 * @inherits can.Model
	 * @test srchr/models/test.html
	 * @parent index
	 * 
	 * Provides `Wikipedia.findAll(params, success(results))` to retrieve
	 * wikipedia results like:
	 * 
	 *     Wikipedia.findAll({query: "Cats"}, function(results){
	 *       
	 *     })
	 * 
	 */
	return can.Model({
		findAll: function(params){
			return $.ajax({
				url: "http://en.wikipedia.org/w/api.php",
				
				data: {
					action: "query",
					list: "search",
					format: "json",
					prop:"langlinks",
					srsearch: params.query
				},
				dataType: "jsonp",
				cache: true
			})
		},
		models: function(data){
			return this._super(data.query.search)
		}
	},{})
	
})
