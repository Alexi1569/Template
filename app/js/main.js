;
$(document).ready(function($) {
	var windowWidth = $(window).width();

	$(window).resize(function() {
		windowWidth = $(window).width();
		alignFooter();
	})

	window.onload = function () {
		if ($('.footer').length) {
			alignFooter();
		}
	}

	$(document).on('click touchstart', function(event) {
		if ((!$(event.target.closest('.catalog__filter-content')).is(".catalog__filter-content")) && $('.catalog__filter-content').hasClass('active') && (!$(event.target.closest('.catalog__filter-top ')).is(".catalog__filter-top "))) {
			$(".catalog__filter-content").removeClass('active');
		}
		
	});

	if ("ontouchstart" in document.documentElement) {
	    $('body').addClass('touch-device');
	} else {
	    $('body').removeClass('touch-device');
	}

		if ($('.styled-select').length) {
			$('.styled-select').each(function() {
        $(this).selectmenu({
        	appendTo: '.modal-inner',
          position: {
              of: $(this).closest('.form-group'),
              collision: 'flipfit',
              my: 'left-50% top+10',
              at: 'center top+40',
          }
        });
	    });
		}

		if ($('#mobile-menu').length) {
			$('#mobile-menu').mmenu({
				navbars: {
					content : [ "close" ],
				},
				navbar: {
					title: 'Frime'
				}
			});
		}

	function alignFooter() {
		var h = $('.footer').outerHeight();

		$('#page').css({
			'padding-bottom': h + 'px',
		});
	}

	setTimeout(function() {
		$('#mobile-menu').css({
			'opacity': 1,
		})
	}, 1000);


});