var app = angular.module('grievances', ['ngRoute']);

app.config(function($routeProvider){

	$routeProvider
	.when('/', {
		templateUrl: '/Gcm/grievances.ejs'
	})

	.when('/post', {
		templateUrl: '/Parent/post.ejs'
	})

	.when('/my-account', {
		templateUrl: '/Gcm/myaccount.ejs'
	})

	.when('/resetpassword', {
		templateUrl: '/Gcm/reset-password.ejs'
	})

	.when('/reports', {
		templateUrl: '/Gcm/reports.ejs'
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