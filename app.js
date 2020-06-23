var app = angular.module("NobarApp",["ngRoute"]);
app.config(function($routeProvider,$locationProvider)
{
	$routeProvider
	.when("/",
	{
		templateUrl : 'login.html',
	})
	.when("/main",
	{
		resolve:{
			"check" : function ($location,$rootScope)
			{
				// if (!$rootScope.loggedIn)
				// {
				// 	$location.path('/');
				// }
			}	
		},
		templateUrl : 'filmtayang.html',
		controller  : 'menuutama'
	})
	.when("/movie_detail/:id/",{
		templateUrl : '../../detailfilm.html',
		controller : 'detailfilm'
	})
	.when("/aboutme",
	{
		templateUrl : '/aboutme.html'
	})
	$locationProvider.html5Mode({
		enabled : true,
		requireBase : false
	})
})

app.directive("movieList",function(){
	return {
		templateUrl : "fotofilm.html",
		scope: {
			movieData: '='
		},
		controller: 'menuutama'
	}
})

app.controller('menuutama',function($scope,$http)
{
	$scope.film = [];
	let urlfilm = "https://api.themoviedb.org/3/movie/now_playing?api_key=2d6197764ef08e1d45f4d7761cefcbd9&language=en-US&page=1";
	$http.get(urlfilm)
	.then(function(response) {
		$scope.film = response.data.results;
	})
})

app.controller('detailfilm', function($scope,$http,$routeParams)
{
	$scope.id = $routeParams.id;
	$scope.detail = {};
	let urldetail = "".concat( 'https://api.themoviedb.org/3/movie/',$scope.id,'?api_key=2d6197764ef08e1d45f4d7761cefcbd9&language=en-US');
	$http.get(urldetail)
	.then(function(response){
		$scope.detail = response.data;
	})
})

app.controller('loginCtrl',function($scope,$location,$rootScope)
{
	$scope.submit = function()
	{
		if($scope.username == 'user' && $scope.password == 'uaspti')
		{
			alert('Selamat Datang :)');
			$rootScope.loggedIn = true;
			$location.path('/main');
		}
		else 
		{
			alert('No User exist / Wrong Combination of User & Password');
		}
	};
})