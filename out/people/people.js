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
        constructor($scope, $http) {
            this.http = $http;
            this.scope = $scope;
            this.error = "welkom";
            this.mode = "Await";
            this.person = this.getPeople();
        }
        getPeople() {
            return __awaiter(this, void 0, void 0, function* () {
                if (this.mode === "Await") {
                    // using the new await method
                    var response = yield this.http.get("https://api.github.com/users/jurjanbrust");
                    this.person = response.data;
                    this.error = "Alles ok (await)";
                    console.log(this.person);
                    this.scope.$applyAsync();
                }
                else {
                    // using the promise method
                    this.http.get("https://api.github.com/users/jurjanbrust").then((response) => {
                        this.person = response.data;
                        this.error = "Alles ok (promise)";
                        console.log(this.person);
                    }, (error) => {
                        this.error = "Fout bij ophalen gegevens: " + error.status + " " + error.data.message;
                        console.log(error);
                    }).catch((err) => {
                        this.error = "Enorme fout";
                        console.log(err);
                    });
                }
            });
        }
    }
    PEOPLE.PeopleController = PeopleController;
    // add the controller to this module, function must be last item in array below.
    module.controller("PeopleController", ["$scope", "$http", PeopleController]);
})(PEOPLE || (PEOPLE = {}));
//# sourceMappingURL=people.js.map