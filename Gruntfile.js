module.exports = function ( grunt ) {

    // Public configuration
    grunt.initConfig( {
        pkg: grunt.file.readJSON( 'package.json' ),
        sass: {
            compile: {
                options: {
                    // Boolean: Make Compass imports available and load project configuration.
                    compass: true,
                    // Boolean: include line numbers, useful for debugging styles.
                    lineNumbers: false,
                    // String: nested (default), compact, compressed, or expanded.
                    style: 'compressed'
                },
                files: {
                    'css/screen.css': ['sass/screen.scss']
                }
            }
        },
        uglify: {
            compress: {
                options: {
                    mangle: false
                },
                files: {
                    'js/app.min.js': [ 'js/app.js' ]
                }
            }
        },
        watch: {
            files: [ 'sass/*.scss', 'sass/**/*.scss' ],
            tasks: [ 'sass:compile' ]
        }
    } );

    grunt.loadNpmTasks( 'grunt-contrib-sass' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );

    grunt.registerTask( 'default', [ 'sass:compile' ] );

};