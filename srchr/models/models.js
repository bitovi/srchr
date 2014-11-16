steal('./flickr.js','./google.js',
	'./twitter.js','./wikipedia.js',
	'./reddit.js',
	function(Flickr, Google, Twitter, Wikipedia, Reddit){

	return {
		Flickr: Flickr,
		Google: Google,
		// Twitter no longer supported with 1.1
		// Twitter: Twitter,
		Wikipedia: Wikipedia,
		Reddit: Reddit
	};

})
