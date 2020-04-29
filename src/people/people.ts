// module PEOPLE { } makes sure that this does is not stored in the 'global namespace'.
// TypeScript will convert this to an IFFY (IIFE = Immediately Invoked Function Expression).

module PEOPLE {
  "use strict";

  // Create a module using the name todoApp : use the same name as in ng-app="todoApp"
  var module: ng.IModule = angular.module("people", []);

  export class PeopleController implements ng.IController {
    person: any;
    repos: any;
    mode: string;
    username: string;
    http: ng.IHttpService;
    interval: ng.IIntervalService;
    error: string;
    scope: ng.IScope;
    count: number;

    constructor($scope: ng.IScope, $http: ng.IHttpService, $interval: ng.IIntervalService) {
      this.http = $http;
      this.interval = $interval;
      this.scope = $scope;
      this.error = "No error";
      this.mode = "Await";
      this.username = "angular";
      this.person = this.getPeople();
      this.startCountDown();
    }

    private startCountDown(): void {
      this.count = 5;
      this.interval(this.decrementCountdown, 1000, this.count);
    }

    private decrementCountdown(): void {
      // todo: this. is undefined here and only god knows why
      this.count = this.count - 1;
      if(this.count < 1) {
        this.getPeople()
      }
    }

    private async getPeople(): Promise<void> {

      if (this.mode === "Await") {
        // using the new await method

        // get the user
        var response = await this.http.get<any>(
          "https://api.github.com/users/" + this.username
        );
        this.person = response.data;

        // get the repositories
        var response = await this.http.get<any>(
          this.person.repos_url
        );
        this.repos = response.data;

        this.error = "Ok using the await method";
        console.log(this.person);
        this.scope.$applyAsync();    // AngularJS needs to get a signal that the model has changed.    
      } else {
        // using the promise method
        this.http.get<any>("https://api.github.com/users/" + this.username).then(
          (response) => {
            this.person = response.data;
            this.error = "Ok using the promise method";
            this.repos = "";  // not implemented, so leave empty
            console.log(this.person);
          },
          (error) => {
            this.error = "Error getting data: " + error.status + " " + error.data.message;
            console.log(error);
          }
        ).catch((err:Error) => {
          this.error = "Huge error";
          console.log(err);
        });
      }
    }
  }

  // add the controller to this module, function must be last item in array below.
  module.controller("PeopleController", ["$scope", "$http", "$interval", PeopleController]);
}
