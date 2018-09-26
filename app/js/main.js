;
jQuery(document).ready(function($) {
	var windowWidth = $(window).width();

	$(window).resize(function() {
		windowWidth = $(window).width();
	});

  $(window).on('load', function() {

  });

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

	$('.only-text-input').bind('keyup blur',function(){
    var node = $(this);
    node.val(node.val().replace(/[^a-zA-Zа-яА-Я]/g,'') ); }
  );

  $('.masked-phone').mask(
    '+99 (999) 999-99-99',
    {
        autoclear: false,
    }
  );

  (function() {
    var acc = document.getElementsByClassName("faq__item-question");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight){
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
  })();

	if ($('.styled-select').length) {
		$('.styled-select').each(function() {
      $(this).selectmenu({
      	appendTo: '.form__group',
        position: {
            of: $(this).closest('.form__group-input'),
            collision: 'flipfit',
            my: 'left-50% top+10',
            at: 'center top+40',
        }
      });
    });
	}

	if ($('#mobile-menu').length) {
		$('#mobile-menu').mmenu({
      extensions: [ 
      	"position-bottom", 
      	"fullscreen", 
      	"listview-50", 
      	"fx-panels-slide-up", 
      	"fx-listitems-drop",
      	 "border-offset"
      ],
      navbar: {
          title: ""
      },
      navbars: [
      	{
          height: 2,
          contenе: [
            '',
          ]
        }, 
        {
          content : ["prev","title", "close"]
        }
      ]
	    }, 
  { });
	}


	setTimeout(function() {
		$('.mobile-menu').css({
			'opacity': 1,
		})
	}, 1000);


});