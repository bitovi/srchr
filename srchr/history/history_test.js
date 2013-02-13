steal('funcunit', 'srchr/history', 'srchr/models/history.js', function( S, History, HistoryModel ) {
	module("srchr/history", {
		setup: function() {
			$("<div id='content'/>" + "<form id='todoForm' action=''>" + "<input type='text' id='description'>" + "<input type='submit' value='Create Todo' /></form>").appendTo(document.body);

			new History("#content", {
				titleHelper: function( history ) {
					return history.description;
				}
			});

			$("#todoForm").submit(function( ev ) {
				ev.preventDefault();

				// remove the error class
				$("input#description").removeClass("error");

				// validate
				if (!$("#description").val().length ) {
					$("input#description").addClass("error");
					return false;
				}

				var todo = new HistoryModel({
					description: $("#description").val()
				});

				todo.save();

				$("#description").val("")[0].focus();
			});
		},
		teardown: function() {
			$("<div id='content'/>").remove();
			$("#todoForm").remove();
		}
	});


	test("Add and remove history", function() {
		S("input#description").type("New");
		S("input[type=submit]").click("Submit the form", function() {
			S("#content ul li span").html("New", "Correct list item title");

			// delete all todos
			$("#content ul li a.remove").each(function() {
				S(this).click();
			});

			S("#content ul li").size(0, "all todos deleted");
		});
	});

	test("Test localStorage", function() {
		S("#content ul").visible(function() {
			console.log("before", localStorage.getItem('search-history-store'));
			ok(localStorage.getItem('search-history-store').length > 0, "Length is set to zero");
		});

		// S("input#description").type("New");
		// S("input[type=submit]").click("Submit the form", function(){
		// 	console.log("after", localStorage.getItem('search-history-store'));
		// 	ok(localStorage.getItem('search-history-store').length > 0, "Length is set to zero");
		// });
		//S("#content ul li:")
		// wait for the li to appear
		// S("ul li:last").visible(function(){
		// 	equal($("ul li:last span").html(), "New", "Correct List item title");
		// })
	});
});