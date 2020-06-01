'use strict'


function getWord() {
    var alphabet = 'zxcvbnmasdfghjklqwertyuiop'
    var wordLength = getRandomInt(3, 9)
    var word = ''
    for (var i = 0; i < wordLength; i++) {
        word += alphabet.charAt(getRandomInt(0, 26))
    }
    return word
}

function getLoremIpsum(wordsCount) {
    var loremIpsom = ""

    for (let i = 0; i < wordsCount; i++) {
        loremIpsom += " " + getWord()
    }
    return loremIpsom
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}