const color1 = document.querySelector('#color1');
const color2 = document.querySelector('#color2');
const color3 = document.querySelector('#color3');
const color4 = document.querySelector('#color4');
const color5 = document.querySelector('#color5');
const color6 = document.querySelector('#color6');

let circle = document.querySelector('.circle')

let lighten = document.querySelector('.light');
let darken = document.querySelector('.dark');

let save = document.querySelector('.save')

document.addEventListener('click', function (event) {
    if (event.target.matches('#color1')) {
        circle.style.backgroundColor = '#ce2a2a'
    } else if (event.target.matches('#color2')) {
        circle.style.backgroundColor = '#eb9c0b'
    } else if (event.target.matches('#color3')) {
        circle.style.backgroundColor = '#ebd953'
    } else if (event.target.matches('#color4')) {
        circle.style.backgroundColor = '#58ce60'
    } else if (event.target.matches('#color5')) {
        circle.style.backgroundColor = '#2d7ad8'
    } else if (event.target.matches('#color6')) {
        circle.style.backgroundColor = '#9854eb'
    }

}, false);


document.addEventListener('click', function(event) {
    let circleColor = document.getElementById('circle').style.backgroundColor;
    if (event.target.matches('.light')) {
        circle.style.backgroundColor = chroma(circleColor).brighten(1);
    } else if (event.target.matches('.dark')) {
        circle.style.backgroundColor = chroma(circleColor).darken(1);
    }
})

// document.addEventListener('click', function(event))


console.log("i'm heeeerrreeee!")