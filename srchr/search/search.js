steal(
	"can",
	"srchr/models/search.js",
	"./init.ejs",
	'jquery/dom/form_params',
	'./search.less',
	function(can, Search, initEJS){

/**
 * @class srchr/search
 * @parent index
 * @inherits can.Control
 *  
 * Creates a form to search with, as well as 
 * defining a search type (Model).
 * 
 * 
 */
return can.Control(
/* @static */
{
	defaults : {
		defaultText : "Search for things here",
		modelNames: ['Twitter','Upcoming','Flickr']
	},
	pluginName: 'srchr-search',
	
},
/* @prototype */
{
	/**
	 * Initialize a new instance of the Search controller.
	 */
	init : function(){
		this.element.html(initEJS(this.options));
	},
	
	/**
	 * Highlights 'el' for 'time' milliseconds.
	 * 
	 * @param {Object} el The element to highlight.
	 * @param {Object|null} time The amount of time to highlight for.  Default is 1000 milliseconds
	 */
	flash  : function(el, time){
		el.addClass('highlight');
		
		setTimeout(function(){
			el.removeClass('highlight');
		}, +time || 1000, 10);
	},
	
	/**
	 * Binds to the search form submission.  Prevents the default action and fires the "search.created" event. 
	 * @param {Object} el The event target element.
	 * @param {Object} ev The event being fired.
	 */
	"form submit" : function(el, ev){
		ev.preventDefault();
		

		var search = new Search(el.formParams()),
			ok = true;
		
		// If no search type was selected, flash the .options UL and don't trigger search.created
		if(!search.types){
			this.flash(this.element.find('.options'));
			ok = false;
		}
		
		// If the default wasn't changed, flash the text field and don't trigger search.created
		if(search.query == this.options.defaultText){
			this.flash(this.element.find('input[type=text]'));
			ok = false;
		}
		
		// If everything is valid, trigger search.created
		if(ok){
			this.options.currentSearch(search);
		}	
	},
	
	/**
	 * Binds on the search box for when it is focused.  Removes the blurred class and removes the default text.
	 * @param {Object} el The event target element.
	 * @param {Object} ev The event being fired.
	 */
	"input[type=text] focusin" : function(el, ev){
		if(el.val() == this.options.defaultText){
			el.val("");
		}
		el.removeClass('blurred');
	},
	
	/**
	 * Binds on the search box for when it is blurred.  Adds the blurred class and inputs the default text if none was provided by the user.
	 * @param {Object} el The event target element.
	 * @param {Object} ev The event being fired.
	 */
	"input[type=text] focusout" : function(el, ev){
		if(el.val() === ""){
			el.val(this.options.defaultText).addClass('blurred');
		}
	},
	
	/**
	 * Focuses on the search query box on page load.
	 */
	"{document} load" : function(){
		//if we are attached when the page loads, focus on our element
		this.element.find("input[name=query]")[0].focus();
	},
	
	/**
	 * Updates the checkboxes to reflect the user's desired search engine preferences.  Also fires search. 
	 */
	"{currentSearch} change" : function(currentSearch, ev, newVal, oldVal){
		if(newVal){
			this.element.find("input[name=query]").val(newVal.query)[0].focus();

			var checks = this.element.find("input[type=checkbox]").attr("checked",false);
			for(var i =0; i < newVal.types.length; i++){
				checks.filter("[value="+newVal.types[i].replace(/\./g,"\\.")+"]").attr("checked",true);
			}
		} else {
			this.element.find("input[name=query]").val("").focus()
		}
		
	}
});

});
	 