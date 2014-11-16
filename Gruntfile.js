module.exports = function(grunt) {
  grunt.initConfig({
    stealBuild: {
      main: {
        options: {
          system: {
            config: __dirname + '/stealconfig.js',
            main: 'srchr/srchr'
          },
          buildOptions: {
            bundleSteal: true
          }
        }
      }
    },

    documentjs: {
      "sites": {
        "srchr/docs": {
          "glob" : "{srchr,ui}/**/*.{js,md}"
        }
      }
    },

    testee: {
      options: {
        browsers: ['firefox']
      },
      phantom: ['test/index.html']
    }
  });

  grunt.loadNpmTasks('steal-tools');
  grunt.loadNpmTasks('testee');
  grunt.loadNpmTasks('documentjs');

  grunt.registerTask('test', [ 'testee:phantom' ]);
  grunt.registerTask('build', [ 'stealBuild' ]);
  grunt.registerTask('document', [ 'documentjs' ]);
};
