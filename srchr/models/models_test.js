steal('test/qunit.js', './models.js', function (QUnit, models) {

  QUnit.module("srchr/models")

  for(var name in models) {
    (function (name, Model) {

      test(name + ".findAll", function () {
        stop();
        Model.findAll({ query: "Cats" }, function (results) {
          ok(results.length);
          start();
        })
      });

    })(name, models[name]);
  }
});
