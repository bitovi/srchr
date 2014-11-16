@module {function():ui/placeholder} ui/placeholder
@parent srchr
@test ui/placeholder/test.html
@inherits can.Control

`new Placeholder(element, options)` creates
a placeholder effect for browsers that do not
support it.

```
new Placeholder('#search',{
 placeholder: "Enter search text"
});
```

@demo ui/placeholder/placeholder.html
@param {HTMLInputElement} element
the element to show results within.
@param {Object} options An object of the following options:

#### placeholder `can.Compute` or `String`

The placeholder text of the element.
