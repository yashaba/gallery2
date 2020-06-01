'use strict'


var gBooks = createBooks()
var gSortBy = defaultSort()


function createBooks() {
    var books = loadFromStorage('books')

    if (!books || !books.length) {
        books = []
    }
    return books
}


function createBook(bookname, content, price, img = 'default.png', rating = 0) {

    return {
        id: getNextId(),
        bookname: bookname,
        img: `<img src='img/${img}' alt='Something went wrong' width="150" height="150" >`, //*****/
        content: content,
        price: price,
        rating: rating
    }
}

console.log(loadFromStorage('books'));

function addBook(bookname, content, price, img) {
    var book = createBook(bookname, content, price, img)
    gBooks.unshift(book)
    saveToStorage('books', gBooks)
}


function sortBooks(sortBy) {
    var books = loadFromStorage('books')

    if (sortBy === 'id') {
        books.sort((a, b) => (a.id > b.id) ? 1 : -1)

    }
    if (sortBy === 'title') {
        books.sort((a, b) => (a.bookname > b.bookname) ? 1 : -1)
    }
    if (sortBy === 'price') {
        books.sort((a, b) => (a.price > b.price) ? 1 : -1)
    }
    saveToStorage('books', books)
    return books
}


function getNextId() {

    var maxId = loadFromStorage('max-id')
    if (!maxId) maxId = 0
    var nextId = maxId + 1
    saveToStorage('max-id', nextId)

    return nextId
}


function getTableToRender(gSortBy) {
    //debugger
    var books = sortBooks(gSortBy)
        //books = books.slice(gPageIdx, PAGEIZE)
        // gPageIdx += 10

    return books
}


function defaultSort() {
    var defaultSort = loadFromStorage('default-sort')
    if (!defaultSort) {
        setDefaultSort('id')
    }
    return loadFromStorage('default-sort')
}


function setDefaultSort(sortBy) {
    saveToStorage('default-sort', sortBy)
}


function deleteAllTicked() {

    var tickedInputs = getAllTicked()
    var tickedIds = tickedInputs.map(input => input.getAttribute('data-id')) //*****/
    console.log(tickedIds);

    for (let i = 0; tickedIds.length; i++) {
        if (gBooks[i].id == tickedIds[0]) {
            gBooks.splice(i, 1)
            tickedIds.shift()
            i = -1
        }
    }
    saveToStorage('books', gBooks)
    return gBooks
}

function getBookToUpdate(bookId) {
    var idx = gBooks.findIndex((book) => book.id === bookId)
    console.log(idx);
    return gBooks[idx]
}