module.exports = function(grunt) {
  grunt.initConfig({
    testee: {
      options: {
        browsers: ['firefox']
      },
      phantom: ['test/index.html']
    }
  });

  grunt.registerTask('test', ['testee:phantom']);
  grunt.loadNpmTasks('testee');
};
