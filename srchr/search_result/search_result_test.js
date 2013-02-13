steal('./search_result.js','funcunit', function(SearchResult, S){
	
module("srchr/search_result",{
	setup : function(){
		S.open('//srchr/search_result/search_result.html')
	}
})

test("results shown", function(){
	S("#searchVal").type("search\r");
	S("li").exists(function(){
		ok(true, "results have been shown");
	})
})

test("results not shown when hidden", function(){
	S("#toggle").click();
	S("#searchVal").type("search\r");
	S.wait(20, function(){
		equals(S('li').size(), 0, "there are no li's")
	});
});

test("don't query when hidden", function(){
	S("#searchVal").type("search\r");
	S("li").exists(function(){
		ok(true, "results have been shown")
	})
	S("#toggle").click();
	S("#searchVal").type("\r");
	S.wait(20, function(){
		equals(S('#searchNum').text(), "1", "only 1 query")
		
	})
	
})
	
})

"<ul><li><a href='#apples'>Apples</a></li>"+
"<li><a href='#oranges'>Oranges</a></li>"

"</ul><div id='apples'></div><div id='oranges'></div>"


var Tabs = function(element){
  if(!element){ return }
  this.element = element
  this.init()
}

Tabs.prototype ={
  init: function(){
    var lis = this.element.querySelectorAll("li"),
 		self = this;
    for(var i = 0 ; i< lis.length; i++ ){
    	   if(i > 0) {
   		  tab(lis[i]).style.display = "none"
    	   } else {
    	   	  this.active = lis[i];
    	   }
    }
    this.bind();
  },
  tab : function(li){
  	document.querySelector( li.querySelector("a").getAttribute("href") )
  },
  bind : function(){
  	var self = this;
  	this.element.querySelectorAll("li").forEach(function(li){
  		li.addEventListener("click",function(){
    	   		self.activate(this)
    	   },false)
  	})
  },
  activate: function(li){
  	self.tab( this.active ).style.display = "none"
	self.tab( li.querySelector("a") ).style.display = "block";
	self.active = li;
  }
}

HistoryTabs = function(element){
  if(!element){ return }
  Tabs.apply( this, arguments)
}
HistoryTabs.prototype = new Tabs

HistoryTabs.prototype.init = function(){
	Tabs.prototype.init.apply(this, arguments);
	
	if(window.location.hash){
		tab(this.active).style.display = "none";
		
		var li = document.querySelector("a[href=" +window.location.hash+"]").parentNode;
		this.active = li;
		tab(li).style.display = "block";
	}
}
HistoryTabs.prototype.bind = function(){
	var self;
	window.addEventListener("hashchange", function(){
		self.activate( document.querySelector("a[href=" +window.location.hash+"]").parentNode );
	})
}







