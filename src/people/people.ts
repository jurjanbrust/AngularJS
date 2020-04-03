// module PEOPLE { } makes sure that this does is not stored in the 'global namespace'.
// TypeScript will convert this to an IFFY (IIFE = Immediately Invoked Function Expression).

module PEOPLE {
  "use strict";

  // Create a module using the name todoApp : use the same name as in ng-app="todoApp"
  var module: ng.IModule = angular.module("people", []);

  export class PeopleController implements ng.IController {
    person: any;
    http: ng.IHttpService;
    error: string;
    scope: ng.IScope;

    constructor($scope: ng.IScope, $http: ng.IHttpService) {
      this.http = $http;
      this.scope = $scope;
      this.person = this.getPeople();
    }

    private getPeople(): void {
      // https://stackoverflow.com/questions/33851786/why-this-is-undefined-in-typescript-module-with-http-promise
      // https://docs.angularjs.org/api/ng/service/$http
      // this.http.get<any>("https://api.github.com/users/jurjanbrust").then(this.onUserComplete, this.onError);
      this.http
        .get<any>("https://api.github.com/users/jurjanbrust")
        .then(response => {
          this.person = response.data;
          console.log(this.person);
        });
    }
  }

  // add the controller to this module, function must be last item in array below.
  module.controller("PeopleController", ["$scope", "$http", PeopleController]);
}
