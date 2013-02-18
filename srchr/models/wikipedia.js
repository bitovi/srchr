steal('can','can/construct/super',function(can){
	
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
