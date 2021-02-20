# Elements Board Game

This is a digital port of a classic abstract board game known by various names, here called Elements.  Two users take turns drawing and placing stones, and moving their pawns around the board.  Different colors of stones have unique effects.  When your opponent's pawn is surrounded, you win!

I've designed this with sort of a muted earth-tone palette to represent the elements abstractly, rather than trying to make stones that really look like water, fire, etc, as in the cardboard version.  You can drag-and-drop the stones or have them slide across, and toggle on or off animation.

## game-in-progress

- ![elements-game-in-progress](https://user-images.githubusercontent.com/65556316/106966995-5d76b680-6714-11eb-859d-11e5ac9f84ce.png)


## Contents

  1. [Setup](#Setup)
  1. [Rules of Play](#Rules-of-Play)
  1. [Elemental Powers](Elemental-Powers)
  1. [Roadmap](#Roadmap)
  1. [Development](#Development)
  1. [License](#License)
  1. [Notes](#Notes)

## Setup

To clone and run this servce, you'll need [Git](https://git-scm.com) installed on your computer, and a modern browser.  From the command line:

```bash
# Clone this repo
$ git clone https://github.com/dtklumpp/elements

# Go into the repository
$ cd elements

# Run the app
$ open -a "Google Chrome" index.html
```

## Rules-of-Play

1. Draw stones from the "bag" with the orange Draw buttons
1. Each extra stone is one less move for your pawn
1. Take turns placing your stones and moving your pawn until you're out of moves
1. Now it is your opponent's turn to play
1. Each time a stone is placed, its "Elemental Powers" are activated ([see below](#Elemental-Powers))
1. When one pawn is surrounded with no moves to take, that player forfeits the match
1. Reset the match with the "New Game" button

## Elemental-Powers

These powers are applied when placing a stone of one of the four "element" types: air, earth, fire, and water.

- Fire: The fire spreads across the board: you may place an additional adjacent fire stone from the bag.
- Water: The river of water flows: you may "flow" the river 7 spaces around the board.
- Earth: The earth forms an impassible mountain; a pawn may not move between two diagonal earth stones.
- Air: A pawn may "float" or jump across any number of adjacent air stones.
    

## Roadmap -- pending features

- allow pawn movement through drag-and-drop
- flesh out pawn animation
- allow variable board size
- incorporate advanced rules for water and fire
- highlight legal moves in real-time
- add 3D appearance to stones
- add figurine images for pawns
- translate rulebook from Italian
- fix wall-of-water bug
- allow asyncronous play
- incorporate account metrics / leaderboard

## Development
Help me improve the game!

To help with a bug or add functionality, do this:

- Fork this repo
- Make a branch (`git checkout -b new-feature`)
- Make modifications where necessary
- Add comments corresponding to your changes
- Commit (`git commit -m 'explanation'`)
- Push up (`git push origin new-feature`)
- Make a Pull Request 


## License

MIT ©


## Notes
This is one of my first digital board game ports.  I'd encourage you to check out a fine wood-and-cardboard version of this old classic from Dashing Games viewable at BGG [here](https://boardgamegeek.com/boardgame/216403/element).  Note some slight rule differences.
