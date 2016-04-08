'use strict';
module.exports = function(grunt){

    grunt.initConfig({
        webpack:{
            reservation:{
                entry:"./src/index.js",
                output:{
                    path:"out",
                    filename:"index.js"
                },
                module:{
                    loaders:[
                        {
                            test:/\.js$/,
                            exclude:/node_modules/,
                            loader:'babel',
                            query:{
                                presets:["es2015"]
                            }
                        }
                    ]
                }
            }
        },
        watch:{
            reservation:{
                files:['./src/*.js'],
                tasks:['webpack']
            }
        }
    });
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.registerTask("default", ["webpack", "watch"]);
};


