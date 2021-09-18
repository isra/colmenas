$(document).ready(function(){
    "use strict"; // Start of use strict

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $(document).on('click', 'a.page-scroll', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Offset for Main Navigation
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

    // Initialize and Configure Scroll Reveal Animation
    window.sr = ScrollReveal();
    sr.reveal('.sr-icons', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
    }, 200);
    sr.reveal('.sr-button', {
        duration: 1000,
        delay: 200
    });
    sr.reveal('.sr-contact', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
    }, 300);

    $('form').submit(function(event){
        event.preventDefault();
        var data = $(this).serialize();
        var url = 'https://www.colmenasapp.com/main/contact';
        //var url = 'http://localhost:5000/main/contact';
        $("form :input").attr("disabled", true);
        $('.alert.alert-danger').addClass('hide');
        $('.alert.alert-danger').empty();
        $.post(url, data, 'json')
        .done(function(result){
            if (result.status) {
                $('.alert.alert-success').removeClass('hide').children('strong').text(result.data.message);
            } else {
                $("form :input").attr("disabled", false);
                if (typeof result.data.message === "string") {
                    $('.alert.alert-danger').removeClass('hide').append('<i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' + result.data.message);
                } else {
                    $('.alert.alert-danger').removeClass('hide');
                    result.data.message.forEach(function(msg){
                        $('.alert.alert-danger').append(' <i class="fa fa-exclamation-circle" aria-hidden="true"></i> ' + msg);
                    });

                }

            }
        })
        .fail(function(err, msg){console.log('error save form',err,msg);});

    });
});