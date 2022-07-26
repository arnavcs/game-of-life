# The Game of Life
This is a version of the popular Conway's game of life that is made in javascript. Try it out at [arnavcs.github.io/game-of-life](https://arnavcs.github.io/game-of-life/).

## What is the Game of Life?
The game works as follows. There are a number of generations, and each generation, a cell is determined to be alive or dead based on the the number of neighboring cells (there are 8 neighboring cells) that were alive from the previous generation.
A given cell is alive if it was previously alive and had 2 or 3 neighboring cells which were alive, or if if was previously dead and had exactly 3 neighbors. Otherwise, it is dead.

## How to use the Website?
The website functions by first inputing the dimensions of the grid to simulate on, and then clicking on the squares of the grid to change the state of that cell initially. After you have reached an initial board state you are satisfied with, press the start button to start the simulation. There is a 0.5 second interval between the generations.
