var app = angular.module('grievances', ['ngRoute']);

app.config(function($routeProvider){

	$routeProvider
	.when('/', {
		templateUrl: '/Parent/grievances.ejs'
	})

	.when('/post', {
		templateUrl: '/Parent/post.ejs'
	})

	.when('/my-account', {
		templateUrl: '/Parent/myaccount.ejs'
	})

	.when('/resetpassword', {
		templateUrl: '/Parent/reset-password.ejs'
	})

	.when('/reports', {
		templateUrl: '/Parent/reports.ejs'
	})

	.otherwise({
		template: 'Not found'
	});

});


$(document).ready(function(){


	var arrow = $(".arrow_up");
	var form = $(".logout");
	var status = false;
	$(".a").click(function(event){
		event.preventDefault();
		if (status==false) {
			arrow.fadeIn();
			form.fadeIn();
			status=true;
		}
		else{
			arrow.fadeOut();
			form.fadeOut();
			status=false;
		}
	})
})