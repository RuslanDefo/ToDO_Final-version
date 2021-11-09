import Model from '../Model/model.js';
import View from '../View/view.js';

//CONTROLLER

function Controller (model, view) {
    this.model = model
    this.view = view

    console.log(this)

    this.model.bindTodoListChanged(this.onTodoListChanged.bind(this))
    this.view.bindAddTodo(this.handleAddTodo.bind(this))
    this.view.bindEditTodo(this.handleEditTodo.bind(this))
    this.view.bindDeleteTodo(this.handleDeleteTodo.bind(this))
    this.view.bindToggleTodo(this.handleToggleTodo.bind(this))

    this.onTodoListChanged(this.model.todos)
}

Controller.prototype.onTodoListChanged = function (todos) {
    return   this.view.displayTodos(todos)
}

Controller.prototype.handleAddTodo = function (todoText) {
    console.log()
    this.model.addTodo(todoText)
}

Controller.prototype.handleEditTodo = function (id, todoText) {
    this.model.editTodo(id, todoText)
}

Controller.prototype.handleDeleteTodo = function (id) {
    this.model.deleteTodo(id)
}

Controller.prototype.handleToggleTodo = function (id) {
    this.model.toggleTodo(id)
}

let app = new Controller(new Model(), new View());

export default app;