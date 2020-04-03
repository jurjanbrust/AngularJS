var module = angular.module('superHeroesModule', []);
const SUPERHEROS = [
    { id: 11, name: 'Mr. Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr IQ' },
    { id: 19, name: 'Magma' },
    { id: 20, name: 'Tornado' }
];
class SuperHerosComponentController {
    constructor() { }
    $onInit() {
        this.heros = SUPERHEROS;
    }
}
class SuperHerosComponent {
    constructor() {
        this.controller = SuperHerosComponentController;
        this.controllerAs = "$ctrl";
        this.template = `
      <ul>
        <li ng-repeat="hero in $ctrl.heros">{{ hero.name }}</li>
      </ul>
    `;
    }
}
angular
    .module("superHeroesApp", [])
    .component("superheros", new SuperHerosComponent());
angular.element(document).ready(function () {
    angular.bootstrap(document, ["superHeroesApp"]);
});
//# sourceMappingURL=superheroes.js.map