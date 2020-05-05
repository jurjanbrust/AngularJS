// module PEOPLE { } makes sure that this does is not stored in the 'global namespace'.
// TypeScript will convert this to an IFFY (IIFE = Immediately Invoked Function Expression).
module PEOPLE_ROUTING {
  "use strict";

  // Create a module using the name todoApp : use the same name as in ng-app="todoApp"

  export class MainController implements ng.IController {
    username: string;
    scope: ng.IScope;
    location: ng.ILocationService;

    constructor($scope: ng.IScope, $location : ng.ILocationService) {
      this.scope = $scope;
      this.location = $location;
      this.username = "angular";
    }

    private getPeople() {
      this.location.path('/user/' + this.username);
    }
  }
}

// add the controller to this module, function must be last item in array below.
app.controller("MainController", ["$scope", "$location", PEOPLE_ROUTING.MainController]);
