// module PEOPLE { } makes sure that this does is not stored in the 'global namespace'.
// TypeScript will convert this to an IFFY (IIFE = Immediately Invoked Function Expression).
module PEOPLE {
  "use strict";

  // Create a module using the name todoApp : use the same name as in ng-app="todoApp"

  export class PeopleController implements ng.IController {
    person: any;
    repos: any;
    mode: string;
    username: string;
    http: ng.IHttpService;
    interval: ng.IIntervalService;
    gitHubService: gitHubService;
    error: string;
    scope: ng.IScope;
    count: number;

    constructor($scope: ng.IScope, $http: ng.IHttpService, gitHubService) {
      this.http = $http;
      this.gitHubService = gitHubService;
      this.scope = $scope;
      this.error = "No error";
      this.mode = "Await";
      this.username = "angular";
      this.person = this.getPeople();
    }

    private async getPeople(): Promise<void> {

      if (this.mode === "Await") {
        this.person = await this.gitHubService.getUser(this.username);
        this.repos = await this.gitHubService.getRepos(this.person);

        this.error = "Ok using the await and service method";
        console.log(this.person);
        this.scope.$applyAsync();    // AngularJS needs to get a signal that the model has changed.    
      } else {
        // using the promise method
        this.http.get<any>("https://api.github.com/users/" + this.username).then(
          (response) => {
            this.person = response.data;
            this.error = "Ok using the promise method (only user profile, no repos)";
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
}

// add the controller to this module, function must be last item in array below.
app.controller("PeopleController", ["$scope", "$http","gitHubService", PEOPLE.PeopleController]);
