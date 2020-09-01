console.log('you are hearing me talk');
//credits: got cool idea from liz re: 1s and 2s
const fxn1 = function() {
    console.log('clicked button 1');
}
$('#button1').on('click', fxn1);

//global vars
//these constants determine if game is in an intermediate state
//they are used to tell even listeners what to do...

//are we in the middle of an element action?
let midAction = false; //not yet...
//if so, which action?
let fireDrill = false;
let airDrill = false;
let waterDrill = false;
let earthDrill = false;
//none of them, yet...




const elements1 = [
    {name: 'water', color: 'blue'},
    {name: 'air', color: 'grey'},
    {name: 'earth', color: 'brown'},
    {name: 'fire', color: 'orange'}
]







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
    const target1 = $(event.target);
    xProp = target1.attr('x-coord');
    yProp = target1.attr('y-coord');
    console.log("clicksquare coords: ", xProp+", "+yProp);
}
$('.square').on('click', clickSquare);













const makeSage = function(color1) {
    const newPiece = $('<div/>').addClass('piece sage');
    newPiece.attr('piecetype', 'sage');
    newPiece.attr('base-color', color1);
    newPiece.css('background-color', color1);
    newPiece.css('z-index', 1);
    return newPiece;
}

//make the sages
const piece1 = makeSage('black');
const piece2 = makeSage('white');

//put them in the corners to start
$('#24').append(piece1);
$('#0').append(piece2);

//eventually i want all pieces to be objects with..
//..an "icon" representing them in the DOM
const sage1 = {icon: piece1};
const sage2 = {icon: piece2};








/* 

//replace this with a class factory
const piece1 = $('<div/>').addClass('piece');
piece1.attr('piecetype', 'sage');
piece1.css('z-index', 1);
const sage1 = {
    icon: piece1
};

piece1.attr('base-color', 'black');
piece1.css('background-color', 'black');

//piece1.appendTo($('#24'));

const piece2 = $('<div/>').addClass('piece');
piece2.attr('piecetype', 'sage');
piece2.attr('z-index', 1);
const sage2 = {
    icon: piece2
};
piece2.attr('base-color', 'white');
//piece2.css('top', '5px');
//piece2.css('left', '10px');
piece2.css('background-color', 'white');
//piece2.appendTo($('#0'));

//$('#play-area').append(sage1.icon);
//$('#play-area').append(sage2.icon);

 */














let activePiece;

const startAction = function(event){
    event.stopPropagation();
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
    console.log("get distance: ", x1, x2, y1, y2);
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

let adjArray = [];
const getAdjacentSquares = function(){
    centerPiece = activePiece;
    //x1 = getCoords(centerPiece).x1;
    //y1 = getCoords(centerPiece).y1;
    centerID = centerPiece.parent().attr('id');
    for(eachSquare of allSquares){
        if(getDistance(centerPiece, eachSquare) < 1.5
                && eachSquare.attr('id') != centerID){
                    adjArray.push(eachSquare);
                }
    }
    console.log("adjArray: ", adjArray);
    return adjArray;
}

const highlightAdjacentSquares = function(){
    for(eachSquare of adjArray){
        eachSquare.css('border', 'dotted 1px red');
    }
}

const resetAdjacentSquares = function(){
    for(eachSquare of adjArray){
        eachSquare.css('border', 'solid 1px black');
    }
}

const makeStone = function(elementType) {
    const newStone = $('<div/>').addClass('piece stone');
    newStone.attr('piecetype', elementType.name);
    newStone.attr('base-color', elementType.color);
    newStone.css('background-color', elementType.color);
    return newStone;
}

const isEmpty = function(checkSquare){
    return (checkSquare.children().length === 0)
}













const endAction = function(event){
    console.log('end action begin');
    let targetVar = $(event.target);
    if(fireDrill){
        //console.log('targetVar: ', targetVar);
        if(isEmpty(targetVar)){
            console.log('fire drill');
            const stone1 = makeStone(elements1[3]);
            targetVar.append(stone1);
            fireDrill = false;
            resetAdjacentSquares();
            midAction = true;
            $('.piece').on('click', startAction); //this too!
            adjArray = [];
            $('#metric').text('');
            


            //note: should be replaced with create stone method //done
            /* const eachType = elements1[3];
            const stone1 = $('<div/>').addClass('piece stone');
            stone1.css('background-color', eachType.color);
            stone1.attr('base-color', eachType.color);
            stone1.attr('piecetype', eachType.name); */

        }
    }
    if(midAction){
        midAction = false;
        return;
    }
    console.log("active piecetype: ", activePiece.attr('piecetype'));
    if(activePiece
        //&& targetVar.attr('class') === 'square'
        //temporary comment to let Sage walk on wind
        //&& isEmpty(targetVar)
        ){
            //case Sage
            if(activePiece.attr('piecetype') === 'sage'){
                if(isEmpty(targetVar)){
                    const dist1 = getDistance(activePiece,targetVar);
                    console.log("distance: ", dist1);
                    if(dist1 < 1.5){
                        targetVar.append(activePiece);
                        resetActivePiece();
                    }
                }
                //console.log(getCoords(targetVar).x1);
                //console.log(getCoords(targetVar).y1);
            }
            //case Fire
            else if(activePiece.attr('piecetype') === 'fire'){
                if(isEmpty(targetVar)){
                    targetVar.append(activePiece);
                    adjArray = getAdjacentSquares();
                    highlightAdjacentSquares();
                    //alert('add a fire piece!');
                    $('#metric').text('Add a fire piece!');
                    console.log('fire piece');
                    resetActivePiece();
                    fireDrill = true;
                }
            }
            //misc Case
            else { //placeholder handler for all unspecified types of pieces
                if(isEmpty(targetVar)){
                    targetVar.append(activePiece);
                    resetActivePiece();
                }
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


















//see elements definition top of page

const bag1 = [];
//const colors1 = ['blue', 'grey', 'brown', 'orange']

//gah this really needs to be a factory...
for(eachType of elements1){
    for(i=1; i<=15; i++){

        const stone1 = makeStone(eachType);

/*         const stone1 = $('<div/>').addClass('piece stone');
        stone1.css('background-color', eachType.color);
        stone1.attr('base-color', eachType.color);
        stone1.attr('piecetype', eachType.name); */

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