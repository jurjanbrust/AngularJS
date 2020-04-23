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
      this.error = "welkom";
    }

    private async getPeople(): Promise<void> {

      let usingAwait: boolean = true;
      if (!usingAwait) {
        // using the promise method
        this.http.get<any>("https://api.github.com/users/jurjanbrust").then(
          (response) => {
            this.person = response.data;
            this.error = "Alles ok (promise)";
            console.log(this.person);
          },
          (error) => {
            this.error = "Fout bij ophalen gegevens: " + error.status + " " + error.data.message;
            console.log(error);
          }
        ).catch((err:Error) => {
          this.error = "Enorme fout";
          console.log(err);
        });
      } else {
        // using the new await method
        var response = await this.http.get<any>(
          "https://api.github.com/users/jurjanbrust"
        );
        this.person = response.data;
        this.error = "Alles ok (await)";
        console.log(this.person);
        this.scope.$applyAsync();
      }
    }
  }

  // add the controller to this module, function must be last item in array below.
  module.controller("PeopleController", ["$scope", "$http", PeopleController]);
}
