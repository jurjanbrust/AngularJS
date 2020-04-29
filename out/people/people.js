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
var PEOPLE;
(function (PEOPLE) {
    "use strict";
    // Create a module using the name todoApp : use the same name as in ng-app="todoApp"
    var module = angular.module("people", []);
    class PeopleController {
        constructor($scope, $http, $interval) {
            this.http = $http;
            this.interval = $interval;
            this.scope = $scope;
            this.error = "No error";
            this.mode = "Await";
            this.username = "angular";
            this.person = this.getPeople();
            this.startCountDown();
        }
        startCountDown() {
            this.count = 5;
            this.interval(this.decrementCountdown, 1000, this.count);
        }
        decrementCountdown() {
            // todo: this. is undefined here and only god knows why
            this.count = this.count - 1;
            if (this.count < 1) {
                this.getPeople();
            }
        }
        getPeople() {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.mode === "Await") {
                    // using the new await method
                    // get the user
                    var response = yield this.http.get("https://api.github.com/users/" + this.username);
                    this.person = response.data;
                    // get the repositories
                    var response = yield this.http.get(this.person.repos_url);
                    this.repos = response.data;
                    this.error = "Ok using the await method";
                    console.log(this.person);
                    this.scope.$applyAsync(); // AngularJS needs to get a signal that the model has changed.    
                }
                else {
                    // using the promise method
                    this.http.get("https://api.github.com/users/" + this.username).then((response) => {
                        this.person = response.data;
                        this.error = "Ok using the promise method";
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
    // add the controller to this module, function must be last item in array below.
    module.controller("PeopleController", ["$scope", "$http", "$interval", PeopleController]);
})(PEOPLE || (PEOPLE = {}));
//# sourceMappingURL=people.js.map