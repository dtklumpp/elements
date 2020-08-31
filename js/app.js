console.log('you are hearing me talk');

const fxn1 = function() {
    console.log('clicked button 1');
}
$('#button1').on('click', fxn1);

const board1 = $('#board');
for(i=1; i<=5; i++){
    for(j=1; j<=5; j++){
        const newSquare = $('<div/>').addClass('square');
        newSquare.attr('x-coord', j);
        newSquare.attr('y-coord', i);
        board1.append(newSquare);
    }
}
