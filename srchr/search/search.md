@module {function():srchr/search} srchr/search
@parent srchr
@inherits can.Control
@test srchr/search/test.html

`new SearchControl(element, options)`
listens to a search form being submitted and
updates `currentSearch` with a new
[srchr/models/search Search] instance.

If another module (ex: [srchr/history]) changes
`currentSearch`, `SearchControl` will update
the search form accordingly.

Other features of `SearchControl` include:

 - basic placeholder functionality
 - search validation

Example:

```
var currentSearch = can.compute();

new SearchControl("#search",{
  currentSearch: currentSearch,
  defaultText: "Enter search text"
});
```

@demo srchr/search/search.html
@param {HTMLElement} element the element to show results within.
@param {Object} options An object of the following options:

#### defaultText `{String}`

The placeholder text.

#### currentSearch `{can.compute}`

The current search that should be performed.
