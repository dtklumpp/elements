console.log('you are hearing me talk');
//credits: got cool idea from liz re: 1s and 2s
const fxn1 = function() {
    console.log('clicked button 1');
}
$('#button1').on('click', fxn1);











const board1 = $('#board');
const allSquares = [];
for(i=0; i<5; i++){
    for(j=0; j<5; j++){
        const newSquare = $('<div/>').addClass('square');
        newSquare.attr('x-coord', j);
        newSquare.attr('y-coord', i);
        newSquare.css('position', 'relative');
        newSquare.attr('id', j+5*i);
        allSquares.push(newSquare);
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
//piece1.appendTo($('#24'));
$('#24').append(piece1);

const piece2 = $('<div/>').addClass('piece');
piece2.attr('piecetype', 'sage');
const sage2 = {
    icon: piece2
};
piece2.attr('base-color', 'white');
//piece2.css('top', '5px');
//piece2.css('left', '10px');
piece2.css('background-color', 'white');
//piece2.appendTo($('#0'));
$('#0').append(piece2);

//$('#play-area').append(sage1.icon);
//$('#play-area').append(sage2.icon);
















let activePiece;

const startAction = function(event){
    console.log('click piece');
    //console.log(event.target);
    //console.log($(event.target));
    if(!activePiece){
        activePiece = $(event.target);
        //console.log(activePiece);
        activePiece.css('background-color', '#f10000')
    }
}















/* 
const movePiece = function(startPiece, endSquare){
    x1 = endSquare.attr('x-coord');
    y1 = endSquare.attr('y-coord');
    endSquare.append(activePiece);
} */

const getCoords = function(jqEl){
    if(jqEl.attr('class') = 'square'){
        x1 = jqEl.attr('x-coord');
        y1 = jqEl.attr('y-coord');
    }
    else{
        x1 = jqEl.parent().attr('x-coord');
        y1 = jqEl.parent().attr('y-coord');
    }
    return {
        x1: x1,
        y1: y1
    };
}

const getDistance = function(piece1, square1){
    x1 = piece1.parent().attr('x-coord');
    y1 = piece1.parent().attr('y-coord');
    x2 = square1.attr('x-coord');
    y2 = square1.attr('y-coord');
    console.log(x1, x2, y1, y2);
    return (Math.sqrt((x1-x2)**2 + (y1-y2)**2));
}

const resetActivePiece = function(){
    if(activePiece){
        base1 = activePiece.attr('base-color');
        activePiece.css('background-color', base1);
        //activePiece.css('background-color', 'black');
        //console.log(activePiece);
        activePiece = null;
    }
}

const getAdjacentSquares = function(){
    centerPiece = activePiece;
    adjArray = [];
    //x1 = getCoords(centerPiece).x1;
    //y1 = getCoords(centerPiece).y1;
    centerID = centerPiece.parent().attr('id');
    for(eachSquare of allSquares){
        if(getDistance(centerPiece, eachSquare) < 1.5
                && eachSquare.attr('id') != centerID){
                    adjArray.push(eachSquare);
                }
    }
    console.log(adjArray);
}

const endAction = function(event){
    console.log('end action begin');
    let targetVar = $(event.target);

    if(activePiece
        && targetVar.attr('class') === 'square'
        && targetVar.children().length === 0){

            if(activePiece.attr('piecetype') === 'sage'){
                //console.log(getCoords(targetVar).x1);
                //console.log(getCoords(targetVar).y1);
                const dist1 = getDistance(activePiece,targetVar);
                console.log(dist1);
                if(dist1 < 1.5){
                    targetVar.append(activePiece);
                    resetActivePiece();
                }
            }
            else {
                    targetVar.append(activePiece);
                    resetActivePiece();
            }


            //movePiece(activePiece, targetVar);
            //if(activePiece.attr('piecetype') === 'sage'){
           ////// x1 = targetVar.attr('x-coord');
           ////// y1 = targetVar.attr('y-coord');
           ///////////targetVar.append(activePiece);
            //activePiece.css('left', '5px');
            //activePiece.css('top', '5px');
            //move to position of clicked square
            //activePiece.css('left', (5+(x1*81))+'px');
            //activePiece.css('top', (10+(y1*79))+'px');
        //base1 = activePiece.attr('base-color');
        //activePiece.css('background-color', base1);
            //activePiece.css('background-color', 'black');
            //console.log(activePiece);
        //activePiece = null;
            
        //}
    }
}
$('.square').on('click', endAction);



















const bag1 = [];
//const colors1 = ['blue', 'grey', 'brown', 'orange']
const elements1 = [
    {name: 'water', color: 'blue'},
    {name: 'air', color: 'grey'},
    {name: 'earth', color: 'brown'},
    {name: 'fire', color: 'orange'}
]
for(eachType of elements1){
    for(i=1; i<=15; i++){
        const stone1 = $('<div/>').addClass('piece stone');
        stone1.css('background-color', eachType.color);
        stone1.attr('base-color', eachType.color);
        stone1.addClass(eachType.name);
        bag1.push(stone1);
    }
}
indexRand = Math.floor(Math.random()*bag1.length)
const randDraw = bag1.splice(indexRand, 1)[0];
//console.log(randDraw);
//randDraw.css('top', '5px');
//randDraw.css('left', '335px');
//randDraw.appendTo($('#5'));
$('#4').append(randDraw);
//$('#play-area').append(randDraw);

//make fxn of n?
const drawStones = function(){
    console.log('clicked button 2');
    for(i = 0; i < 5; i++){
        index1 = Math.floor(Math.random()*bag1.length);
        newStone = bag1.splice(index1,1)[0];
        newStone.css('position', 'relative');
        $('#panel').append(newStone);

    }
    //omg this is so WET i just copy-pasted
    $('.piece').on('click', startAction);
}

$('#button2').on('click', drawStones);

$('#button3').on('click', resetActivePiece);

$('#button4').on('click', getAdjacentSquares);













$('.piece').on('click', startAction);
//const piece1 = $('<div/>').addClass('piece');
//piece1.attr('piecetype', 'sage');