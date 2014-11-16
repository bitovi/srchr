@module {} srchr/models
@parent srchr

Returns an object map of `ModelName : Model` pairs.

```
steal('srchr/models',function(models){
  models.Flickr.findAll({})
});
```
