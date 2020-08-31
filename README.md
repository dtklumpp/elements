# elements
play the obscure folk game ELEMENTS

//=====================

### USER STORY:

The Users show up ready to PLAY

They click Start a New Game

They place their Kings

Then each turn:
* They pick how many king moves they want (minus 1 stone per move)
* They take all their moves (placing stones and moving King)
* When a stone is placed, they also get to implement its element bonus, which usually involves creating or moving adjacent stones around on the board.  In some cases a stone can directly replace a different element stone.
* Can users bid to go first?  I'll try to look this up...

After each move, the game checks if somebody has won.
If so, it implements the Congratulations function and transfers $X to the winning User's swiss bank account (and removes it from the loser's?--stretch goal)

The element powers btw (as i remember them) are:
* fire spreads in a line (creates new fire stones at end of adjacent lines)
* water flows away (can move an adjacent water stone?)
* earth blocks jumping and replacement
* air lets Kings jump over it

//===================

# *MVP:*
* I want to make a digital version of an old folk game called Elements.
* It's played with 4 different colors of pebbles (being earth, air, wind, and fire) on a chess board or a little larger.
* It's a bit of a mix between Chess and Go -- each player has exactly one King that must avoid being captured, and the 4 different element stones have different special things they do when you place them.
* Earth & Air powers are for MVP (not fire/water)
* You draw a "hand" of stones from a bag or something which determines which colors you can play.

//===================

## **BASIC GOALS AND STRETCH GOALS:**
* The nice thing about this project is i have some flexibility as to how deeply to dive into some of the features.  

* My basic MVP will create a Board, let the user place their King, draw Stones from the Bag, move their King around, and Place the stones on the board, with some simplified movement properties.  It will also identify when somebody's King is surrounded, thus Winning the game for their opponent.

* From there I want to implement as many cool CSS/jQuery things as I can, as I really want to play around with and get better at various ways to make things pop and transitioon and look good on the page.

* And as stretch goals I can implement the more advanced rules for Element Stone movement / powers, plus more advanced CSS stuff if i get to it.

* Fire & Water powers are stretch goals




