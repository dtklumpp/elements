console.log('you are hearing me talk');
//credits: got cool idea from liz re: 1s and 2s
const fxn1 = function() {
    console.log('clicked button 1');
}
$('#button1').on('click', fxn1);


//everything below here could be the "Game Object"
//would just have to add a lot of "this" keywords...

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

//more global constants for the game
let adjArray = [];
let activePiece;
const allSquares = [];
//
let waterArray = [];





//make elements
const elements1 = {
    water: {name: 'water', color: 'blue'},
    air: {name: 'air', color: 'grey'},
    earth: {name: 'earth', color: 'brown'},
    fire: {name: 'fire', color: 'orange'}
}


//make board
const board1 = $('#board');
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















const startAction = function(event){
    console.log('click piece');
    event.stopPropagation();
    if(!midAction){
        //console.log(event.target);
        //console.log($(event.target));
        if(!activePiece){
            activePiece = $(event.target);
            //console.log(activePiece);
            activePiece.css('background-color', '#f10000')
        }
    }
}












const makeSage = function(color1) {
    const newPiece = $('<div/>').addClass('piece sage');
    newPiece.attr('piecetype', 'sage');
    newPiece.attr('base-color', color1);
    newPiece.css('background-color', color1);
    newPiece.css('z-index', 1);
    //test add listeners
    newPiece.on('click', startAction);
    newPiece.on('click', clickAction);
    return newPiece;
}

const makeStone = function(elementType) {
    const newStone = $('<div/>').addClass('piece stone');
    newStone.attr('piecetype', elementType.name);
    newStone.attr('base-color', elementType.color);
    newStone.css('background-color', elementType.color);
    //test add listeners
    newStone.on('click', startAction);
    newStone.on('click', clickAction);
    return newStone;
}
















const getCoords = function(jqEl){
    if(jqEl.attr('class') === 'square'){
        let x1 = jqEl.attr('x-coord');
        let y1 = jqEl.attr('y-coord');
    }
    else{
        let x1 = jqEl.parent().attr('x-coord');
        let y1 = jqEl.parent().attr('y-coord');
    }
    return {
        x1: x1,
        y1: y1
    };
}

