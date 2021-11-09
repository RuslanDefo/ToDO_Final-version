//VIEW

function View() {

    this.app = this.getElement('#root')
    this.form = this.createElement('form')
    this.input = this.createElement('input')
    this.input.type = 'text'
    this.input.placeholder = 'Add task'
    this.input.name = 'todo'
    this.submitButton = this.createElement('button')
    this.submitButton.textContent = 'Submit'
    this.form.append(this.input, this.submitButton)
    this.title = this.createElement('h1')
    this.title.textContent = 'Best ToDo_List Ever'
    this.todoList = this.createElement('ul', 'todo-list')
    this.app.append(this.title, this.form, this.todoList)
    this._temporaryTodoText = ''
    this._initLocalListeners()
    // this.input.value = 'TEST TEST TEST'

}

View.prototype._resetInput = function () {
    this.input.value = ''
}

View.prototype.createElement = function (tag, className) {
    const element = document.createElement(tag)

    if (className) element.classList.add(className)

    return element
}

View.prototype.getElement = function (selector) {
    const element = document.querySelector(selector)

    return element
}

View.prototype.displayTodos = function (todos) {

    while (this.todoList.firstChild) {
        this.todoList.removeChild(this.todoList.firstChild)
    }

    if (todos.length === 0) {
        const p = this.createElement('p')
        p.textContent = 'Может добавим задачу?'
        this.todoList.append(p)
    } else {

        todos.forEach(todo => {
            const li = this.createElement('li')
            li.id = todo.id

            const checkbox = this.createElement('input')
            checkbox.type = 'checkbox'
            checkbox.checked = todo.complete

            const span = this.createElement('span')
            span.contentEditable = true
            span.classList.add('editable')

            if (todo.complete) {
                const strike = this.createElement('s')
                strike.textContent = todo.text
                span.append(strike)
            } else {
                span.textContent = todo.text
            }

            const deleteButton = this.createElement('button', 'delete')
            deleteButton.textContent = 'Delete'
            li.append(checkbox, span, deleteButton)

            this.todoList.append(li)
        })
    }

}

View.prototype._initLocalListeners = function () {
    this.todoList.addEventListener('input',function (event) {
        if (event.target.className === 'editable') {
            console.log(event.target.innerText)

            this._temporaryTodoText = event.target.innerText
        }
    }.bind(this))
}

View.prototype.bindAddTodo = function (handler) {
    this.form.addEventListener('submit',function (event) {
        event.preventDefault()

        if (this.input.value !== '') {
            handler(this.input.value)
            this._resetInput()
        }
    }.bind(this))
}

View.prototype.bindDeleteTodo = function (handler) {
    this.todoList.addEventListener('click', function(event) {
        if (event.target.className === 'delete') {

            let accept = confirm("Можно не делать удаление через промисы ? =)");
            if (accept==true){
                alert ("Тудушка удалена");
                const id = parseInt(event.target.parentElement.id)
                handler(id)
            }
            return ;
        }
    }.bind(this))
}

View.prototype.bindEditTodo = function (handler) {
    this.todoList.addEventListener('focusout', function (event) {
        if (this._temporaryTodoText) {

            const id = parseInt(event.target.parentElement.id)

            handler(id, this._temporaryTodoText)
            this._temporaryTodoText = ''
        }
    }.bind(this))
}

View.prototype.bindToggleTodo = function (handler) {
    this.todoList.addEventListener('change', event => {
        if (event.target.type === 'checkbox') {
            const id = parseInt(event.target.parentElement.id)

            handler(id)
        }
    })
}

export default View;