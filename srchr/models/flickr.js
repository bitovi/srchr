steal('can', 'can/construct/super',function(can){
	
	return can.Model({
		apiKey: "245a802eca20febde31c0d3d6a373add",
		findAll : function(params, success, error){
			return $.ajax({
				url : "http://query.yahooapis.com/v1/public/yql",
				dataType : "jsonp",
				data : {
					q: can.sub("SELECT * FROM flickr.photos.search "+
							   "WHERE has_geo='true' AND text='{query}' AND api_key='{key}'", 
						$.extend({key: this.apiKey},params)),
					format: "json",
					env: "store://datatables.org/alltableswithkeys",
					callback: "?"
				}
			})
			
		},
		models : function(data){
			return this._super(data.query.results.photo)
		}
	},{});

});

