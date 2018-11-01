var app = angular.module('grievances', ['ngRoute']);

app.config(function($routeProvider){

	$routeProvider
	.when('/', {
		templateUrl: '/Student/grievances.ejs'
	})

	.when('/post', {
		templateUrl: '/Student/post.ejs'
	})

	.when('/my-account', {
		templateUrl: '/Student/myaccount.ejs'
	})

	.when('/resetpassword', {
		templateUrl: '/Student/reset-password.ejs'
	})

	.when('/reports', {
		templateUrl: '/Student/reports.ejs'
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