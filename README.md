# The Game of Life
This is a version of the popular Conway's game of life that is made in javascript. [Check it out!](https://arnavcs.github.io/game-of-life/)

## Game mechanics
The game works as follows. There are a number of generations, and each generation, a cell is alive if it was previously alive and had 2 or 3 neighbors, or if if was previously dead and had exactly 3 neighbors. Otherwise, it is dead.

## Website mechanics
The website functions by first inputing the dimensions of the grid to simulate on, and then clicking on the squares of the grid to change the state of that cell initially. After you have reached an initial board state you are satisfied with, press the start button to start the simulation. There is a 0.5 second interval between the generations.
