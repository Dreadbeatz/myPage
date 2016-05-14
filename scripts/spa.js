var spaMain = angular.module('spaMain', ['ngRoute']);

spaMain.config(function($routeProvider,$locationProvider){
	$routeProvider
	
		.when('/', {
			templateUrl : 'home.html',
			controller: 'homeCtrl'
		})
		
		.when('/home', {
			templateUrl : 'home.html',
			controller: 'homeCtrl'
		})
		
		.when('/grid', {
			templateUrl : 'homeGrid.html',
			controller: 'homeCtrl'
		})
		
		.when('/about', {
			templateUrl: 'about.html',
			controller: 'aboutCtrl'
		})
		
		.when('/contact', {
			templateUrl: 'contact.html',
			controller: 'contactCtrl'
		})
		
		.otherwise({redirectTo: '/'});
		
	if(window.history && window.history.pushState){
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});
	}
});

spaMain.controller('homeCtrl', function($scope){
	function changeLang(){
		if(lang == "en"){
			$scope.game = 'Play!';
			$scope.chat = 'Try it!';
			$scope.grid = "Grid look";
		}else if(lang == "sl"){
			$scope.game = 'Igraj!';
			$scope.chat = 'Zaženi!';
			$scope.grid ="Mrežni pogled";
		}
	}
	$scope.slide = "Slideshow";
	changeLang();
	$('#slo, #eng').on('click', function(){
		changeLang();
		$scope.$apply();
	});
	$('#home').addClass("active");
	$('#about, #contact').removeClass("active");
});

spaMain.controller('aboutCtrl', function($scope){
	function changeLang(){
		if(lang == "en"){
			$scope.about = "Hello! I'm Matjaž Fikfak, I am a computer enthusiast who loves to code games and web stuff.";
			$scope.skills ="I have a vast arsenal of skills to code in: HTML, CSS, Javascript, JQuery, PHP, C#, C++, Python. My last loves are Node.js and AngularJS.";
		}else if(lang == "sl"){
			$scope.about = 'Pozdravljeni! Ime mi je Matjaž Fikfak, sem računalniški navdušanec, ki uživa v programiranju iger in raznih spletnih stvari.';
			$scope.skills ="Poznam kar nekaj programskih jezikov: HTML, CSS, Javascript, JQuery, PHP, C#, C++, Python. Maje zanje ljubezni so Node.js in AngularJS.";
		}
	}
	changeLang();
	$('#slo, #eng').on('click', function(){
		changeLang();
		$scope.$apply();
	});
	$('#about').addClass("active");
	$('#home, #contact').removeClass("active");
});

spaMain.controller('contactCtrl', function($scope){
	function changeLang(){
		if(lang == "en"){
			$scope.message = 'e-mail: matjaz.fikfak@gmail.com';
		}else if(lang == "sl"){
			$scope.message = 'e-mail: matjaz.fikfak@gmail.com';
		}
	}
	changeLang();
	$('#slo, #eng').on('click', function(){
		changeLang();
		$scope.$apply();
	});
	$('#contact').addClass("active");
	$('#about, #home').removeClass("active");
});