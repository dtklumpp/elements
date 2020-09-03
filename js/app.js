console.log('you are hearing me talk');
//credits: got cool idea from liz re: 1s and 2s
// const fxn1 = function() {
//     console.log('clicked button 1');
// }
// $('#button1').on('click', fxn1);


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
//let centerPiece;
const allSquares = [];
//
let waterArray = [];
let waterIDs = [];
let waterTail;
let waterFlow = false;
let waterCounter = 1;

//global constants for turn handling
let firstPlayerTurn = true;
//these should be put in the player object
let movesLeft;
let drewStones = false;
//kind of a hacky variable here
//what was here??

//anyway this one is for animation
let isAnimate = true;




//make elements
const elements1 = {
    water: {name: 'water', color: '#778da9'},
    air: {name: 'air', color: '#ecf8f8'},
    earth: {name: 'earth', color: '#997b66'},
    fire: {name: 'fire', color: '#ffcb69'}
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













const whoseTurn = function() {
    return firstPlayerTurn ? 1 : 2;
}

const startAction = function(event){
    console.log('click piece');
    event.stopPropagation();
    if(!midAction){
        //console.log(event.target);
        //console.log($(event.target));
        let targetVar = $(event.target);
        let pieceOwner = Number(targetVar.attr('owner'));
        let isTurn = (whoseTurn() === pieceOwner);
        console.log('owner: ', pieceOwner);
        if(!activePiece
            && (isTurn || !pieceOwner)
            ){
                activePiece = $(event.target);
                //activePiece.css('background-color', '#f10000')




                activePiece.addClass('selected');
                //activePiece.css('border', 'solid 2px red');
            }
    }
}












const makeSage = function(color1, playerVar) {
    const newPiece = $('<div/>').addClass('piece sage');
    newPiece.attr('piecetype', 'sage');
    newPiece.attr('base-color', color1);
    newPiece.css('background-color', color1);
    newPiece.css('z-index', 1);
    newPiece.attr('owner', playerVar);
    newPiece.attr('id', 'Sage'+playerVar)
    newPiece.addClass('sage');
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
    newStone.attr('owner', 5); //owned by the board for now
    return newStone;
}
















const getCoords = function(jqEl){
    let x1;
    let y1;
    if(jqEl.hasClass('square')){
        //console.log('got here 1');;
        x1 = jqEl.attr('x-coord');
        y1 = jqEl.attr('y-coord');
        //console.log(x1, y1);
    }
    else{
        //console.log('got here 2');
        x1 = jqEl.parent().attr('x-coord');
        y1 = jqEl.parent().attr('y-coord');
    }
    return {
        xco: x1,
        yco: y1
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








//this function is conveniently doubling as the end-of-turn function
//should probably rename it to that
const resetActivePiece = function(){
    if(activePiece){
        //base1 = activePiece.attr('base-color');
        //activePiece.css('background-color', base1);

        //test, put back later
        //activePiece.css('border', 'solid 1px black');
        activePiece.removeClass('selected');


        if(activePiece.attr('piecetype') != 'sage'){
            activePiece.attr('owner', 5); //there will never be a player 5---5 is the board itself
        };
        activePiece = null;
    }
    //console.log('here we go');
    //announce('here we go');
    $('#moves'+whoseTurn()).text(movesLeft);
    //switch turns if out of moves
    if(!movesLeft){
        $('#hand'+whoseTurn()).empty();
        switchTurns()

        //check for victory
        let currentSage = $('#Sage'+whoseTurn());
        //console.log(currentSage);
        adjArray = getAdjacentSquares(currentSage);
        //console.log(adjArray);
        let gameEnd = true;
        console.log('game end loop)');
        for(eachSquare of adjArray){
            //console.log(eachSquare);
            //console.log(isEmpty(eachSquare));
            //console.log(eachSquare.attr('piecetype'));
            const targetType = eachSquare.children().eq(0).attr('piecetype');
            if(noMountain(currentSage, eachSquare)
                &&
                (isEmpty(eachSquare) || targetType === 'air')
                ){
                    //console.log('make false');
                    gameEnd = false;
                }
        }
        adjArray = [];
        if(gameEnd){
            winner1 = 3 - (whoseTurn());
            announce('Sage trapped!  Player '+winner1+' is the winner!!!');
        }
        else {
            //console.log('here we are');
            announce('player '+whoseTurn()+' to play!');
        }
        //announce('here we are');
    
    };
}

const getAdjacentSquares = function(inputPiece){
        let centerPiece = inputPiece;
        //x1 = getCoords(centerPiece).x1;
        //y1 = getCoords(centerPiece).y1;
        centerID = centerPiece.parent().attr('id');
        for(eachSquare of allSquares){
            if(getDistance(centerPiece, eachSquare) < 1.5
                    && eachSquare.attr('id') != centerID){
                        adjArray.push(eachSquare);
                    }
        }
        //console.log("adjArray: ", adjArray);
        return adjArray;
}

const highlightAdjacentSquares = function(){
    for(eachSquare of adjArray){

        eachSquare.addClass('adjacent');
        //eachSquare.css('border', 'dotted 2px red');
    }
}

const resetAdjacentSquares = function(){
    for(eachSquare of adjArray){

        eachSquare.removeClass('adjacent');
        //eachSquare.css('border', 'solid 1px black');
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
    let isSquare = ($(event.target).hasClass('square'));
    let targetSq = isSquare ? $(event.target) : $(event.target).parent();
    console.log("targetSq:", targetSq);
    //console.log(getCoords(targetSq));
    //go back to this if getting weird behavior...

    if(midAction){midActionFunction(targetSq);}
    else {endActionFunction(targetSq);}
}

const midActionFunction = function(targetSq){
    console.log('midaction');
    if(fireDrill){fireDrillAction(targetSq);}
    if(airDrill){airDrillAction(targetSq);}
    if(waterDrill){waterDrillAction(targetSq);}
    if(earthDrill){earthDrillAction(targetSq);}
}

const endActionFunction = function(targetSq){
    if(activePiece){
        let pieceType = activePiece.attr('piecetype');
        console.log("active piecetype: ", pieceType);
        //
        if(pieceType === 'sage'){sageAction(targetSq);} else 
        if(pieceType === 'fire'){fireAction(targetSq);} else
        if(pieceType === 'water'){waterAction(targetSq);} else
        if(pieceType === 'earth'){earthAction(targetSq);} else
        {airAction(targetSq);}
        //last is placeholder handler for all unspecified types of pieces
    }
}






//oh one stone is only flowing 1 score --- good!  but why?

const waterAction = function(targetSq){
    console.log('water action');
    if(isEmpty(targetSq)){
        //console.log('got here 3');
        targetSq.append(activePiece);
        activePiece.removeClass('panel-stone');
        waterArray.push(activePiece);
        waterDrill = true;
        midAction = true;
        adjArray = getAdjacentSquares(activePiece);
        highlightAdjacentSquares();
        waterTail = activePiece;
        waterIDs.push(activePiece.parent().attr('id'));
        waterCounter = 1;
        //resetActivePiece();
    }
}

const waterDrillAction = function(targetSq){
    //debugger;
    const dist2 = getDistance(activePiece,targetSq);
    if(isEmpty(targetSq)
        && waterCounter > 0
        && dist2 < 1.5
        ){
            waterFlow = true;
            resetAdjacentSquares();
            waterCounter-- ;
            let lastPosition;
            let nextPosition = targetSq;
            for(eachDrop of waterArray){
                lastPosition = eachDrop.parent();
                nextPosition.append(eachDrop);
                nextPosition = lastPosition;
            }
        }
    else if(waterFlow === false && !(isEmpty(targetSq))){
        const targetPiece = targetSq.children().eq(0);
        const targetType = targetPiece.attr('piecetype');
        const dist1 = getDistance(waterTail,targetSq);
        if(dist1 < 1.5
            && targetType === 'water'
            && !(waterIDs.includes(targetSq.attr('id')))
            ){
                waterArray.push(targetPiece);
                waterTail = targetPiece;
                resetAdjacentSquares();
                adjArray = getAdjacentSquares(waterTail);
                highlightAdjacentSquares();
                waterIDs.push(waterTail.parent().attr('id'));
                //waterCounter = waterArray.length;
                waterCounter = 7;
                //later should be waterArray.length;                
            }
    }
    if(waterCounter === 0){
        waterFlow = false;
        waterArray = [];
        waterIDs = [];
        waterDrill = false;
        midAction = false;
        resetActivePiece();
    }



//set watertail
//set watercounters
//make center square global
//change name targetVar targetSq
//make sure tail not double back--------------
}











const airDrillAction = function(targetSq){
    sageAction(targetSq);
}



const earthAction = function(targetSq){
    console.log('earth action');
    earthDrill = true;
    midAction = true;
}
const earthDrillAction = function(targetSq){
    const targetType = targetSq.children().eq(0).attr('piecetype');
    if(!(targetType === 'sage')){
        if(!isEmpty(targetSq)){
            console.log('earth drill action');
            targetSq.empty();
        }
        earthDrill = false;
        midAction = false;
        targetSq.append(activePiece);
        activePiece.removeClass('panel-stone');
        resetActivePiece();
    }
}


//wow, that's interesting
//these functions are running even when click to activate piece2
//they just skp because target square isn't empty
//should reverse order so check for active piece instead...
const airAction = function(targetSq){
    console.log('air action');
    if(isEmpty(targetSq)){
        targetSq.append(activePiece);
        activePiece.removeClass('panel-stone');
        resetActivePiece();
    }
}



const sageAction = function(targetSq){
    const targetType = targetSq.children().eq(0).attr('piecetype');
    if(isEmpty(targetSq) || targetType === 'air'){
        const dist1 = getDistance(activePiece,targetSq);
        console.log("distance: ", dist1);
        if(dist1 < 1.5){
            if(noMountain(activePiece,targetSq)){
                //well this didn't work
                //activePiece.animate([{transform: 'translateY(30px)'}, {transform: 'translateX(30px)'}], {duration: 1000});
                //
                //animation working!  if you want it...
                if(isAnimate){
                    let xdif = getCoords(targetSq).xco - getCoords(activePiece).xco;
                    let ydif = getCoords(targetSq).yco - getCoords(activePiece).yco;
                    let xpix = xdif * 70;
                    let ypix = ydif * 70;
                    let interval = 300;
                    let sagePiece = activePiece;
                    sagePiece.animate(
                        {top: '+='+ypix,
                        left: '+='+xpix},
                        interval);
                    setTimeout(function(){targetSq.append(sagePiece);}, interval);
                    sagePiece.animate(
                        {top: '-='+ypix,
                        left: '-='+xpix}, 
                        0);
                        //this works sorta but would have to write new append fxn for everything...
                        //or would i?
                        //
                }
                else{
                    targetSq.append(activePiece);
                }
                if(targetType === 'air'){
                    console.log('air drill');
                    resetAdjacentSquares();
                    adjArray = getAdjacentSquares(activePiece);
                    highlightAdjacentSquares();
                    airDrill = true;
                    midAction = true;
                    console.log('air jump!');
                    announce('keep going!');
                }
                else{
                    resetAdjacentSquares();
                    airDrill = false;
                    midAction = false;
                    announce(''); // reset announcement area
                    movesLeft-- ;
                    resetActivePiece();
                }
            }
            else{
                console.log('mountain drill');
            }


        }
    }
}

const fireAction = function(targetSq){
    console.log('fire action');
    if(isEmpty(targetSq)){
        targetSq.append(activePiece);
        activePiece.removeClass('panel-stone');
        adjArray = getAdjacentSquares(activePiece);
        highlightAdjacentSquares();
        //start the fire element mid-action power sequence:
        fireDrill = true;
        midAction = true;
        //alert('add a fire piece!');
        announce('Add a fire piece!');
        //end action
        //resetActivePiece();
    }
}

const fireDrillAction = function(targetSq){
    console.log('fire drill');
    if(isEmpty(targetSq)){
        console.log('fire drill');
        const stone1 = makeStone(elements1.fire);
        targetSq.append(stone1);
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
        resetActivePiece();
    }
}




























let middleNum = Math.floor(allSquares.length/2);
let rowLen = Math.sqrt(allSquares.length);
let startP1 = middleNum - rowLen;
let startP2 = middleNum + rowLen;

//make the sages
const piece1 = makeSage('black', 1);
const piece2 = makeSage('white', 2);
piece1.addClass('sage1');
piece2.addClass('sage2');

//put them in the corners to start
$('#'+startP1).append(piece1);
$('#'+startP2).append(piece2);

//this works and is the easiest...
//piece1.draggable();


//piece2.draggable();
/* 
$(function() {
    $('.sage').draggable();
});
 */



//piece 1 gotta have white text if black background
piece1.css('color', 'white');

//just one way to identify:
//piece1.text('1');
//piece2.text('2');

//eventually i want all pieces to be objects with..
//..an "icon" representing them in the DOM
const sage1 = {icon: piece1};
const sage2 = {icon: piece2};

















const switchTurns = function() {
    $('#moves'+whoseTurn()).text('');
    $('.p'+whoseTurn()).removeClass('active')
    $('.sage'+whoseTurn()).removeClass('active-sage');
    firstPlayerTurn = !firstPlayerTurn;
    $('.p'+whoseTurn()).addClass('active')
    $('.sage'+whoseTurn()).addClass('active-sage');
    drewStones = false;
    movesLeft = 1;
    
}

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


//draw random starting stone
//turn off for now -- bring back when better designed...
/* 
indexRand = Math.floor(Math.random()*bag1.length)
const randDraw = bag1.splice(indexRand, 1)[0];
$('#'+middleNum).append(randDraw);
 */




//make fxn of n?
const drawStones = function(n){
    console.log('clicked draw button');
    if(!drewStones){
        drewStones = true;
        for(i = 0; i < n; i++){
            index1 = Math.floor(Math.random()*bag1.length);
            newStone = bag1.splice(index1,1)[0];
            newStone.css('position', 'relative');
            //again, player class would be nice here
            newStone.attr('owner', whoseTurn());
            newStone.addClass('panel-stone');
            $('#hand'+whoseTurn()).append(newStone);
        }
        movesLeft = 5 - n;
        let turnVar = whoseTurn();
        let bannerVar = $('#moves'+turnVar);
        bannerVar.text(movesLeft);
        //console.log(turnVar);
        //console.log(bannerVar);
        console.log('moves left: ', movesLeft);
        //omg this is so WET i just copy-pasted
        //test drop listeners
        //$('.piece').on('click', startAction);
        //$('.piece').on('click', endAction);
    }
}

const draw4Stones = function(){drawStones(4);}
const draw3Stones = function(){drawStones(3);}
const draw2Stones = function(){drawStones(2);}
const draw1Stones = function(){drawStones(1);}


$('.square').on('click', clickAction);

$('#button4').on('click', function(){drawStones(4);}); //ah this is how to do it
$('#button3').on('click', draw3Stones); //does the same thing but more lines...
$('#button2').on('click', draw2Stones);
$('#button1').on('click', draw1Stones);


$('#buttonUnselect').on('click', resetActivePiece);

$('#switch').on('click', switchTurns);

announce('GAME START!');
$('.p'+whoseTurn()).addClass('active')
$('.sage'+whoseTurn()).addClass('active-sage');



//$('#button4').on('click', getAdjacentSquares);



//test drop listeners
//$('.piece').on('click', startAction);
//first piece never gets endAction
//$('.piece').on('click', endAction);


//const piece1 = $('<div/>').addClass('piece');
//piece1.attr('piecetype', 'sage');
