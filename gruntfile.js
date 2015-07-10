
module.exports = function (grunt) {
    
    grunt.initConfig({
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec',
                    quiet: false, // Optionally suppress output to standard out (defaults to false) 
                },
                src: ['test/**/*.js']
            }
        },
        
        express: {
            dev: {
                options: {
                    script: 'app.js'
                }
            }
        },
        

        watch: {
            wmocha: {
                files: ['**/*.js'],
                tasks: ['default'],
                options: {
                    spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded 
                }
            }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-express-server');
    //grunt.registerTask('server', ['express:dev', 'mochatest','watch']);
    grunt.registerTask('default', '', function () {
        var taskList = ['mochaTest', "watch"];
        grunt.task.run(taskList);
    });
};
