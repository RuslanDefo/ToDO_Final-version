// MODEL
// let Filter = 'all';


function Model() {

        this.todos = JSON.parse(localStorage.getItem('todos')) || [];

};

Model.prototype.bindTodoListChanged = function (callback) {
    this.onTodoListChanged = callback
};

Model.prototype._commit = function (todos) {
    this.onTodoListChanged(todos)

    localStorage.setItem('todos', JSON.stringify(todos))
};

 Model.prototype.SaveRendStatus = function (status) {
         localStorage.setItem('RenderStatus', status);
     this._commit(this.todos);
};

Model.prototype.addTodo = function (todoText) {
   // Version 2 let inc = Math.random();
    let gen = Date.now()

    const todo = {
   /*   old Version */ // id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
        id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + gen : 1,
        text: todoText,
        complete: false,
        // order: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1
    };

    let a = this.todos.length;
    console.log(a);

    this.todos.push(todo);

    this._commit(this.todos);
};

Model.prototype.editTodo = function (id, updatedText) {
    this.todos = this.todos.map(function (todo) {
            return   todo.id === id ? {id: todo.id, text: updatedText, complete: todo.complete, order: todo.order} : todo
        }
    )

    this._commit(this.todos)
};

Model.prototype.refreshDrag = function (id, newPos) {
    function getCurPos(id, arr) {
        let i = 0;
        for (let elem of arr) {
            if (elem.id == id) {
                return i;
            }

            i++;
        }
    }

    let curPos = getCurPos(id, this.todos);

    let movedElem = this.todos.splice(curPos, 1)[0];
    this.todos.splice(newPos, 0, movedElem);

    this._commit(this.todos)
};

Model.prototype.deleteTodo = function (id) {
    this.todos = this.todos.filter(todo => todo.id !== id)

    this._commit(this.todos)
};

Model.prototype.toggleTodo = function (id) {
    this.todos = this.todos.map( function (todo) {
            return  todo.id === id ? { id: todo.id, text: todo.text, complete: !todo.complete, order: todo.order } : todo
        }
    )

    this._commit(this.todos)
};




export default Model;