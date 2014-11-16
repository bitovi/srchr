@module {function():ui/tabs} ui/tabs
@parent srchr
@inherits can.Control
@test ui/tabs/test.html
@alias Tabs
@description

A Tabs widget for showing and hiding content.

@signature `new Tabs(element, options)`

@param {jQuery|HTMLElement|String} element An element the
tabs will be created on.

@param {{enabled:can.compute}} options A object of option name-value pairs.

@option {can.compute} enabled

Enabled is a can.compute that specifies which tabs should be enabled. The
compute should return an array of tab content ids.

@body

## Use

Given
content like:

```
<ul id='resultsTab'>
  <li><a href='#flickr'>Flickr</a></li>
  <li><a href='#yahoo'>Yahoo</a></li>
  <li><a href='#upcoming'>Upcoming</a></li>
</ul>

<div id='flickr'></div>
<div id='yahoo'></div>
<div id='upcoming'></div>
```

Create a Tabs like:

```
new Tabs("#resultsTab",{
  enabled: can.compute(["flickr","yahoo"])
});
```

Notice that each `li` should have an `href` that points to an id of
the tab content to be shown.

@demo ui/tabs/tabs.html
