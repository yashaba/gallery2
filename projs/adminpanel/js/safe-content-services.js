'use strict'

var gUsers = _createUsers()
var gElLogin = document.querySelector('.login')
var gElsecret = document.querySelector('.secret')
var gElAdminButton = document.querySelector('.admin-button')




function addUser(username, pw, isAdmin) {
    //debugger
    var user = _createUser(username, pw, isAdmin);
    gUsers.push(user)
    saveToStorage('users', gUsers)

}


function _createUser(username, pw, isAdmin) {
    return {
        id: _makeId(),
        userName: username,
        passWord: pw,
        isAdmin: isAdmin,
        lastLogin: convertDate(new Date()),
    }
}


function _makeId(length = 8) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _createUsers() {

    var users = loadFromStorage('users')
    if (!users || !users.length) {
        users = []
    }
    return users;
}


function convertDate(timestamp) {
    var today = timestamp
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today
}