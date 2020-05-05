module PEOPLE_ROUTING {
    "use strict";

    export class gitHubService {
        http: ng.IHttpService;
        baseUrl: string;

        constructor($http: ng.IHttpService) {
            this.http = $http;
            this.baseUrl = "https://api.github.com/users/";
        }

        public async getUser(username: string): Promise<void>{
            var response = await this.http.get<any>(
                this.baseUrl + username
              );
            return response.data;
        }

        public async getRepos(user: any): Promise<void>{
            var response = await this.http.get<any>(
                user.repos_url
              );
            return response.data;
        }
    }
}

app.service(
    "gitHubService",
    [
        "$http",
        PEOPLE_ROUTING.gitHubService
    ]
);