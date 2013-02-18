steal("can","can/construct/super",function(can){

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