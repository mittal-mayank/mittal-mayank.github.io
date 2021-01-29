let inpNewTask = $('#inpNewTask')
let btnAdd = $('#btnAdd')
let btnClear = $('#btnClear')
let btnSort = $('#btnSort')
let btnClean = $('#btnClean')
let ulTasks = $('#ulTasks')

let numLineThrough = 0

inpNewTask.on('keypress', (event) => {
    // fires for registered keyboard input, like printable characters, enter key etc...
    // wont fire for shift, backspace, pasting of text etc...
    if (event.which === 13 && /\S/.test(inpNewTask.val())) {
        btnAdd.trigger('click')
    }
})

inpNewTask.on('input', () => {
    // fires for any change in value of input field
    // if change then fire, if no change then wont fire like for enter, backspacing empty string etc...
    // is different from 'change' event as 'change' is only fired when the element is removed from focus
    // 'input' is fired whenever the change happens
    let isValid = /\S/.test(inpNewTask.val())
    btnAdd.prop('disabled', !isValid)
    btnClear.prop('disabled', !isValid)
    // properties are the data properties of dom objects
    // attributes are modifiers inside the tags
    // eg. the property value refers to the text inside the input element at any time, while the value attribute sets an initial text
})

btnAdd.on('click', () => {
    // let listItem = $('<li>', {
    //     class: 'list-group-item',
    //     text: inpNewTask.val()
    // })
    // listItem.on('click', function() {
    //     listItem.toggleClass('disabled')
    //     // javascript dom objects can be wrapped inside jquery objects using $()
    // })
    // ulTasks.prepend(listItem)
    ulTasks.prepend($(`<li class="list-group-item">${inpNewTask.val()}</li>`).on('click', function () {
        if ($(this).toggleClass('disabled').hasClass('disabled')) {
            numLineThrough++
        } else {
            numLineThrough--
        }
        btnSort.prop('disabled', !numLineThrough)
        btnClean.prop('disabled', !numLineThrough)
    }))
    btnClear.trigger('click')
})

btnClear.on('click', () => {
    inpNewTask.val('')
    btnAdd.prop('disabled', true)
    btnClear.prop('disabled', true)
})

btnSort.on('click', () => {
    ulTasks.append($('#ulTasks > .disabled'))
})

btnClean.on('click', () => {
    $('#ulTasks > .disabled').remove();
    btnSort.prop('disabled', true)
    btnClean.prop('disabled', true)
})