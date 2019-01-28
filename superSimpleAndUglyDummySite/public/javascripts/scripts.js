const color1 = document.querySelector('#color1');
const color2 = document.querySelector('#color2');
const color3 = document.querySelector('#color3');
const color4 = document.querySelector('#color4');
const color5 = document.querySelector('#color5');
const color6 = document.querySelector('#color6');


let formArea = document.getElementById('row-3')
let circle = document.querySelector('.circle')
let save = document.querySelector('.save')
let form = document.getElementById('form')
let formColor = document.getElementById('colorChoice')
let formMood = document.getElementById('mood')

document.addEventListener('click', function (event) {
    formArea.style.visibility = 'visible'
    if (event.target.matches('#color1')) {
        circle.style.backgroundColor = '#ce2a2a'
        formColor.value = '#ce2a2a'
        formMood.value = 'Stressed'
        //how hacky is this!? i feel like it works with just a few colors, but as
        //the choices available grow, the code will become excessive... could it be done 
        //in a function/loop??? probably...
    } else if (event.target.matches('#color2')) {
        circle.style.backgroundColor = '#eb9c0b'
        formColor.value = '#eb9c0b'
        formMood.value = 'Energetic'
    } else if (event.target.matches('#color3')) {
        circle.style.backgroundColor = '#ebd953'
        formColor.value = '#ebd953'
        formMood.value = 'Joyful'
    } else if (event.target.matches('#color4')) {
        circle.style.backgroundColor = '#58ce60'
        formColor.value = '#58ce60'
        formMood.value = 'Free'
    } else if (event.target.matches('#color5')) {
        circle.style.backgroundColor = '#2d7ad8'
        formColor.value = '#2d7ad8'
        formMood.value = 'Doubtful'
    } else if (event.target.matches('#color6')) {
        circle.style.backgroundColor = '#9854eb'
        formColor.value = '#9854eb'
        formMood.value = 'Creative'
    }
}, false);




console.log("i'm heeeerrreeee!")