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

    testee: {
      options: {
        browsers: ['firefox']
      },
      phantom: ['test/index.html']
    }
  });

  grunt.loadNpmTasks('steal-tools');
  grunt.registerTask('test', [ 'testee:phantom' ]);
  grunt.registerTask('build', [ 'stealBuild' ]);

  grunt.loadNpmTasks('testee');
};
