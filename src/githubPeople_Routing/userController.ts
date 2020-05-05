module PEOPLE_ROUTING {
  "use strict";

  export class UserController implements ng.IController {
    scope: ng.IScope;
    person: any;
    repos: any;
    routeParams: ng.route.IRouteParamsService;
    gitHubService: gitHubService;
    error: string;

    constructor(
      $scope: ng.IScope,
      gitHubService,
      $routeParams: ng.route.IRouteParamsService
    ) {
      this.routeParams = $routeParams;
      this.gitHubService = gitHubService;
      this.scope = $scope;
      this.error = "No error";
      this.person = this.getPeople();
    }

    private async getPeople(): Promise<void> {
      this.person = await this.gitHubService.getUser(this.routeParams.username);
      this.repos = await this.gitHubService.getRepos(this.person);

      this.error = "Ok";
      console.log(this.person);
      this.scope.$applyAsync(); // AngularJS needs to get a signal that the model has changed.
    }
  }
}

// add the controller to this module, function must be last item in array below.
app.controller("UserController", [
  "$scope",
  "gitHubService",
  "$routeParams",
  PEOPLE_ROUTING.UserController,
]);
