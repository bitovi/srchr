steal('./flickr.js','./google.js',
	'./twitter.js','./wikipedia.js',
	'./reddit.js',
	function(Flickr, Google, Twitter, Wikipedia, Reddit){
	
	/**
	 * @class srchr/models
	 * @parent index
	 * 
	 * Returns an object map of `ModelName : Model` pairs.
	 * 
	 * 
	 *     steal('srchr/models',function(models){
	 *       models.Flickr.findAll({})
	 *     })
	 */
	return {
		Flickr: Flickr,
		Google: Google,
		Twitter: Twitter,
		Wikipedia: Wikipedia,
		Reddit: Reddit
	};
			
})
