//VIEW


function View() {

    this.app = this.getElement('#root')
    this.form = this.createElement('form')
    this.input = this.createElement('input')
    this.panel = this.createElement('div')
    this.input.type = 'text'
    this.input.placeholder = 'Add task'
    this.input.name = 'todo'
    this.submitButton = this.createElement('button')
    this.submitButton.textContent = 'Submit'
    this.showCheckedButton = this.createElement('button')
    this.showCheckedButton.textContent = 'Show Checked'
    this.showNoCheckButton = this.createElement('button')
    this.showNoCheckButton.textContent = 'Show No Checked'
    this.showAllButton = this.createElement('button')
    this.showAllButton.textContent = 'Show All'


    // Radio Buttons
    // this.checkRadio = this.createElement('input')
    // this.checkRadio.type = 'radio'
    // this.checkRadio.textContent = 'showChecked'
    // this.checkRadio.name = 'Filter_Status'
    // this.checkRadio.value = 'complete'
    //
    // this.checkRadioNoCheck = this.createElement('input')
    // this.checkRadioNoCheck.type = 'radio'
    // this.checkRadioNoCheck.textContent = 'showChecked'
    // this.checkRadioNoCheck.name = 'Filter_Status'
    // this.checkRadioNoCheck.value = 'notComplete'
    //
    // this.checkRadioAll = this.createElement('input')
    // this.checkRadioAll.type = 'radio'
    // this.checkRadioAll.textContent = 'showChecked'
    // this.checkRadioAll.name = 'Filter_Status'
    // this.checkRadioAll.value = 'all'


    this.form.append(this.input, this.submitButton)
    this.panel.append(this.showCheckedButton, this.showNoCheckButton, this.showAllButton /* this.checkRadio, this.checkRadioAll, this.checkRadioNoCheck */)
    this.title = this.createElement('h1')
    this.title.textContent = 'Best ToDo_List Ever'
    this.todoList = this.createElement('ul', 'todo-list')
    this.app.append(this.title, this.form, this.todoList, this.panel)
    this._temporaryTodoText = ''
    // this.input.value = 'TEST TEST TEST'
    this.RenderStatus = 'all';


    this._initLocalListeners()

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

    console.log(todos)

    if (todos.length === 0) {
        const p = this.createElement('p')
        p.textContent = 'Может добавим задачу?'
        this.todoList.append(p)
    }

    if (this.RenderStatus === 'all') {

        todos.forEach(todo => {
            const li = this.createElement('li')
            li.classList.add('tasks__item')
            li.draggable = 'true'
            li.id = todo.id
            li.order = todo.order

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

    if (this.RenderStatus === 'complete') {

        todos.forEach(todo => {
            if (todo.complete === true) {

                const li = this.createElement('li')
                li.classList.add('tasks__item')
                li.draggable = 'true'
                li.id = todo.id
                li.order = todo.order

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
            }
        })
    }

    if (this.RenderStatus === 'notComplete') {

        todos.forEach(todo => {
            if (todo.complete === false) {

                const li = this.createElement('li')
                li.classList.add('tasks__item')
                li.draggable = 'true'
                li.id = todo.id
                li.order = todo.order

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
            }
        })
    }

}

View.prototype._initLocalListeners = function () {
    this.todoList.addEventListener('input', function (event) {
        if (event.target.className === 'editable') {
            console.log(event.target.innerText)

            this._temporaryTodoText = event.target.innerText
        }
    }.bind(this))
}

View.prototype.bindAddTodo = function (handler) {
    this.form.addEventListener('submit', function (event) {
        event.preventDefault()

        if (this.input.value !== '') {
            handler(this.input.value)
            this._resetInput()
        }
    }.bind(this))
}

View.prototype.bindDeleteTodo = function (handler) {
    this.todoList.addEventListener('click', function (event) {
        const id = parseInt(event.target.parentElement.id)
        if (event.target.className === 'delete') {
            return new Promise(resolve => {

                let modal = document.createElement('div')
                let yesBtn = document.createElement('button')
                modal.classList.add('modalWindow')
                yesBtn.textContent = 'Yes'
                yesBtn.id = 'yes'
                let noBtn = document.createElement('button')
                noBtn.textContent = 'No'
                noBtn.id = 'no'
                let modalText = document.createElement('h3')
                modalText.textContent = 'Удалить запись?'
                document.body.append(modal)
                modal.append(modalText, yesBtn, noBtn)

                yesBtn.addEventListener('click', function (event) {
                    console.log('yesBtn');
                    resolve(handler(id))
                    console.log('Выведи это');
                    modal.remove();
                })

                noBtn.addEventListener('click', function (event) {
                    console.log('noBtn');
                    resolve(console.error('canceled'))
                    modal.remove();
                })

            })
        }
    })
}

View.prototype.dragDrop = function (handler) {


    this.todoList.addEventListener(`dragstart`, function (evt) {
        evt.target.classList.add(`selected`);

    })

    this.todoList.addEventListener(`dragend`, function (evt) {
        evt.target.classList.remove(`selected`)
        handler(evt.target.id, getPos(evt.target));
    })

    function getPos(elem) {
        let parent = elem.parentNode;

        let i = 0;
        for (let child of parent.children) {
            if (child === elem) {
                return i;
            }

            i++;
        }
    }

    this.todoList.addEventListener(`dragover`, function (evt) {

        evt.preventDefault();


        const activeElement = this.todoList.querySelector(`.selected`);

        const currentElement = evt.target;

        // console.log(activeElement)


        const isMoveable = activeElement !== currentElement &&
            currentElement.classList.contains(`tasks__item`);


        if (!isMoveable) {
            return;
        }

        const nextElement = (currentElement === activeElement.nextElementSibling) ?
            currentElement.nextElementSibling :
            currentElement;

        this.todoList.insertBefore(activeElement, nextElement);
        //
        // let tesr = JSON.parse(localStorage.getItem('todos'));

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
    this.todoList.addEventListener('change', function (event) {
        if (event.target.type === 'checkbox') {
            const id = parseInt(event.target.parentElement.id)

            handler(id)
        }
    }.bind(this))
}


View.prototype.filterTasks = function (handler) {
    let checkers = document.getElementsByName('Filter_Status')
    console.log(checkers.length)
    for (let i = 0; i < checkers.length; i++) {
        checkers[i].addEventListener('click', function (event) {
            this.RenderStatus = event.target.value;
            handler(this.RenderStatus,);
            console.log(event.target.value)
        }.bind(this))
    }
}


export default View;
