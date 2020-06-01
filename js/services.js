var gProjs = [createProj('minesweeper', 'Mine Sweeper', 'Watch out from the mines!', 'An enhanced version of the classic minesweeper game', 'projs/test', '03 / 05 / 2020', 'Matrixes,Game,Classic'),
    createProj('adminpanel', 'Admin Panel', 'Has a nasty secret', 'A basic login system , default username&pw : admin admin', 'projs/test', '27 / 05 / 2020', 'MVC,Website'),
    createProj('bookstore', 'Book Store', 'Best book store around', 'Simple book store managment system,image has to be in img folder to work ', 'projs/test', '30 / 05 / 2020', 'MVC,Store'),
    createProj('memorystone', 'Memory Stone', 'Classic memory card game', 'Classic memory game, you will have 5 seconds to memorize the cards', 'projs/test', '28 / 02 / 2020', 'First project,Game'),
    createProj('pacman', 'Pac-Man', 'No-shame copy of Pac-Man', 'Modern design of the classic pacman, truly amazing', 'projs/test', '18 / 05 / 2020', 'Matrixes,Game'),
    createProj('ballcollector', 'Ball-Collector', 'Ball collecting simulator', 'Unfinished revolutionary game', 'projs/test', '19 / 05 / 2020', 'Matrixes,Game,Amazing'),
]

function getPortCard(sentCardId) {
    return gProjs.find(card => card.id === sentCardId)
}

function createProj(id, name, title, desc, url, pubat, labels) {
    return {
        id: id,
        name: name,
        title: title,
        desc: desc,
        url: url,
        publishedAt: pubat,
        labels: labels,
    }
}

function getPortCards() {
    return gProjs
}