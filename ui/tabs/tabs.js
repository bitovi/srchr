steal('can','./tabs.less!', function(can) {
	/** @add ui/tabs  */
	return can.Control(
	/** @prototype */
	{

		/**
		 * Initialize a new Tabs controller.
		 * @param {Object} el The UL element to create the tabs controller on
		 */
		init: function( el ) {
			var tab = this.tab;
			// hide everything at the start
			this.element.addClass('tabs ui-helper-clearfix').find("li").each(function(){
				tab($(this)).hide()
			})
			// activate the first tab
			this.update()
		},
		"{enabled} change": "update",
		update: function(){
			var enabled = this.options.enabled(),
				self = this,
				current =  self.tab(this.element.find('active')).prop('id'),
				firstEnabled;

			this.element.find("li").each(function(){
				var el = $(this);

				if ( enabled.indexOf( self.tab(el).prop('id') ) >= 0 ) {
					el.removeClass("disabled");
					if ( ! firstEnabled ) {
						firstEnabled = el
					}
				} else {
					el.addClass("disabled");
					self.tab(el).hide()
				}
			});

			if( current && enabled.indexOf(current) >= 0 ) {
				// just change everyone's enabled /disabled
			} else if(firstEnabled){
				// move to the first new element
				self.activate(firstEnabled);

			}
		},
		// helper function finds the tab for a given li
		/**
		 * Retrieves a tab contents for a given tab
		 * @param {jQuery} li The LI to retrieve the tab for.
		 */
		tab: function( li ) {
			return $(li.find("a").attr("href"));
		},

		// on an li click, activates new tab
		/**
		 * Binds on an LI to trigger "activate" on a new tab.
		 * @param {Object} el The element to trigger "activate" on.
		 * @param {Object} ev The event to prevent the default action for.
		 */
		"li click": function( el, ev ) {
			ev.preventDefault();
			if(!el.hasClass('disabled')){
				this.activate(el);
			}
		},
		/**
		 * Hide all tabs, show the new one.
		 * @param {jQuery} el The element to show.
		 */
		activate: function( el ) {
			this.tab(this.element.find('.active').removeClass('active')).hide();
			this.tab(el.addClass('active')).show().trigger("show");
		}
	});

});