const getDistance = function(piece1, square1){
    let x1 = piece1.parent().attr('x-coord');
    let y1 = piece1.parent().attr('y-coord');
    let x2 = square1.attr('x-coord');
    let y2 = square1.attr('y-coord');
    //console.log("get distance: ", x1, x2, y1, y2);
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
    if(activePiece){
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
}

const highlightAdjacentSquares = function(){
    for(eachSquare of adjArray){
        eachSquare.css('border', 'dotted 2px red');
    }
}

const resetAdjacentSquares = function(){
    for(eachSquare of adjArray){
        eachSquare.css('border', 'solid 1px black');
    }
    adjArray = [];
}

const isEmpty = function(checkSquare){
    return (checkSquare.children().length === 0)
}

const announce = function(announcement1){
    $('#announcements').text(announcement1); // set announcement area
}

//checks if there's a mountain in the way of the Sage
const noMountain = function(piece1, square1){
    let x1 = piece1.parent().attr('x-coord');
    let y1 = piece1.parent().attr('y-coord');
    let x2 = square1.attr('x-coord');
    let y2 = square1.attr('y-coord');
    //check if piece at x1, y2 AND at x2, y1 is mountain
    const id1 = Number(x1) + Number(y2)*5;
    const id2 = Number(x2) + Number(y1)*5;
    const type1 = $('#'+id1).children().eq(0).attr('piecetype');
    const type2 = $('#'+id2).children().eq(0).attr('piecetype');
    if(type1 === 'earth' && type2 === 'earth'){
        return false;
    }
    else{
        return true;
    }
}




















const clickAction = function(event){
    console.log('end action begin');

    //more complicated so can click on pieces as squares too...
    let isSquare = ($(event.target).attr('class') === 'square')
    let targetVar = isSquare ? $(event.target) : $(event.target).parent();
    console.log("targetVar:", targetVar);
    console.log(targetVar.attr('x-coord'), targetVar.attr('y-coord'));
    //go back to this if getting weird behavior...

    if(midAction){midActionFunction(targetVar);}
    else {endActionFunction(targetVar);}
}
$('.square').on('click', clickAction);











const midActionFunction = function(targetVar){
    if(fireDrill){fireDrillAction(targetVar);}
    if(airDrill){airDrillAction(targetVar);}
    if(waterDrill){waterDrillAction(targetVar);}
    if(earthDrill){earthDrillAction(targetVar);}
}

const endActionFunction = function(targetVar){
    //had: && targetVar.attr('class') === 'square'
    //but it always is...
    if(activePiece){
        console.log("active piecetype: ", activePiece.attr('piecetype'));
        
        //case Sage:
        //case Fire:
        //case Water:
        if(activePiece.attr('piecetype') === 'sage'){sageAction(targetVar);}
        else 
        if(activePiece.attr('piecetype') === 'fire'){fireAction(targetVar);}
        else
        if(activePiece.attr('piecetype') === 'water'){waterAction(targetVar);}
        
        //case Air -- nothing extra
        //case Earth -- nothing extra
        
        //misc Case
        //placeholder handler for all unspecified types of pieces
        else {if(isEmpty(targetVar)){
            targetVar.append(activePiece);
            resetActivePiece();
        }}
    }
}

















const airDrillAction = function(targetVar){
    sageAction(targetVar);
}

const sageAction = function(targetVar){
    const targetType = targetVar.children().eq(0).attr('piecetype');
    if(isEmpty(targetVar) || targetType === 'air'){
        const dist1 = getDistance(activePiece,targetVar);
        console.log("distance: ", dist1);
        if(dist1 < 1.5){
            if(noMountain(activePiece,targetVar)){
                targetVar.append(activePiece);
                if(targetType === 'air'){
                    console.log('air drill');
                    adjArray = getAdjacentSquares();
                    highlightAdjacentSquares();
                    airDrill = true;
                    midAction = true;
                    console.log('air jump!');
                    announce('keep going!');
                }
                else{
                    resetActivePiece();
                    resetAdjacentSquares();
                    airDrill = false;
                    midAction = false;
                    announce(''); // reset announcement area
                }
            }
            else{
                console.log('mountain drill');
            }


        }
    }
}

const fireAction = function(targetVar){
    console.log('fire action');
    if(isEmpty(targetVar)){
        targetVar.append(activePiece);
        adjArray = getAdjacentSquares();
        highlightAdjacentSquares();
        //start the fire element mid-action power sequence:
        fireDrill = true;
        midAction = true;
        //alert('add a fire piece!');
        announce('Add a fire piece!');
        //end action
        resetActivePiece();
    }
}

const fireDrillAction = function(targetVar){
    console.log('fire drill');
    if(isEmpty(targetVar)){
        console.log('fire drill');
        const stone1 = makeStone(elements1.fire);
        targetVar.append(stone1);
        //later, add listeners to parent elements somehow...
        //test drop listeners
        //$('.piece').on('click', startAction);
        //$('.piece').on('click', endAction);
        //then reset all the intermediate stuff
        resetAdjacentSquares();
        announce(''); // reset announcement area
        fireDrill = false;
        midAction = false;
        //why doesn't set mid-action back to false?  just deleted??
    }
}

//nothing happens here
const earthDrillAction = function(targetVar){
    return;
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



















//move this all to the top later

//see elements definition top of page

const bag1 = [];
//const colors1 = ['blue', 'grey', 'brown', 'orange']

//gah this really needs to be a factory...
//populate bag of stones
for(eachType in elements1){
    console.log(eachType);
    for(i=1; i<=15; i++){
        const stone1 = makeStone(elements1[eachType]);
        bag1.push(stone1);
    }
}
indexRand = Math.floor(Math.random()*bag1.length)
const randDraw = bag1.splice(indexRand, 1)[0];
$('#4').append(randDraw);

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
    //test drop listeners
    //$('.piece').on('click', startAction);
    //$('.piece').on('click', endAction);
}

$('#button2').on('click', drawStones);

$('#button3').on('click', resetActivePiece);

$('#button4').on('click', getAdjacentSquares);



//test drop listeners
//$('.piece').on('click', startAction);
//first piece never gets endAction
//$('.piece').on('click', endAction);


//const piece1 = $('<div/>').addClass('piece');
//piece1.attr('piecetype', 'sage');