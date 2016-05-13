
(function ($) {

	// Declare public object (for this script). To be used for On Load behavior.
	var mobileHelpers = {
	    // Set cookie lifetime for all persistent cookies.
	    cookieLifetime:(365 * 20)
	};

	/**
	 * Private Browsing detection.
	 */
	mobileHelpers.privateBrowsing = function() {
		var testKey = 'privateBrowsingTest';
		var storage = window.sessionStorage;
		try {
			// Try and catch quota exceeded errors
			storage.setItem(testKey, '1');
			storage.removeItem(testKey);
		} catch (error) {
			if (error.code === DOMException.QUOTA_EXCEEDED_ERR && storage.length === 0) {
				return true;
			}else{
				return false;
			}
		}

		return false;
	};

	if ($("#matterhorn-registration-form").length > 0) {
		Drupal.behaviors.matterhorn_registration_local = {
			attach: function (context, settings) {

				    var weakString = Drupal.t('Weak');
				    var goodString = Drupal.t('Good');
				    var strongString = Drupal.t('Strong');
				    $.validator.passwordRating.messages = {
				        "similar-to-username": weakString,
				        "too-short": weakString,
				        "very-weak": weakString,
				        "weak": weakString,
				        "good": goodString,
				        "strong": strongString
				    }

				// Check private browsing first.
				if(settings.mobile_variables.mobile_private_browsing.private_browsing_flag) {

					if(mobileHelpers.privateBrowsing()) {
						// Remove all content.
						$('body').html('').css({'background':'white'});
						setTimeout(function(){
							alert(settings.mobile_variables.mobile_private_browsing.private_browsing_message);
						}, 50);
					}
				}

	    	}/* Drupal.behaviors.matterhorn_registration */

	    }/* Drupal.behaviors.matterhorn_registration */
	}



	// Global Variables for Mobiles
	var windowWidth = $(window).width(),
		windowHeight = $(window).height();

	// Allow :active styles to work in CSS on a page in Mobile Safari
	document.addEventListener("touchstart", function(){}, true);


	// Detect event using user agent for touchend & click for Ipad
	var ua = navigator.userAgent,
		eventOnClick = (ua.match(/iPad/i)) ? "touchend" : "click";


	// Get the current path
	var currentPath = window.location.pathname;

	/**
	 * Added wrapper to select element for styling
	 */
	// $('select').wrap('<span class="select"></span>');
	

	/**
	 * Stylish Select
	 */
	var styleSelect = $('select').sSelect({
		ddMaxHeight: '300px'
	});

	

	/**
	 * jQuery UI - Datepicker
	 */
	var birthDateField = $(".form-item-birthdate .form-text");

	var datepickerLang = Drupal.settings.pathPrefix.replace('/','');
	var languageDateFormat = "dd/mm/yy";
	switch (datepickerLang) {
	    case "sc":
	        datepickerLang = "zh-CN";
	        languageDateFormat = "yy/mm/dd";
	        break;
		case "ch":
	        datepickerLang = "zh-TW";
	        languageDateFormat = "yy/mm/dd";
	        break;
	    case "vn":
	        datepickerLang = "vi";
	        break;
	    case "jp":
	        datepickerLang = "ja";
	        break;
	    case "kr":
	        datepickerLang = "ko";
	        break;
	    case "gr":
	        datepickerLang = "el";
	        break;
	    case "th":
	        datepickerLang = "th";
	        break;
		case "id":
	        datepickerLang = "id";
	        break;
	    case "pl":
	        datepickerLang = "pl";
	        break;
	    case "ro":
	        datepickerLang = "ro";
	        break;
	    case "ru":
	        datepickerLang = "ru";
	        break;
	    default:
	    	datepickerLang = "";
	    	break;
	}

	var maxDate = new Date();
	maxDate.setFullYear(maxDate.getFullYear() - 18, maxDate.getMonth() + 1, 0);

	var datepickerOptions = {
		changeMonth: true,
		changeYear: true,
		yearRange : '1900:-18',

		showOn: "button",
		buttonImage: "/sites/default/themes/central_registration/images/calendar.png", 
		// buttonImage: "../images/calendar.png", // ==Phase 2==  For static page
		buttonImageOnly: true,
		buttonText: "Select date",

		// set minimum date to 1900
		minDate  : new Date('1900-01-01'),
		maxDate  : maxDate,

		dateFormat: languageDateFormat,

		onSelect: function(date) {

			var datetime = Date.parse($(this).datepicker('getDate'));
			var date = new Date(datetime);

			// alert((date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear());
			$('input[name=birthmonth]').val(date.getMonth() + 1);
			$('input[name=birthday]').val(date.getDate());
			$('input[name=birthyear]').val(date.getFullYear());

			birthdateTextField = $('#edit-birthdate');
			birthdateTextField.trigger('blur');
			birthdateTextField.siblings('.mark').trigger('mouseout');

		},
		onClose: function() {

			// Validate On Close
			birthdateTextField = $('#edit-birthdate');
			birthdateTextField.trigger('blur');
			birthdateTextField.siblings('.mark').trigger('mouseout');
		},

	}

	// merging two objects into new object
	var datepickerOptionsLanguages = $.extend({}, datepickerOptions, $.datepicker.regional[datepickerLang]);

	// Datepicker init
	birthDateField.datepicker(datepickerOptionsLanguages);

	// Moved datepicker markup from the bottom of <body> to inside the birthdate form item.
    $('.ui-datepicker').insertAfter('.form-item-birthdate .form-text');
    $('#edit-birthdate').attr('maxlength', 10);

    //add restrictions here
    if(languageDateFormat == 'dd/mm/yy')
    {
    	$('#edit-birthdate').keyup(function(){

    		var textval = $('#edit-birthdate').val();
    		var key = event.keyCode || event.charCode;
    		
    		//check pattern
    		if((/^(\d{2})$/.test(textval) || /^(\d{2})\/(\d{2})$/.test(textval)) && key != 8) // matches dd and dd/mm
    		{
    			$('#edit-birthdate').val(textval + "/");
    		}
    		else if((/^(\d{2})\/(\d{2})\/$/.test(textval) || /^(\d{2})\/$/.test(textval)) && key == 8) // matches dd/ and dd/mm/ when backspace is pressed
    		{
    			$('#edit-birthdate').val(textval.slice(0, -1));
    		}
    		else if((/^(\d{2})\/(\d{2})$/.test(textval) || /^(\d{2})$/.test(textval)) && key == 8) // matches dd and dd/mm when backspace is pressed
    		{
    			$('#edit-birthdate').val(textval.slice(0, -1));
    		}
    		else if(/^(\d{3})$/.test(textval) || /^(\d{2})\/(\d{3})$/.test(textval))
    		{
    			$('#edit-birthdate').val(textval.slice(0, -1) + '/' + textval.substr(textval.length - 1));
    		}

    		//render the values for birth day, month and year if character count is 10
    		if(textval.length == 10)
    		{
    			//breakdown date
    			var dateArr = textval.split('/');
                var year = parseInt(dateArr[2]);
                var month = parseInt(dateArr[1]) - 1;
                var day = parseInt(dateArr[0], 10);

    			var date = new Date(year, month, day);	

                $('input[name=birthmonth]').val(date.getMonth() + 1);
				$('input[name=birthday]').val(date.getDate());
				$('input[name=birthyear]').val(date.getFullYear());
    		}
    	});
	}
	else
	{
		$('#edit-birthdate').keyup(function(){

    		var textval = $('#edit-birthdate').val();
    		var key = event.keyCode || event.charCode;
    		
    		//check pattern
    		if((/^(\d{4})$/.test(textval) || /^(\d{4})\/(\d{2})$/.test(textval)) && key != 8) // matches dd and dd/mm
    		{
    			$('#edit-birthdate').val(textval + "/");
    		}
    		else if((/^(\d{4})\/(\d{2})\/$/.test(textval) || /^(\d{4})\/$/.test(textval)) && key == 8) // matches dd/ and dd/mm/ when backspace is pressed
    		{
    			$('#edit-birthdate').val(textval.slice(0, -1));
    		}
    		else if((/^(\d{4})\/(\d{2})$/.test(textval) || /^(\d{4})$/.test(textval)) && key == 8) // matches dd and dd/mm when backspace is pressed
    		{
    			$('#edit-birthdate').val(textval.slice(0, -1));
    		}
    		else if(/^(\d{5})$/.test(textval) || /^(\d{4})\/(\d{3})$/.test(textval))
    		{

    			$('#edit-birthdate').val(textval.slice(0, -1) + '/' + textval.substr(textval.length - 1));
    		}

    		//render the values for birth day, month and year if character count is 10
    		if(textval.length == 10)
    		{
    			//breakdown date
    			var dateArr = textval.split('/');
                var year = parseInt(dateArr[0]);
                var month = parseInt(dateArr[1]) - 1;
                var day = parseInt(dateArr[2], 10);

    			var date = new Date(year, month, day);	

                $('input[name=birthmonth]').val(date.getMonth() + 1);
				$('input[name=birthday]').val(date.getDate());
				$('input[name=birthyear]').val(date.getFullYear());
    		}
    	});
	}

	// Remove focus on datepicker input field upon clicking datepicker icon.
	// Thus, keypad in mobile devices doesn't display while calendar is presented.
	$('.ui-datepicker-trigger').on(eventOnClick, function() {
    	$(this).siblings('input').prop('readonly', true);
    });

    $(document).on(eventOnClick, '.hasDatepicker', function(event) {

    	var $this = $(this);

    	// hide datepicker calendar if it's already visible upon clicking datepiker textfield
    	if ($("#ui-datepicker-div").is(":visible")) {
	    	$('.ui-datepicker-trigger').trigger('click');
	    }

	    // Display error message if has error
	    if ($this.siblings('.mark').hasClass('error')) {
	    	$this.siblings('.error-message').show();
	    }
    	
    	$this.removeAttr('readonly').focus();
    	
    });

    /**
	 * Captcha
	 */
	 // Move Reload Captcha wrapper inside captcha
	$('.reload-captcha-wrapper').prependTo('.captcha');

	// wrap captcha textfield
	$('#edit-captcha-response').wrap('<div class="edit-captcha-response-wrapper"></div>');


    /**
	 * Language Selector;
	 */
	// ==Phase 2==
	// var languageDropdown = $('.language-selector ul').hide();
	// 	selectorContent = languageDropdown.find('li.active a').clone().addClass('selector'),
	// 	selectorClass = languageDropdown.find('li.active').hide().attr('class'),
	// 	selector = $('.language-selector').prepend(selectorContent).find(".selector").addClass(selectorClass).append("<span class='arrow'></span>").prepend("<span class='flag'></span>");

	// $('html').on(eventOnClick, function() {
	//    languageDropdown.hide();
	// });

	// $('.language-selector a').on(eventOnClick, function(e){
	//      e.stopPropagation();
	// });

	// selector.on('click', function(e) {
	// 	e.preventDefault();		
	// 	languageDropdown.slideToggle(100);
	// });


	/**
	 * EZmark - radio and checkbox
	 */
	$('input[type="radio"]').ezMark();
	$('input[type="checkbox"]').ezMark();

	/**
	 * TEMPORARY - add close button to error messages
	 */
    $('.messages').prepend('<span class="close-messages">x</span>');
    $('.close-messages').css({
    	    "float": "right",
		    "font-size": "23px",
		    "margin-top": "-4px",
		    "font-weight": "bold",
		    "cursor": "pointer"
    });
    $('.close-messages').on('click', function() {
        $(this).closest('div').slideUp(200);
    });


	/** 
	 * Maintenance Page
	 */
    $.fn.equalHeights = function(minHeight, maxHeight, windowHeight) {
        var tallest = (minHeight) ? minHeight : 0;
        var bottom, diffHeight;
        var footerHeight = $('footer').height() + 15;
        
        // var _this is the Element object
        var _this = this;

        this.each(function(i, e) {
            if ($(e).height() > tallest) {
                tallest = $(e).height();
            }
        });

        if ((maxHeight) && tallest > maxHeight) tallest = maxHeight;

        this.each(function(i, e) {
            $(e).height(tallest);
        });
    };

    var maintenanceOptions = $('.maintenance-option li');
    var orientation = '';

    // Retrieved li original mark-up
    var maintenanceContent = $('.maintenance-option').html();


	window.addEventListener("resize", function() {
		$( "#dob" ).attr('focus', 'focus');


		// Maintenance Page
        // Detect orientation
        if($(this).height() > $(this).width()) {
            orientation = 'portrait';
        } else {
            orientation = 'landscape';
        }

        if (maintenanceOptions.length > 0 ) {

            if('portrait' == orientation) {

                // Refresh options
                var newContent = $('.maintenance-option').html(maintenanceContent);

                // Pass the li list for EqualHeight Recomputation
                maintenanceOptions = newContent.find('li');
            }

            maintenanceOptions.equalHeights("", "", $(window).height());
        }

	}, false);

})(jQuery);