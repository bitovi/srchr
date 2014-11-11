steal.config({
  map: {
    "jquery/jquery": "jquery",
    "funcunit/funcunit": "funcunit",
    "qunit/qunit": "qunit"
  },
  paths: {
    "jquery": "bower_components/jquery/dist/jquery.js",
    "can/*": "bower_components/canjs/*.js",
    "jquerypp/*": "bower_components/jquerypp/*.js",
    "funcunit": "bower_components/funcunit/dist/funcunit.js",
    "qunit": "bower_components/qunit/qunit/qunit.js"
  },
  meta: {
    funcunit: {
      exports: "F",
      format: "global",
      deps: [ "jquery" ]
    },
    "qunit": {
      format: "global",
      exports: "QUnit"
    },
    jquery: {
      exports: "jQuery",
      format: "global"
    }
  },
  ext: {
    less: "bower_components/steal/less",
    ejs: "can/view/ejs/system"
  }
});
