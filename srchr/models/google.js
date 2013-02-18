steal('can', 'can/construct/super',function(can){
	
	
	return can.Model({
		apiKey: "AIzaSyBIPgG7836PciaBUGSQaQMUISW6tq1Gr-M",
		cx: "002155797297639617961:na138y-d1g0",
		findAll : function(params, success, error){
			return $.ajax({
				url : "https://www.googleapis.com/customsearch/v1",
				dataType : "jsonp",
				data: {
					key: this.apiKey,
					cx: this.cx,
					q: params.query
				}
			})
		},
		models : function(data){
			return this._super(data.items)
		}
	},{});
	
})
