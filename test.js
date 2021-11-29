View.prototype.addListeners = function(todoList) {
    let dragStartIndex;
    const todos = document.querySelectorAll(".draggable")
    const todoListDragble = document.querySelectorAll(".todo-list li")

    let listItems = todoList;

    function dragStart() {
        dragStartIndex = +this.closest("li").getAttribute("data-index")
    }

    function dragEnter() {
        this.classList.add("over")
        this.firstChild.classList.add("over")
    }
    function dragLeave() {
        this.classList.remove("over")
        this.firstChild.classList.remove("over")
    }
    function dragOver(e) {
        e.preventDefault();
    }

    let switchReference =  this.switchTodos;

    function swapItems(fromIndex, toIndex) {
        const divOne = listItems[fromIndex].querySelector(".draggable")
        const divTwo = listItems[toIndex].querySelector(".draggable");
        let idOne = +divOne.id;
        let idTwo = +divTwo.id


        listItems[fromIndex].appendChild(divTwo);
        listItems[toIndex].appendChild(divOne);

        switchReference(idOne, idTwo, listItems)
    }


    function dragDrop() {

        const dragEndIndex = +this.getAttribute("data-index")
        swapItems(dragStartIndex, dragEndIndex);
        this.classList.remove("over")
        this.firstChild.classList.remove("over")
    }




    todos.forEach(function(todo) {
        todo.addEventListener("dragstart", dragStart)
    })

    todoListDragble.forEach(function(item) {
        item.addEventListener("dragover", dragOver);
        item.addEventListener("drop", dragDrop);
        item.addEventListener("dragenter", dragEnter);
        item.addEventListener("dragleave", dragLeave)
    }.bind(this))


}
