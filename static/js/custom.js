$(function() {
	$(".menu-trigger").on('click', function() {
		$(this).toggleClass('active');
		$('.header-area .menu li').slideToggle(200);
	});

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
		draggable : true
	});

	$(".university-progress .progress-bar .runner").each(function(i, iv) {
		let percent = $(iv).data("completePercent");
		$(iv)[0].style.setProperty("--cs-on-the-go-runner-percent", percent);
	});
});

