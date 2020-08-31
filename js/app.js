console.log('you are hearing me talk');

const fxn1 = function() {
    console.log('clicked button 1');
}
$('#button1').on('click', fxn1);

const board1 = $('#board');
for(i=1; i<=3; i++){
    const newSquare = $('<div/>').addClass('square');
    board1.append(newSquare);
}
