// module TODO { } makes sura that this does is not stored in the 'global namespace'. 
// TypeScript will convert this to an IFFY (IIFE = Immediately Invoked Function Expression).

module TODO {
  
  // Create a module using the name todoApp : use the same name as in ng-app="todoApp"
  var module: ng.IModule = angular.module("todoApp", []);

  interface ITODO {
    text: string;
    done: boolean;
  }
  
  const TODOS: ITODO[] = [
    {done: false, text: "learn AngularJS"},
    {done: false, text: "build an AngularJS app"}
  ];

  export class TodoListController implements ng.IController {

    todoText : string;
    todos = TODOS;

    private addTodo(): void {
      this.todos.push({text:this.todoText, done:false});
      this.todoText = '';
    }

    private remaining(): number {
      var count = 0;
      angular.forEach(this.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    }

    private archive(): void {
      var oldTodos = this.todos;
      this.todos = [];
      for(let item of oldTodos) {
        if(!item.done) this.todos.push(item);
      }
    }
  }

  // add the controller to this module, function must be last item in array below.
  module.controller("TodoListController", ["$scope","$http",TodoListController]);
}
