
const PLAYER1 = 'fa-circle-o';
const PLAYER2 = 'fa-times';
let round = 1;



const boxes = [...document.querySelectorAll('.box')];
boxes.forEach(box => box.addEventListener('click', pick));