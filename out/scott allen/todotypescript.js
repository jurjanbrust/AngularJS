// module TODO { } makes sura that this does is not stored in the 'global namespace'. 
// TypeScript will convert this to an IFFY (IIFE = Immediately Invoked Function Expression).
var TODO;
(function (TODO) {
    // Create a module using the name todoApp : use the same name as in ng-app="todoApp"
    var module = angular.module("todoApp", []);
    const TODOS = [
        { done: false, text: "learn AngularJS" },
        { done: false, text: "build an AngularJS app" }
    ];
    class TodoListController {
        constructor() {
            this.todos = TODOS;
        }
        addTodo() {
            this.todos.push({ text: this.todoText, done: false });
            this.todoText = '';
        }
        remaining() {
            var count = 0;
            angular.forEach(this.todos, function (todo) {
                count += todo.done ? 0 : 1;
            });
            return count;
        }
        archive() {
            var oldTodos = this.todos;
            this.todos = [];
            for (let item of oldTodos) {
                if (!item.done)
                    this.todos.push(item);
            }
        }
    }
    TODO.TodoListController = TodoListController;
    // add the controller to this module, function must be last item in array below.
    module.controller("TodoListController", ["$scope", "$http", TodoListController]);
})(TODO || (TODO = {}));
//# sourceMappingURL=todotypescript.js.map