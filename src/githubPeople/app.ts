var app: ng.IModule = angular.module("people", ["ngRoute"]);

app.config(function ($routeProvider) {
             
    $routeProvider.when('/main', {
        templateUrl: '/src/githubPeople/main.html',
        controller: 'PeopleController'
    }).otherwise({
        redirectTo: "/main"
    });
});