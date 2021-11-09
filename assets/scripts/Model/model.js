// MODEL
function Model() {

    this.todos = JSON.parse(localStorage.getItem('todos')) || []

};

Model.prototype.bindTodoListChanged = function (callback) {
    this.onTodoListChanged = callback
};

Model.prototype._commit = function (todos) {
    this.onTodoListChanged(todos)
    localStorage.setItem('todos', JSON.stringify(todos))
};

Model.prototype.addTodo = function (todoText) {
    const todo = {
        id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
        text: todoText,
        complete: false,
    };

    this.todos.push(todo);

    this._commit(this.todos);
};

Model.prototype.editTodo = function (id, updatedText) {
    this.todos = this.todos.map(function (todo) {
            return   todo.id === id ? {id: todo.id, text: updatedText, complete: todo.complete} : todo
        }
    )

    this._commit(this.todos)
};

Model.prototype.deleteTodo = function (id) {
    this.todos = this.todos.filter(todo => todo.id !== id)

    this._commit(this.todos)
};

Model.prototype.toggleTodo = function (id) {
    this.todos = this.todos.map( function (todo) {
            return  todo.id === id ? { id: todo.id, text: todo.text, complete: !todo.complete } : todo
        }
    )

    this._commit(this.todos)
};

export default Model;