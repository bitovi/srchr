steal('can','can/util/object', function( can, Object ) {
	
	return  can.Model({
		localStoreName: "search-history-store",
		id: "query",
		localStore: function( cb ) {
			var name = this.localStoreName,
				data = JSON.parse(window.localStorage[name] || (window.localStorage[name] = '[]')),
				res = cb.call(this, data);
			if ( res !== false ) {
				window.localStorage[name] = JSON.stringify(data);
			}
		},
		findAll: function( params ) {
			var def = $.Deferred();
			this.localStore(function( todos ) {
				def.resolve(todos);
			});
			
			return def;
		},
		destroy: function( id ) {
			var def = $.Deferred();
			this.localStore(function( todos ) {
				for ( var i = 0; i < todos.length; i++ ) {
					if ( todos[i][this.id] === id ) {
						todos.splice(i, 1);
						break;
					}
				}
				def.resolve({});
			});
			return def;
		},
		// handles create and update
		update: function( id, attrs ) {
			var def = new can.Deferred();
			this.localStore(function( items ) {
				for ( var i = 0; i < items.length; i++ ) {
					if ( items[i][this.id] === id ) {
						var item = items[i];
						// update item
						can.extend(item, attrs);
						// move it to the start
						items.splice(i,1);
						items.unshift(item)
						break;
					}
				}
				if(!item){
					attrs[this.id] = id;
					items.unshift(attrs)
				}
				
			});
			def.resolve({});
			return def;
		}
	}, {
	});
});