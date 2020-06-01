'use strict'
var gPages = 0

function onSortClicked(sortBy) {
    setDefaultSort(sortBy)
    renderBooks(defaultSort())
}

function getInput(elInput) {
    return document.querySelector(elInput)
}

function onAddBook() {

    var elTitle = getInput('.book-name')
    if (!elTitle.value) return

    var elContent = getInput('.text-box')
    if (!elContent.value) elContent.value = getLoremIpsum(20)

    var price = getInput('.price').value
    if (!price) price = 0
    var img = getInput('.img-input').value.substring(12)

    if (!img) img = 'default.png'
    addBook(elTitle.value, elContent.value, price, img)

    elTitle.value = ''
    elContent.value = ''
    renderBooks(defaultSort())
    showModal()
}

function renderBooks(gSortBy) {
    //debugger
    var books = getTableToRender(gSortBy)
    var table = document.querySelector('table')
    if (!books.length) {
        table.innerHTML = ` 
        <tr>
        <td> 0</td>
        <td> No books in the system </td>
        <td> 00.00 </td>
        <td> <button>Read</button><button>Update</button>
    </tr>`
        return
    }
    table.innerHTML = ` 
    <th onclick="onSortClicked('id')"> id </th>
    <th onclick="onSortClicked('title')"> title </th>
    <th onclick="onSortClicked('price')"> price </th>
    <th > <button onclick="onDeleteSelected()">delete selected </button></th>`

    for (var i = 0; i < books.length && i < 10; i++) {
        table.innerHTML += ` 
       <tr>
       <td> ${books[i].id}</td>
       <td> ${books[i].bookname}</td>
       <td> ${books[i].price}</td>
       <td> <input type="checkbox" data-id='${books[i].id}'>
        <button data-id='${books[i].id}' onclick='onRead(this)'>Read</button>
        <button data-id='${books[i].id}'onclick='onUpdate(this)'>Update</button></td></tr>`
    }

    var counter = 0
    var pageNum = 0
    document.querySelector('.buttons').innerHTML = `<button onclick='renderPage(0)'> Page 0 </button>`

    for (var i = 0; i < books.length; i++) {
        counter++
        if (counter === 10) {
            counter = 0
            pageNum++
            document.querySelector('.buttons').innerHTML += `<button onclick='renderPage(${pageNum})'> Page ${pageNum} </button>`
        }
    }
}

function renderPage(pageNum) {
    // debugger
    var books = loadFromStorage('books') //*****/
    var booksToRender = books.slice(pageNum * 10, pageNum * 10 + 10) //****/
    var table = document.querySelector('table')
    table.innerHTML = ` 
    <th onclick="onSortClicked('id')"> id </th>
    <th onclick="onSortClicked('title')"> title </th>
    <th onclick="onSortClicked('price')"> price </th>
    <th > <button onclick="onDeleteSelected()">delete selected </button></th>`
    booksToRender.forEach((book) => {

        table.innerHTML += `
       <tr>
       <td> ${book.id}</td>
       <td> ${book.bookname}</td>
       <td> ${book.price}</td>
       <td> <input type="checkbox" data-id='${book.id}'> <button data-id='${book.id}' onclick='onRead(this)'>Read</button><button data-id='${book.id}'onclick='onUpdate(this)'>Update</button></td></tr>`

    })
}


function init() {
    renderBooks(defaultSort())
}

function getAllTicked() {
    //debugger
    var inputs = Array.from(document.querySelectorAll('input[type=checkbox]'))
    var tickedInputs = inputs.filter(input => input.checked)
    console.log(inputs);
    console.log(tickedInputs);

    return tickedInputs
}

function onDeleteSelected() {
    deleteAllTicked()
    renderBooks(defaultSort())
}


function add10Books() {
    for (var i = 0; i < 10; i++) {
        addBook(getWord(), getLoremIpsum(20), getRandomInt(10, 60))
    }
    renderBooks(defaultSort())
}


function showModal() {
    document.querySelector(".inputs-container").classList.toggle('hide')
    getInput('input').value = ''
    getInput('.text-box').value = ''
    getInput('.price').value = ''
    getInput('.img-input').value = ''
    getInput('.add-or-update').innerHTML = `
    <button class="add-or-update" onclick="onAddBook()">Add Book</button>`
}


function onRead(elBook) {
    var bookId = +elBook.getAttribute('data-id')
    var targetBook = gBooks.find((book) => book.id === bookId) //*** */
    document.querySelector(".read-modal").innerHTML = `
     ${targetBook.img} 
     
    <h1>${targetBook.bookname}</h1>
    <p>${targetBook.content}</p>
    <h3>Price:</h3>
    <p>${targetBook.price}</p>
    <h3>Rating:</h3>
    <p class='rating-box' ><button onclick= 'subRate(${bookId})'>-</button> ${targetBook.rating}<button onclick='upRate(${bookId})'>+</button></p>
    <button onclick='showReadModal()'>Exit</button>`
    showReadModal()

}

function showReadModal() {
    document.querySelector(".read-modal").classList.toggle('hide')
}


function onUpdate(elBook) {
    showModal()
    var bookId = +elBook.getAttribute('data-id')
    getInput('.add-or-update').innerHTML = `<button class='add-or-update' onclick='updateBook(${bookId})'>Update Book</button>`
}

///*******/
function updateBook(bookId) {
    var currBook = getBookToUpdate(bookId)

    if (getInput('input').value) currBook.bookname = getInput('input').value
    if (getInput('.text-box').value) currBook.content = getInput('.text-box').value
    if (getInput('.price').value >= 0 && getInput('.price').value) currBook.price = getInput('.price').value
    if (getInput('.img-input').value.substring(12)) {
        currBook.img = `<img src='img/${getInput('.img-input').value.substring(12)}' alt='Something went wrong' width="150" height="150" >`
    }

    saveToStorage('books', gBooks) /****/
    renderBooks(defaultSort())
    showModal()

}


function subRate(bookId, el) {
    //debugger
    var currBook = getBookToUpdate(bookId)
    if (currBook.rating === 0) return
    currBook.rating--
        getInput('.rating-box').innerHTML = `
    <button onclick= 'subRate(${bookId})'>-</button>${currBook.rating}<button onclick='upRate(${bookId})'>+</button></p>`
}


function upRate(bookId, el) {
    var currBook = getBookToUpdate(bookId)

    if (currBook.rating === 10) return
    currBook.rating++
        getInput('.rating-box').innerHTML = `
        <button onclick='subRate(${bookId})'>-</button>${currBook.rating}<button onclick='upRate(${bookId})'>+</button></p>`

}