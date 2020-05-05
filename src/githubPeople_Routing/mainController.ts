module PEOPLE_ROUTING {
  "use strict";

  export class MainController implements ng.IController {
    username: string;
    scope: ng.IScope;
    location: ng.ILocationService;

    constructor($scope: ng.IScope, $location: ng.ILocationService) {
      this.scope = $scope;
      this.location = $location;
      this.username = "angular";
    }

    private getPeople() {
      this.location.path("/user/" + this.username);
    }
  }
}

// add the controller to this module, function must be last item in array below.
app.controller("MainController", [
  "$scope",
  "$location",
  PEOPLE_ROUTING.MainController,
]);
