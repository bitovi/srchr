steal('can', '//srchr/models/history.js', './init.ejs', './history.less', 
	function( can, History, initEJS ) {

	/**
	 * Provides a list of model instances stored in localStorage. 
	 * It allows you to remove these items from the list. 
	 * @tag controllers, home
	 */
	return can.Control(
	/* @static */
	{
		defaults: {
			//returns html to be displayed for each item on the list
			titleHelper: function( instance ) {
				return "HistoryItem" + instance.id;
			},
			History: History
		}
	},
	/* @prototype */
	{
		/**
		 * Waits for the page to be loaded
		 */
		init: function() {
			var self = this;

			History.findAll({}, function( historyList ) {
				self.options.historyList = historyList;
				self.element.html(initEJS(self.options));
			});
		},
		/**
		 * Adds an instance to this list.
		 * @param {Object} newInstance The data to add to the instances list.
		 */
		"{History} created": function( list, ev, historyItem ) {
			this.options.historyList.push(historyItem);
		},

		/**
		 * Binds the "remove" class on click.  Removes a history entry.
		 * @param {Object} el The history event to remove.
		 * @param {Object} ev The event that was fired.
		 */
		".remove click": function( el, ev ) {
			var li = el.closest('li'),
				toBeRemoved = li.data('history');

			li.fadeOut(function() {
				toBeRemoved.destroy();
			});
			ev.stopImmediatePropagation();
		},

		/**
		 * Fires "selected" and passes el.model().
		 * @param {Object} el The history entry that was clicked
		 * @param {Object} ev The event that was fired.
		 */
		"li click": function( el, ev ) {
			var selected = el.data('history');
			el.trigger("selected", selected);
		}
	});
});