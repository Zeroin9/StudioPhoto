'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
        Carousel Slider
    --------------------*/
    var hero_s = $(".hs-slider");
    hero_s.owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        items: 1,
        dots: false,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        navText: ['<span class="arrow_carrot-left"></span>', '<span class="arrow_carrot-right"></span>'],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true
    });

    /*------------------
        Preview Slider
    --------------------*/
    // for 1 pics on screen
    $(".preview-slider.1pic").owlCarousel({
        loop: true,
        margin: 20,
        items: 1,
        dots: false,
        nav: true,
        navText: ['<span class="arrow_carrot-left"></span>', '<span class="arrow_carrot-right"></span>'],
        stagePadding: 120,
        smartSpeed: 1200,
        autoWidth: false,
        autoHeight: false,
        autoplay: true,
        responsive: {
            0: {
                items: 1,
                stagePadding: 0
            },
            768: {
                items: 1,
                stagePadding: 0
            },
            992: {
                items: 1
            },
            1200: {
                items: 1
            }
        }
    });

    // for 2 pics on screen
    $(".preview-slider.2pic").owlCarousel({
        loop: true,
        margin: 20,
        items: 2,
        dots: false,
        nav: true,
        navText: ['<span class="arrow_carrot-left"></span>', '<span class="arrow_carrot-right"></span>'],
        stagePadding: 120,
        smartSpeed: 1200,
        autoWidth: false,
        autoHeight: false,
        autoplay: true,
        responsive: {
            0: {
                items: 1,
                stagePadding: 0
            },
            768: {
                items: 1,
                stagePadding: 0
            },
            992: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    });

    // for 3 pics on screen
    $(".preview-slider.3pic").owlCarousel({
        loop: true,
        margin: 20,
        items: 3,
        dots: false,
        nav: true,
        navText: ['<span class="arrow_carrot-left"></span>', '<span class="arrow_carrot-right"></span>'],
        stagePadding: 120,
        smartSpeed: 1200,
        autoWidth: false,
        autoHeight: false,
        autoplay: true,
        responsive: {
            0: {
                items: 1,
                stagePadding: 0
            },
            768: {
                items: 1,
                stagePadding: 0
            },
            992: {
                items: 2
            },
            1200: {
                items: 3
            }
        }
    });

    /*------------------
        Image Popup
    --------------------*/
    $('.image-popup').magnificPopup({
        type: 'image'
    });

    /*------------------
        Timepick buttons
    --------------------*/
    var btn10 = $('#at10');
    var btn12 = $('#at12');
    var btn15 = $('#at15');
    var hideBtn = $('#timepickValue');

    var btn10Select = function () {
        btn10.addClass("select");
        btn12.removeClass("select");
        btn15.removeClass("select");
        hideBtn.attr("value", "10:00");
    };

    var btn12Select = function () {
        btn10.removeClass("select");
        btn12.addClass("select");
        btn15.removeClass("select");
        hideBtn.attr("value", "12:30");
    };

    var btn15Select = function () {
        btn10.removeClass("select");
        btn12.removeClass("select");
        btn15.addClass("select");
        hideBtn.attr("value", "15:00");
    };

    $.fn.deSelect = function () {
        btn10.removeClass("off");
        btn10.prop('disabled', false);
        btn12.removeClass("off");
        btn12.prop('disabled', false);
        btn15.removeClass("off");
        btn15.prop('disabled', false);
        btn10.removeClass("select");
        btn12.removeClass("select");
        btn15.removeClass("select");
        hideBtn.attr("value", "");
    };

    btn10.click(btn10Select);
    btn12.click(btn12Select);
    btn15.click(btn15Select);

/*------------------
        Date Picker
    --------------------*/
    var mydatepicker = $('#datepicker');
    mydatepicker.datepicker({
        weekStart: 1,
        startDate: "today",
        language: "ru",
        daysOfWeekDisabled: "0,6",
        daysOfWeekHighlighted: "6,0",
        autoclose: true,
        todayHighlight: true,
        format: "yyyy-mm-dd",
    });
    mydatepicker.change(function () {
        console.log('change');
        $.fn.deSelect();
        $.ajax({
                type: 'POST',
                url: "http://z3r0ing.pythonanywhere.com/test",
                data: {date: mydatepicker.val(), room: $('#room_form').val(), csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").attr('value')},
                dataType: 'json',
                success: function(response) {
                    if (response['time_list'].includes("10:00")) {
                        btn10.addClass("off");
                        btn10.prop('disabled', true);
                    }
                    if (response['time_list'].includes("12:30")) {
                        btn12.addClass("off");
                        btn12.prop('disabled', true);
                    }
                    if (response['time_list'].includes("15:00")) {
                        btn15.addClass("off");
                        btn15.prop('disabled', true);
                    }
                },
                error: function (response) {
                      alert(response.responseJSON.errors);
                      console.log(response.responseJSON.errors)
                }
            });
    });

    /*
    */
    let regex = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    $('#booking').submit(function () {
        let phone = $('#phone_number').val();
        if(!regex.test(phone)) {
            alert('Номер указан не верно!');
            return;
        }
        var form_data = {
            room: $('#room_form').val(),
            guest_name: $('#guest_name').val(),
            phone_number: $('#phone_number').val(),
            date: mydatepicker.val(),
            time: $('#timepickValue').val(),
            services: $('#adds-pick').val(),
            csrfmiddlewaretoken: $("[name='csrfmiddlewaretoken']").attr('value')
        }
        $.ajax({
                type: 'POST',
                url: "http://z3r0ing.pythonanywhere.com/add_book",
                data: form_data,
                dataType: 'json',
                success: function(response) {
                    alert("Вы записаны на " + response.date + " " + response.time);
                },
                error: function (response) {
                    alert(response.responseJSON.errors);
                    console.log(response.responseJSON.errors)
                }
            });

    });

})(jQuery);