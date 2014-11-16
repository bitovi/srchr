@module {function():ui/list} ui/list
@parent srchr
@test ui/list/test.html
@inherits can.Control

`new List(element, options)` lists search results
for a given model, but only when the current
element is visible.

```
var params = can.compute({
  query: "Cats"
});

$("#google-results").hide();

new List("#google-results",{
  modelType: Google,
  resultTemplate: can.view.ejs("<h2><%= title %></h2>"),
  params: params
});

$("#google-results").trigger("show").show()
```

@demo ui/list/list.html
@param {HTMLElement} element the element to show results within.
@param {Object} options An object of the following options:

#### modelType `can.Model`

A [can.Model] with a `.findAll` method that can be used to retrieve
the search results.

#### resultTemplate `can.view`

A template that is passed an individual instance of the search
results.  The template should provide the html for that single instance.

### params `can.compute`

The params that should be passed to `Model.findAll`.
