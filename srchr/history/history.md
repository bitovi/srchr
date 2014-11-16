@module {function():srchr/history} srchr/history
@parent srchr
@inherits can.Control
@test srchr/history/test.html

Saves a list of [srchr/models/history] instances
in local storage and allows you to remove these
instances and set them as the new `currentSearch`.

Create a `History` control with a compute representing
the current search like:

```
var currentSearch = can.compute(
      new Search({
        query: "ice cream",
        types: ["Flickr","Google"]})
);
new History("#list", {
  currentSearch: currentSearch
});
```

@demo srchr/history/history.html

@prototype
