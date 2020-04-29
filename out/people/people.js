// module PEOPLE { } makes sure that this does is not stored in the 'global namespace'.
// TypeScript will convert this to an IFFY (IIFE = Immediately Invoked Function Expression).
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var app = angular.module("people", []);
var PEOPLE;
(function (PEOPLE) {
    "use strict";
    // Create a module using the name todoApp : use the same name as in ng-app="todoApp"
    class PeopleController {
        constructor($scope, $http, gitHubService) {
            this.http = $http;
            this.gitHubService = gitHubService;
            this.scope = $scope;
            this.error = "No error";
            this.mode = "Await";
            this.username = "angular";
            this.person = this.getPeople();
        }
        getPeople() {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.mode === "Await") {
                    this.person = yield this.gitHubService.getUser(this.username);
                    this.repos = yield this.gitHubService.getRepos(this.person);
                    this.error = "Ok using the await and service method";
                    console.log(this.person);
                    this.scope.$applyAsync(); // AngularJS needs to get a signal that the model has changed.    
                }
                else {
                    // using the promise method
                    this.http.get("https://api.github.com/users/" + this.username).then((response) => {
                        this.person = response.data;
                        this.error = "Ok using the promise method (only user profile, no repos)";
                        this.repos = ""; // not implemented, so leave empty
                        console.log(this.person);
                    }, (error) => {
                        this.error = "Error getting data: " + error.status + " " + error.data.message;
                        console.log(error);
                    }).catch((err) => {
                        this.error = "Huge error";
                        console.log(err);
                    });
                }
            });
        }
    }
    PEOPLE.PeopleController = PeopleController;
})(PEOPLE || (PEOPLE = {}));
// add the controller to this module, function must be last item in array below.
app.controller("PeopleController", ["$scope", "$http", "gitHubService", PEOPLE.PeopleController]);
//# sourceMappingURL=people.js.map