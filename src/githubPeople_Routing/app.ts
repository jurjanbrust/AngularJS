var app: ng.IModule = angular.module("people", ["ngRoute"]);

app.config(function ($routeProvider) {
             
    $routeProvider
    .when('/main', {
        templateUrl: '/src/githubPeople_Routing/main.html',
        controller: 'MainController'
    })
    .when("/user/:username", { 
        templateUrl: "user.html",
        controller: "UserController"
    })
    .otherwise({
        redirectTo: "/main"
    });
});