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

//replace this with a class factory
const piece1 = $('<div/>').addClass('piece');
piece1.attr('piecetype', 'sage');
const sage1 = {
    icon: piece1
};
piece1.attr('base-color', 'black');

const piece2 = $('<div/>').addClass('piece');
piece2.attr('piecetype', 'sage');
const sage2 = {
    icon: piece2
};
piece2.attr('base-color', 'white');
piece2.css('top', '5px');
piece2.css('left', '10px');
piece2.css('background-color', 'white');




$('#play-area').append(sage1.icon);
$('#play-area').append(sage2.icon);

let activePiece;

const startAction = function(event){
    console.log('click piece');
    console.log(event.target);
    console.log($(event.target));
    activePiece = $(event.target);
    console.log(activePiece);
    activePiece.css('background-color', '#a10000')
}


const endAction = function(event){
    console.log('end action begin');
    if(activePiece){
        //if(activePiece.attr('piecetype') === 'sage'){
            let targetVar = $(event.target);
            if(targetVar.attr('class') === 'square'){
                x1 = targetVar.attr('x-coord');
                y1 = targetVar.attr('y-coord');
                base1 = activePiece.attr('base-color');
                activePiece.css('left', (5+(x1*81))+'px');
                activePiece.css('top', (10+(y1*79))+'px');
                activePiece.css('background-color', base1);
                //activePiece.css('background-color', 'black');
                console.log(activePiece);
                activePiece = null;
            }
        //}
    }
}

$('.square').on('click', endAction);

const bag1 = [];
const colors1 = ['blue', 'grey', 'brown', 'orange']
for(eachColor of colors1){
    for(i=1; i<=15; i++){
        const element1 = $('<div/>').addClass('piece stone');
        element1.css('background-color', eachColor);
        element1.addClass(eachColor);
        element1.attr('base-color', eachColor);
        bag1.push(element1);
    }
}
indexRand = Math.floor(Math.random()*bag1.length)
const randDraw = bag1[indexRand];
console.log(randDraw);
randDraw.css('top', '5px');
randDraw.css('left', '335px');
$('#play-area').append(randDraw);


$('.piece').on('click', startAction);

//const piece1 = $('<div/>').addClass('piece');
//piece1.attr('piecetype', 'sage');
