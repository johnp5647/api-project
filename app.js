var app = angular.module('MyApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: 'templates/home.html',
        controller: 'HomeController'
    }).when('/lifeexpectancy', {
        templateUrl: 'templates/life.html',
        controller: 'LifeController'
    }).when('/main', {
        templateUrl: 'templates/main.html',
        controller: 'MainController'
    }).when('/region', {
        templateUrl: 'templates/region.html',
        controller: 'RegionController'
    })
});



app.controller('RegionController', ['$scope', function ($scope) {



}]);
app.controller('HomeController', ['$scope', '$interval', '$http', function ($scope, $interval, $http) {

    $scope.population = 7381522145;
    $scope.add = function () {
        $scope.intervalHandler = $interval(function () {
            $scope.population = $scope.population + 2.3;
        }, 1000);
    }
    $scope.add();



}]);
app.controller('MainController', ['$scope', '$http', function ($scope, $http) {
    $scope.searchResults = [];
    $scope.input = null;
    $scope.countryList = [];

    var url = 'https://restcountries.eu/rest/v1/all';
    $http.get(url).then(function (response) {
        $scope.countryList = response.data;
        if ($scope.countryList === undefined) {
            console.log('Not Found');
        } else {
            console.log($scope.countryList);
        };
    }, function (response) {
        console.log('There was an error');
    })

    $scope.search = function () {
        var url = 'https://restcountries.eu/rest/v1/name/' + $scope.input.countriesList.name + '?fullText=true';
        $http.get(url).then(function (response) {
            $scope.searchResults = response.data;
            if ($scope.searchResults === undefined) {
                console.log('Not Found');
            } else {
                console.log($scope.searchResults);
            };
        }, function (response) {
            console.log('There was an error');
        })
    }
}]);

app.controller('LifeController', ['$scope', '$http', function ($scope, $http) {
    $scope.countriesList = [];

    var url = 'http://api.population.io:80/1.0/countries';
    console.log(url);
    $http.get(url).then(function (response) {
        $scope.countriesList = response.data;
        console.log($scope.menu);
        if ($scope.countriesList === undefined) {
            console.log('Not Found');
        } else {
            console.log($scope.countriesList);
        };
    }, function (response) {
        console.log('There was an error');
    })

    $scope.searchResults = [];
    $scope.menu = null;
    $scope.x = new Date();
    $scope.date = $scope.x.getFullYear() + '-' + ($scope.x.getMonth() + 1) + '-' + $scope.x.getDate();
    $scope.age = null;
    $scope.gen = null;
    $scope.search = function () {
        var url = 'http://api.population.io:80/1.0/life-expectancy/remaining/' + $scope.gen.gender + '/' + $scope.menu.countryList + '/' + $scope.date + '/' + $scope.age + '/';
        console.log(url);
        $http.get(url).then(function (response) {
            $scope.searchResults = response.data;
            if ($scope.searchResults === undefined) {
                console.log('Not Found');
            } else {
                console.log($scope.searchResults);
            };
        }, function (response) {
            console.log('There was an error');
        })
    }
}]);