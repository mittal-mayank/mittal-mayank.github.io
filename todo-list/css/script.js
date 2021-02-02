let newNote = $('#newNote')
let initialNewNote = $('#initialNewNote')
let newNoteTitle = $('#newNoteTitle')
let newNoteContent = $('#newNoteContent')
let minimizeNewNote = $('#minimizeNewNote')
let trashNewNote = $('#trashNewNote')
let addNewNote = $('#addNewNote')
let allNotes = $('#allNotes')

initialNewNote.on('click', function () {
    newNote.css('height', '200px')
    initialNewNote.css('display', 'none')
    newNoteTitle.css('display', 'block')
    newNoteContent.css('display', 'block')
    newNoteTitle.trigger('focus')
})

function close() {
    newNote.css('height', '58px')
    initialNewNote.css('display', 'inline-block')
    newNoteTitle.css('display', 'none')
    newNoteContent.css('display', 'none')
}

minimizeNewNote.on('click', function () {
    close()
    if (/\S/.test(newNoteTitle.val()) || /\S/.test(newNoteContent.val())) {
        initialNewNote.text('Continue note . . .')
    } else {
        initialNewNote.text('Type a new note . . .')
    }
})

trashNewNote.on('click', function () {
    close()
    newNoteTitle.val('')
    newNoteContent.val('')
    initialNewNote.text('Type a new note . . .')
})

addNewNote.on('click', function () {
    let newNoteTitleVal = newNoteTitle.val()
    let newNoteContentVal = newNoteContent.val()
    if (/\S/.test(newNoteTitleVal) && /\S/.test(newNoteContentVal)) {
        let createdNote = $('<div>')
            .addClass('note')
            .html(`<div class="noteTitle"><span class="buttonsCheckList">❌</span><span class="noteTitleText">${newNoteTitleVal}</span></div><div class="noteContent">${newNoteContentVal}</div>`)
        createdNote.find('.buttonsCheckList')[0].onclick = function () {
            createdNote.remove()
        }
        allNotes.prepend(createdNote)
        trashNewNote.trigger('click')
    } else {
        newNote.finish()
        newNote.effect('shake')
    }
})

let checkList = $('#checkList')
let addNewCheckItem = $('#addNewCheckItem')
let trashNewCheckItem = $('#trashNewCheckItem')
let newCheckItemContent = $('#newCheckItemContent')

trashNewCheckItem.on('click', function () {
    newCheckItemContent.val('')
})

addNewCheckItem.on('click', function () {
    let newCheckItemContentVal = newCheckItemContent.val()
    if (/\S/.test(newCheckItemContentVal)) {
        let createdCheckItem = $('<div>')
            .addClass('checkItem')
            .html(`<input class="checkBox" type="checkbox"><span class="buttonsCheckList">❌</span><span class="checkContent">${newCheckItemContentVal}</span>`)
        let createdCheckContent = createdCheckItem.find('.checkContent')[0]
        let createdCheckBox = createdCheckItem.find('.checkBox')[0]
        createdCheckBox.onchange = function () {
            if (createdCheckBox.checked) {
                createdCheckContent.style.textDecoration = 'line-through'
            } else {
                createdCheckContent.style.textDecoration = 'none'
            }
        }
        let createdButtonsCheckList = createdCheckItem.find('.buttonsCheckList')[0]
        createdButtonsCheckList.onclick = function () {
            createdCheckItem.remove()
        }
        checkList.append(createdCheckItem)
        checkList.scrollTop = checkList.scrollHeight
        trashNewCheckItem.trigger('click')
    } else {
        newCheckItemContent.finish()
        newCheckItemContent.effect("shake", {distance: '2'})
    }
})
