(function ($) {
	"use strict";

	if($('.menu-trigger').length){
		$(".menu-trigger").on('click', function() {	
			$(this).toggleClass('active');
			$('.header-area .menu li').slideToggle(200);
		});
	}

	$('.main-banner').slick({
		slide: 'div',
		infinite : true,
		slidesToScroll : 1,
		speed : 100,
		arrows : true,
		dots : true,
		autoplay : true,
		autoplaySpeed : 10000,
		pauseOnHover : true,
		vertical : false,
		dotsClass : "slick-dots",
		draggable : true,
		responsive: [
			{
				breakpoint: 960,
				settings: {

					slidesToShow:3
				}
			},
			{
				breakpoint: 768,
				settings: {

					slidesToShow:2
				}
			}
		]
	});

	const percentPerUnit = 31;
	$(".university-progress .progress-bar").each(function(i, iv) {
		let percent = $(iv).data("completePercent");
		$(iv).find(".runner").css("transform", `translateX(calc(${percent} * ${percentPerUnit}%))`);
	});

})(window.jQuery);
