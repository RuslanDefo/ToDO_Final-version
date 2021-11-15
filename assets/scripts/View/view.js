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


    this.form.append(this.input, this.submitButton)
    this.panel.append(this.showCheckedButton, this.showNoCheckButton, this.showAllButton)
    this.title = this.createElement('h1')
    this.title.textContent = 'Best ToDo_List Ever'
    this.todoList = this.createElement('ul', 'todo-list')
    this.app.append(this.title, this.form, this.todoList, this.panel)
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
            li.classList.add('tasks__item')
            li.draggable = 'true'
            li.id = todo.id

            const checkbox = this.createElement('input')
            checkbox.type = 'checkbox'
            checkbox.checked = todo.complete

            const span = this.createElement('span')
            span.contentEditable = true
            span.classList.add('editable')

            if (todo.complete) {
                const strike = this.createElement('s')
                strike.classList.add('EEEEE');
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
        if (event.target.className === 'delete') {
            let modal = document.getElementById('modalWindow')
            modal.classList.add('active');
            const id = parseInt(event.target.parentElement.id)
                return new Promise( (resolve, reject) => {
                    let accept = document.getElementById('yes')
                    modal.addEventListener('click', function (event){
                        if (event.target == accept){
                            handler(id)
                            resolve(modal.classList.remove('active'));
                            return;
                        }
                        else {
                            reject(modal.classList.remove('active'));
                            return;
                        }
                    })
                }).catch();
            }
            //         let accept = confirm("Можно не делать удаление через промисы ? =)");
            //         if (accept==true){
            //             alert ("Тудушка удалена");
            //             const id = parseInt(event.target.parentElement.id)
            //             handler(id)
            //         }
            //         return ;
            //     }
            // }.bind(this))
    }.bind(this))
}

View.prototype.dragDrop = function () {
    this.todoList.addEventListener(`dragstart`, function (evt) {
        evt.target.classList.add(`selected`);
    })

    this.todoList.addEventListener(`dragend`, function (evt) {
        evt.target.classList.remove(`selected`);
    })

    this.todoList.addEventListener(`dragover`, function (evt) {
       
        evt.preventDefault();


        const activeElement = this.todoList.querySelector(`.selected`);

        const currentElement = evt.target;

        const isMoveable = activeElement !== currentElement &&
            currentElement.classList.contains(`tasks__item`);


        if (!isMoveable) {
            return;
        }

        const nextElement = (currentElement === activeElement.nextElementSibling) ?
            currentElement.nextElementSibling :
            currentElement;

        this.todoList.insertBefore(activeElement, nextElement);
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

View.prototype.FiletrChecked = function () {
    this.showCheckedButton.addEventListener('click', function (event) {


        let cells = document.getElementsByClassName('EEEEE');
        console.log(cells);

        for (let el = 0; el < cells.length; el++) {
            cells[el].parentNode.classList.remove('hidden');
            cells[el].parentNode.classList.add('prepeare');
        }


        let hide = document.getElementsByTagName('li')
        for (let el = 0; el < hide.length; el++) {
            hide[el].classList.remove('hidden', 'active');
            hide[el].classList.add('hidden');
        }

        let show = document.getElementsByClassName('prepeare')
        for (let el = 0; el < hide.length; el++) {
            show[el].parentNode.classList.remove('hidden');
            show[el].parentNode.classList.add('active');
        }

    });
}

View.prototype.FiletrUnchecked = function () {
    this.showNoCheckButton.addEventListener('click', function (event) {
        console.log(event.target);

        let cells = document.getElementsByClassName('EEEEE');
        console.log(cells);

        for (let el = 0; el < cells.length; el++) {
            cells[el].parentNode.classList.remove('hidden');
            cells[el].parentNode.classList.add('prepeare');
        }

        let hide = document.getElementsByTagName('li')
        for (let el = 0; el < hide.length; el++) {
            hide[el].classList.remove('hidden', 'active');
            hide[el].classList.add('active');
        }

        let show = document.getElementsByClassName('prepeare')
        for (let el = 0; el < hide.length; el++) {
            show[el].parentNode.classList.remove('active');
            show[el].parentNode.classList.add('hidden');
        }


    });
}

View.prototype.FilterAll = function () {
    this.showAllButton.addEventListener('click', function (event) {
        let show = document.getElementsByTagName('li')
        for (let el = 0; el < show.length; el++) {
            show[el].classList.remove('hidden', 'active');
        }
    })
};

export default View;
