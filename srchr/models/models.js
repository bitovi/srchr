steal('./flickr.js','./google.js',
	'./twitter.js','./wikipedia.js',
	'./reddit.js',
	function(Flickr, Google, Twitter, Wikipedia, Reddit){
	
	return {
		Flickr: Flickr,
		Google: Google,
		Twitter: Twitter,
		Wikipedia: Wikipedia,
		Reddit: Reddit
	};
			
})
