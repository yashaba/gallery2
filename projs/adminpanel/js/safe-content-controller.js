'use strict'



function getUserName() {
    var elUserName = document.querySelector('.username')
    var username = elUserName.value;
    elUserName.value = '';
    return username
}


function getPassWord() {
    var elPw = document.querySelector('.pw')
    var pw = elPw.value;
    elPw.value = '';
    return pw
}


function onSignIn() {

    var username = getUserName()
    var pw = getPassWord()
    var getUserIdx = gUsers.findIndex(user => user.userName === username)
    if (getUserIdx === -1) {
        alert('Wrong username or password')
        return
    }

    if (gUsers[getUserIdx].passWord === pw) {

        console.log('user found');
        gUsers[getUserIdx].lastLogin = new Date()
        toggleLogin()
        document.querySelector('h2').innerHTML = ` User: ${username}`

    }
    if (gUsers[getUserIdx].isAdmin ||
        (username === gAdmins.userName && pw === gAdmins.passWord)) {
        gElsecret.innerHTML += `<button onclick="goToAdminPage()" class='admin-button'> Admin panel </button>`
    }
}


function onLogOut() {
    toggleLogin()
    if (!gElAdminButton.classList.contains(('hide'))) {
        gElAdminButton.classList.toggle('hide')
    }
}


function onSignUp() {
    var username = getUserName()
    var pw = getPassWord()
    if (username === '' || pw === '') return

    if (username === 'admin' && pw === 'admin') {
        addUser(username, pw, true)
        return
    }

    addUser(username, pw, false)
}


function toggleLogin() {
    gElLogin.classList.toggle('hide')
    gElsecret.classList.toggle('hide')
}




function goToAdminPage() {
    window.location = 'admin.html'
}

function renderTable() {
    gUsers.forEach(function(user) {
        //debugger

        document.querySelector('table').innerHTML += `
        <tr>
        <td>${user.userName}</td>
         <td>${user.lastLogin} </td>
        </tr>`
    })

}

function goToMainPage() {
    window.location = 'index.html'
}