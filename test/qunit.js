steal("qunit", "bower_components/qunit/qunit/qunit.css!", function(QUnit) {
  QUnit.config.autorun = false;
  steal.done().then(function() {
    if (window.Testee) {
      Testee.init();
    }
    QUnit.load();
  });

  return QUnit;
});
