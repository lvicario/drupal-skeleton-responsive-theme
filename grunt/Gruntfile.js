module.exports = function(grunt) {

    // URI paths for our tasks to use.
    grunt.src = '../src/';
    grunt.dest = '../';
    grunt.siteRoot = '../../../../';
    

    /************************
     *Eiger Framework Assets*
     ************************/
    var JS = {

        // Will be rendered into 1 file
        head:[
            grunt.siteRoot + 'base/sites/all/modules/custom/eiger/assets/js/head/modernizr.custom.js',
            grunt.siteRoot + 'base/sites/all/modules/custom/eiger/assets/js/head/picturefill.js',
            grunt.siteRoot + 'base/sites/all/modules/custom/eiger/assets/js/head/respond.min.js',
        ],

        // Combine other or default tails
        base: [
            grunt.siteRoot + 'base/sites/all/modules/custom/matterhorn_framework/matterhorn_framework.js',
            grunt.siteRoot + 'base/sites/all/modules/custom/matterhorn_account/js/matterhorn_account.js',
            grunt.siteRoot + 'base/sites/all/modules/contributed/jreject/jReject/js/jquery.reject.js',
        ],

        // Registration Form specific JS
        registration_form: [
            // grunt.siteRoot + 'misc/form.js',
            grunt.siteRoot + 'base/sites/all/modules/contributed/captcha/captcha.js',
            // grunt.siteRoot + 'base/sites/default/modules/matterhorn_registration/js/matterhorn_registration.validators.js',
            // grunt.siteRoot + 'base/sites/all/modules/custom/matterhorn_forms/scripts/matterhorn_forms.validators.js',
            grunt.siteRoot + 'base/sites/all/modules/contributed/clientside_validation/jquery-validate/jquery.validate.min.js',
            grunt.siteRoot + 'base/sites/default/modules/matterhorn_captcha_refresh/matterhorn_captcha_refresh.js',
            // Password Meter
            grunt.src + 'js/vendor/jquery.validate.password.js',
        ],

        // Registration Form Additional JS
        registration_form_additional: [
            grunt.siteRoot + 'base/sites/all/modules/contributed/clientside_validation/clientside_validation.ie8.js',
            grunt.siteRoot + 'base/sites/all/modules/contributed/clientside_validation/clientside_validation.js'
        ],
        
        // custom and lib will be rendered into 1 file
        custom:[
            grunt.siteRoot + 'base/sites/all/modules/custom/eiger/assets/js/custom/jquery.menubile.js',
            grunt.siteRoot + 'base/sites/all/modules/custom/eiger/assets/js/custom/eiger.js',
            grunt.siteRoot + 'base/sites/all/modules/custom/eiger/assets/js/custom/eiger_accordion.js',
            grunt.src + 'js/custom/registration.js'
        ],
        lib:[
            // grunt.siteRoot + 'base/sites/all/modules/custom/eiger/assets/js/vendor/jquery.menubile.js',
            grunt.src + 'js/vendor/jquery.ui.core.js',

            // Date Picker
            grunt.src + 'js/vendor/jquery.ui.datepicker.js',
            grunt.src + 'js/vendor/ui_date_localization/datepicker-eu.js',
            grunt.src + 'js/vendor/ui_date_localization/datepicker-zh-CN.js',
            grunt.src + 'js/vendor/ui_date_localization/datepicker-zh-TW.js',
            grunt.src + 'js/vendor/ui_date_localization/datepicker-th.js',
            grunt.src + 'js/vendor/ui_date_localization/datepicker-vi.js',
            grunt.src + 'js/vendor/ui_date_localization/datepicker-id.js',
            grunt.src + 'js/vendor/ui_date_localization/datepicker-ja.js',
            grunt.src + 'js/vendor/ui_date_localization/datepicker-ko.js',
            grunt.src + 'js/vendor/ui_date_localization/datepicker-hi.js',
            grunt.src + 'js/vendor/ui_date_localization/datepicker-el.js',
            grunt.src + 'js/vendor/ui_date_localization/datepicker-pl.js',
            grunt.src + 'js/vendor/ui_date_localization/datepicker-ro.js',
            grunt.src + 'js/vendor/ui_date_localization/datepicker-ru.js',

            // Checkbox and Select Plugin
            grunt.src + 'js/vendor/jquery.ezmark.js',
            grunt.src + 'js/vendor/jquery.stylish-select.js',
        ],
    };

    var SASS = {
        watchFiles:[
            grunt.src + 'sass/**/*.scss'
        ],
        configFiles:{
            minified: {
                expand: true,
                cwd: grunt.src + 'sass/',
                src: ['**/*.scss'],
                dest: grunt.dest + 'css',
                ext: '.css'
            }
        }
    };

    var IMAGES = {
        watchFiles:[
            grunt.src + 'images/**/*.{png,jpg,gif}'
        ],
        configFiles:{
            expand: true,
            cwd: grunt.src + 'images/',
            src: ['**/*.{png,jpg,gif}'],
            dest: grunt.dest + 'images/'
        }
    };

    /************************
     *Eiger Framework Assets*
     ************************/

    /**
     * Start init Config for grunt here
     */
    grunt.initConfig({
        
        /**
         * Package info
         */
        pkg: grunt.file.readJSON('package.json'),

        /**
         * Init Concat
         */
        concat: {
            options: {
                separator: ';',
            },
            head: {
                src: JS.head,
                dest: grunt.dest + 'js/head.concatenated.js',
            },
            registration_form: {
                src: JS.registration_form,
                dest: grunt.dest + 'js/registration_form.concatenated.js',
            },
            // registration_form_additional: {
            //     src: JS.registration_form_additional,
            //     dest: grunt.dest + 'js/registration_form_additional.concatenated.js',
            // },
            basic: {
                src: JS.lib.concat(JS.base).concat(JS.custom),
                dest: grunt.dest + 'js/tail.concatenated.js',
            }
        },


        /**
         * Init Uglify
         */
        uglify: {
            options: {
                mangle: false
            },
            dist: {
                files: {
                    '../js/tail.min.js': ['../js/tail.concatenated.js'],
                    '../js/head.min.js': ['../js/head.concatenated.js'],
                    '../js/registration_form.min.js': ['../js/registration_form.concatenated.js'],
                    // '../js/registration_form_additional.min.js': ['../js/registration_form_additional.concatenated.js'],
                    // '../js/vendor.min.js': ['../js/vendor.concatenated.js'],
                }
            }
        },

        /**
         * Init JShint
         */
        jshint: {
            custom: [
                grunt.src + 'js/custom/**/*.js', 
                grunt.src+'js/head/**/*.js'
            ]
        },


        /**
         * Init SASS
         */
        sass: {
            dist: {
                options: {
                    style: 'compressed' // 'nested', 'compact', 'expanded', 'compressed'
                },
                files:[SASS.configFiles.minified],
            }
        },


        /**
         * Init Imagemin
         */
        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 7
                },
                files:[IMAGES.configFiles]
            }
        },

        // Watch
        watch: {
            css: {
                /**
                 * Original grunt watch files.   
                 * files: ['src/sass/*', 'src/sass/components/*', 'src/sass/plugins/*', 'src/sass/sections/*', 'src/sass/vendor/*'],
                 */
                files: SASS.watchFiles,
                tasks: ['sass']
            },
            script: {

                // Include the project JS to be watched, for simplicity we'll only watch the eiger and project head and custom js 
                files: JS.custom.concat(JS.head),
                tasks: ['concat', 'uglify']
            },
            image: {
                files: [grunt.src + 'images/**/*.{png,jpg,gif}'],
                tasks: ['imagemin']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('script', ['concat', 'uglify']);
    grunt.registerTask('code', ['script', 'sass']);    
    grunt.registerTask('all', ['concat', 'uglify', 'sass', 'imagemin']);
};