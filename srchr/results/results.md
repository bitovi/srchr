@module {function():srchr/results} srchr/results
@parent srchr
@alias Results  
@test srchr/results/test.html
@inherits can.Control

`new Results(element, options)` shows the currentSearch's
search results in a tabbed interface. It
combines [ui/list] and [ui/tabs].

```
var currentSearch = can.compute({
  query: "cats",
  types: ["Google","Twitter"]
});

new Results("#results",{
  currentSearch: currentSearch
});
```

@demo srchr/results/results.html
@param {HTMLElement} element the elements to put the results in.
@param {Object} an options object with the `currentSearch` compute
