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
    class gitHubService {
        constructor($http) {
            this.http = $http;
            this.baseUrl = "https://api.github.com/users/";
        }
        getUser(username) {
            return __awaiter(this, void 0, void 0, function* () {
                var response = yield this.http.get(this.baseUrl + username);
                return response.data;
            });
        }
        getRepos(user) {
            return __awaiter(this, void 0, void 0, function* () {
                var response = yield this.http.get(user.repos_url);
                return response.data;
            });
        }
    }
    PEOPLE.gitHubService = gitHubService;
})(PEOPLE || (PEOPLE = {}));
app.service("gitHubService", [
    "$http",
    PEOPLE.gitHubService
]);
//# sourceMappingURL=githubService.js.map