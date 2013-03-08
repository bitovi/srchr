steal("can","can/construct/super",function(can){


	/**
	 * @class srchr/models/twitter
	 * @inherits can.Model
	 * @test srchr/models/test.html
	 * @parent index
	 * 
	 * Provides `Twitter.findAll(params, success(results))` to retrieve
	 * twitter results like:
	 * 
	 *     Twitter.findAll({query: "Cats"}, function(results){
	 *       
	 *     })
	 * 
	 */
	return can.Model({
		findAll : function(params, success, error){
			return $.ajax({
				url : "http://search.twitter.com/search.json",
				dataType : "jsonp",
				data: {
					q: params.query
				}
			})
		},
		models : function(data){
			return this._super(data.results)
		}
	},{
		
	});


});