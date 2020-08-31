console.log('you are hearing me talk');

const fxn1 = function() {
    console.log('clicked button 1');
}
$('#button1').on('click', fxn1);

const board1 = $('#board');
for(i=0; i<5; i++){
    for(j=0; j<5; j++){
        const newSquare = $('<div/>').addClass('square');
        newSquare.attr('x-coord', j);
        newSquare.attr('y-coord', i);
        board1.append(newSquare);
    }
}

const clickSquare = function(event){
    xProp = $(event.target).attr('x-coord');
    yProp = $(event.target).attr('y-coord');
    console.log(xProp+", "+yProp);
}

$('.square').on('click', clickSquare);

const piece1 = $('<div/>').addClass('piece');
piece1.attr('piecetype', 'sage');
const sage1 = {
    icon: piece1
};

$('#play-area').append(sage1.icon);

let activePiece;

const startAction = function(event){
    console.log('click piece');
    console.log(event.target);
    console.log($(event.target));
    activePiece = $(event.target);
    console.log(activePiece);
    activePiece.css('background-color', '#a10000')
}

piece1.on('click', startAction);

const endAction = function(event){
    console.log('end action begin');
    if(activePiece){
        let targetVar = $(event.target);
        if(targetVar.attr('class') === 'square'){
            x1 = targetVar.attr('x-coord');
            y1 = targetVar.attr('y-coord');
            base1 = activePiece.baseColor;
            activePiece.css('left', (5+(x1*81))+'px');
            activePiece.css('top', (10+(y1*79))+'px');
            //activePiece.css('background-color', base1);
            activePiece.css('background-color', 'black');
            console.log(activePiece);
            activePiece = null;
        }
    }
}

$('.square').on('click', endAction);
