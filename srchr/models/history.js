steal('can/model', function(Model) {
	return can.Model('History', {
	    localStore: function(cb){
	    var name = "search-history-store",
	       data = JSON.parse( window.localStorage[name] || (window.localStorage[name] = '[]') ),
	       res = cb.call(this, data);
	     if(res !== false){
	       can.each(data, function(i, todo) {
	         delete todo.editing;
	       });
	       window.localStorage[name] = JSON.stringify(data);
	     }
	   },

	   findAll: function(params){
	     var def = new can.Deferred();
	     this.localStore(function(todos){
	       var instances = [],
	         self = this;
	       can.each(todos, function(todo, i) {
	         instances.push(new self(todo));
	       });
	       def.resolve({data: instances});
	     })
	     return def;
	   },

	   destroy: function(id){
	     var def = new can.Deferred();
	     this.localStore(function(todos){
	       for (var i = 0; i < todos.length; i++) {
	         if (todos[i].id === id) {
	           todos.splice(i, 1);
	           break;
	         }
	       }
	       def.resolve({});
	     });
	     return def
	   },

	   create: function(attrs){
	     var def = new can.Deferred();
	     this.localStore(function(todos){
	       attrs.id = attrs.id || parseInt(100000 *Math.random());
	       todos.push(attrs);
	     });
	     def.resolve({id : attrs.id});
	     return def
	   },

	   update: function(id, attrs){
	     var def = new can.Deferred();
	     this.localStore(function(todos){
	       for (var i = 0; i < todos.length; i++) {
	         if (todos[i].id === id) {
	           var todo = todos[i];
	           break;
	         }
	       }
	       can.extend(todo, attrs);
	     });
	     def.resolve({});
	     return def
	   }
	},{});
});