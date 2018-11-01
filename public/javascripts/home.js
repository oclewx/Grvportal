$(document).ready(function(){

	$('.forms').hide();

	  // Add smooth scrolling to link
 		$("#contact").on('click', function() {

        $('html, body').animate({
        	scrollTop: $('#contact-page').offset().top
      	}, 800);
        return false;
  });

	  // Add smooth scrolling to link
 		$("#about").on('click', function() {

        $('html, body').animate({
        	scrollTop: $('#about-us').offset().top
      	}, 800);
        $('.head').addClass('headcolor');
        return false;
  });

 	  // Add smooth scrolling to link
 		$("#home-page, #totop").on('click', function() {

        $('html, body').animate({
        	scrollTop: $('#home').offset().top
      	}, 800);
        $('.head').removeClass('headcolor');
        return false;
  });

// to fadeIn the form on click on any list of items...
 	$('li').click(function(){
 		$('.forms').fadeIn(800);
 	});

// to get login forms of each category individually...
 	$('#admin').click(function(){
 		$('#1l').fadeIn(1000);
 		$('#2l, #3l, #4l, #5l, #6l, #7l, #3r, #5r, #6r, #7r').hide();
 	});

 	$('#management').click(function(){
 		$('#2l').fadeIn(1000);
 		$('#1l, #3l, #4l, #5l, #6l, #7l, #3r, #5r, #6r, #7r').hide();
 	});

 	$('#faculty').click(function(){
 		$('#3l').fadeIn(1000);
 		$('#2l, #1l, #4l, #5l, #6l, #7l, #3r, #5r, #6r, #7r').hide();
 	});

 	$('#grievance_cell_staff').click(function(){
 		$('#4l').fadeIn(1000);
 		$('#2l, #3l, #1l, #5l, #6l, #7l, #3r, #5r, #6r, #7r').hide();
 	});

 	$('#student').click(function(){
 		$('#5l').fadeIn(1000);
 		$('#2l, #3l, #4l, #1l, #6l, #7l, #3r, #5r, #6r, #7r').hide();
 	}); 
 	
 	$('#parent').click(function(){
 		$('#6l').fadeIn(1000);
 		$('#2l, #3l, #4l, #5l, #1l, #7l, #3r, #5r, #6r, #7r').hide();
 	});	

 	$('#nonteaching').click(function(){
 		$('#7l').fadeIn(1000);
 		$('#2l, #3l, #4l, #5l, #6l, #1l, #3r, #5r, #6r, #7r').hide();
 	});

 // to get the registration form of each category....

 	$('#r3').click(function(){
 		$('#3r').fadeIn(1000);
 		$('#2l, #3l, #4l, #5l, #6l, #1l, #7l, #5r, #6r, #7r').hide();
 	});

 	$('#r5').click(function(){
 		$('#5r').fadeIn(1000);
 		$('#2l, #3l, #4l, #5l, #6l, #1l, #3r, #7l, #6r, #7r').hide();
 	});

 	$('#r6').click(function(){
 		$('#6r').fadeIn(1000);
 		$('#2l, #3l, #4l, #5l, #6l, #1l, #3r, #5r, #7l, #7r').hide();
 	});

 	$('#r7').click(function(){
 		$('#7r').fadeIn(1000);
 		$('#2l, #3l, #4l, #5l, #6l, #1l, #3r, #5r, #6r, #7l').hide();
 	});

  $('.open').click(function(){
    $('.options').fadeToggle(500);
  });

  $(window).resize(function(){
    if ($(window).width() > 900) {
      $('.options').fadeIn(500);
    }
  });

//change the dot under the top bar icons when scrolled down to another div...
    $(window).scroll(function() {
        var scroll = $(window).scrollTop(); // how many pixels you've scrolled
        var os = $('.information').offset().top; // pixels to the top of div1
        var ht = $('.information').height(); // height of div1 in pixels
        // if you've scrolled further than the top of div1 plus it's height
        // change the color. either by adding a class or setting a css property
        if(scroll > 0.75*os && scroll < os + ht){
            $('#home-page, #contact').removeClass('under-dot');
            $('#about').addClass('under-dot');
            $('.head').addClass('headcolor');
        }
        else if(scroll >= os + ht){
            $('#home-page, #about').removeClass('under-dot');
            $('#contact').addClass('under-dot');
        }
        else{
            $('#about, #contact').removeClass('under-dot');
            $('#home-page').addClass('under-dot');
            $('.head').removeClass('headcolor');
        }
    });

 //this is for getting the left border in every list option...
  	var headerr = document.getElementById("options");
var btnss = headerr.getElementsByClassName("btn");
for (var i = 0; i < btnss.length; i++) {
  btnss[i].addEventListener("click", function() {
    var currentt = document.getElementsByClassName("1");
    currentt[0].className = currentt[0].className.replace(" 1", "");
    this.className += " a";
  });
}
// Add active class to the current button (highlight it)
var header = document.getElementById("options");
var btns = header.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("a");
    current[0].className = current[0].className.replace(" a", "");
    this.className += " a";
  });
}

});