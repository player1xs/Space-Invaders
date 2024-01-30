Project One - Space Invaders

Description

Project One was the creation of an in-browser game. This was week 4 of the course; after we covered the fundamentals of HTML, CSS, and JavaScript. The aim was to make a functioning game based on these languages with the main point that we were not allowed to use <canva>; but, instead focus on a grid format. There were several classic games to choose from (Tetris, Snake, MineSweeper, etc..), but playing Space Invaders in an actual arcade in my youth, I held an affinity to it.


Deployment Link

https://player1xs.github.io/Space-Invaders/


Instructions 

Click and play, no packages need to be installed. Link above will take you straight there and just click START on the Menu. Have fun!

Timeframe & Team

This was a solo project.
The project was officially to be worked on from the 6th Nov(Mon) until 9th Nov(Thur) with presentations being held on the 10th. We did however have a planning day on the 3rd. (plus a little of my own time over the weekend).

Technology

Languages - HTML, CSS, JavaScript
Wireframe - Excalidraw (browser app)
Software - Visual Studio Code

Brief

As stated, this was a project to build an in-browser game using a grid format instead of <canvas>. Several games to choose from; but, I had to go with Space Invaders. Since I loved the original arcade version so much, I decided to make a pixel arcade version with StarWars theme.

The brief was straightforward. Create a functioning version of Space Invaders. 
Minimum deliverables:
Create a game board based on a grid.
Create a player character that can move side to side.
Create at least ONE wave of enemies.
Enemies need to move across the board, and when they encounter a wall -> dropdown and change direction.
Be able to shoot the enemy.
Display the score on GAME OVER.
DO NOT use canvas while creating your game!

Planning

First I laid down a rough sketch on Excalidraw, a browser-based wireframe sketching tool. This would let me visualise my creation. I usually tend to colour code my wireframes per language and add notes on what would need doing. Here I mostly used yellow for JavaScript, black for HTML. (red was for bonus ideas)

![wireframe](https://github.com/player1xs/Space-Invaders/assets/148089820/754b39ef-8cdd-41d6-9a87-0021bbba573b)


The next thing I did was to write a pseudocode to see what I will need to tackle. Here, I wrote in detail how the game would work. All the to-do lines were roughly organised into groups of how I want to structure/layout my code. At the top foundational items, such as querySelectors and DOM eventListener. Then moving into everything that would pertain to the enemy, after the player. In my code I also gave myself notes as to what function/key-words I would need for which stage. To tidy up my VScode, I pulled my pseudocode onto a notepad and had that visible on a second monitor, so I could tick things off as I went along.



Additionally, I created a day by day list. So I can keep a plan and set aside big problems per certain day. I must admit I was a little harsh on myself setting this up; on the second day I tackled all big problems for day three and four in one swoop, and then worked on smaller problems and refining. 


Building my Project

Step 1 - grid

The first item I decided to tackle was to set up my grid. First I added some basic html based on my wireframe with a container-wrapper and an empty <section class=”the-grid>.
Swiftly moving into my JS file; I went to set up the grid itself:


Since we weren’t allowed to use <canvas> I set out to make the grid rather large for the game; with this in mind I could make the Invaders move faster and therefore have the game look a little smoother, rather than aggressive jagged movements from grid cell to cell.

First I created an empty array of cells and defined how tall and wide I would like my board to be based on the number of cells and then multiplied them together. This was then pushed through a for loop and created a <div> for them and attached them with an ID; rather than me creating several hundred individual <div> in my html. (the number was changed throughout, until it looked perfect.






Step 2 - Barebones

Next up, I declared all my querySelectors based on my wireframe and HTML; and also my global variables.



Step 3 - I am creator of Player!

For the player, I calculated which cell would be roughly the middle off the bottom row of cells and placed him in there.
The player would move across the grid by using classList.add/remove when left or right were pressed. I found a wonderful mini pixel X-Wing fighter  and created a CSS class for it; which I could drop anywhere in my code, to keep things tidy.

For the player to move, I decided to go with a switch function, as I haven’t had much opportunity by that time to implement one. The switch listened for keydown of left or right arrow (keyCode 37 and 39). 
Using modulus and declaring the boundaries, I could define how far the Player character could go. Added an eventlistner for keydown and linked it with the movePlayer function - This idea worked immediately like a charm. 


Step 4 - Invaders

I thought to set out on a similar idea to the Player character for the Invaders.
First I declared an array for a group of Invaders and hard-coded their position to the grid.
Additionally, I set up an empty array for when an Invader was killed, I could push to it; so, they wouldn’t respawn and to plan ahead for GAME OVER scenario # 1.
Same as the Player, I created an add/remove function - which would let me easily move the characters around; just a smidge harder to move the entire array than just one sole one.


Next up was what I later on referred to “as the hurt”. This section was all about trying to get the array moving across the board and moving down towards the player.
First I declared the boundaries using modulus (instead of hardcoding). Then I had them moving left or right using the width with +/- 1 and once they detected a boundary, dropdown a row, and reverse direction.
And then had the entire array move again, by removing them from the cells and adding a new one, the next cell over.




I also included my first GAME OVER scenario here. This would pertain to the movement; once the enemy moves all the way down and an invader AND the player are in the same cell - GAME OVER. I added a small explosion for effect, and the game-over screen appears.

Step 5 - Pew Pew laser

Time to get the player shooting!
I created a style class, just like the Player and Invader called ‘pew’. A wonderful small red laser. This laser class would move exactly like the Player and Invader did; but move automatically and a single item.
First I had established that the laser should originate from exactly where the player was located. Added a couple sound effects(these were from the original space invaders game).

Moving the laser was again using classList add/remove; but moving it with -= width, which would make it move directly up the grid.
Running through an IF function to see if an Invader and Laser were in the same cell = that meant; remove the Invader and Laser, add a boom effect+sound.

Under ‘const invaderKill’ is where the magic happened. Here I identify which Invader in the array was hit by the Laser and push him to my empty killedInvaders array. Above in my add/remove Invader movement function, I included a statement that finds out if an Invader is dead, so he wouldn’t be recreated when the array moved.
Then the player gets an extra point.
And we remove the interval of the laser if we missed and it hit the ceiling.




Next, I assigned the X key to the function; once again as a switch/case. And when pressed we get the classic pew sound.

After this, we compare the Invaders array to the killedInvaders array; and if they match, you do not win…you get a new wave of enemies that move 1.5x faster than the previous wave.
Classic arcade games don’t let you win, you just go as far as you can.


Step 6 - Start/End/Reset

Then I went about writing my startGame, endGame and reset functions.

In my global variables, I declared in step one, i set gameOn = false during startGame this would set gameOn to true - which starts the music, and initiates the invaders to move.
I also changed my html to include a smart little trick. Here, I added a start-screen which displays on load and the game grid is displayed as ‘none’. When ‘start’ is clicked the start-screen will set its display to ‘none’ and the grid will go from ‘none’ to be displayed.

The gameOver function kills the game music, and plays the StarWars throne room theme. It will set the grid to display ‘none’ and my gameover screen on.
Also will set the game back to false and display the score.
On the gameOver screen is also a button to play again. Once clicked, we initiate resetPage, clear the interval and reset the score to zero.




Step 7 - time to look good

Here I played around with the styling, removing the red border from every cell which helped me calculate/visualise the movements. The game has classic pixel font and pixel art throughout; with my favourite black/chartreuse theme that the original space invaders has.




Challenges

I did face some issues with the Invaders moving at first. Instead of using my add/remove functions I wrote out a classList add remove which created the Invaders, but didn’t make them move. I solved that quickly by adding in my above mentioned function instead.

THEN came the bigger hurt. Once Invaders were shot, they would explode, boom animation, sound, and disappear. But when the array moved to the next cell it iterated a brand new Invader in its place.
I did originally write a function in my movement pattern for this; but I later found out that I needed to include it in my addInvaders function and filter over the array.

Wins

I had a clear idea in my head on Player creations and movement + shooting; and that all went down without a hitch. I planned Invaders and Player on separate days. But the Player creation was so smooth, and I did all the Invader creation on the same day; and saved myself a fair chunk of planned time.

And I love the styling; finding pixel art within theme; both battle and gameover sound are 8-bit format, and the background is a moving pixel death star gif with sparkly stars; which all made the game feel very cohesive! I love the styling side - so much fun.

Takeaways

Got a lot more comfortable using vanilla JS. So far I have only written functions to pass arbitrary challenges. But, seeing them implemented into something grander, rather than logging an answer, was fantastic and solidified the logic in my mind.

Although I planned well and was ahead of my timeline; the deadline did sneak up pretty fast. But, thanks to my planning I was very comfortable and did not have to worry. I spent the extra time refactoring and tidying my code. (and work on some additional functionality). But it's good to remember how quick a week can pass and that timeline and planning is important.

Bugs
Sometimes on the GameOver screen, the endgame music will launch infinitely split-seconds after each other, but then the next time it does not and plays clean.
On other occasions, when the first wave is cleared, the second wave only spawns if the player moves.

Future Improvements

Already started playing around with functionality that the Invaders can shoot back randomly. Left my unfinished code in for the moment, but commented out - will tackle this in future.

All the below are based on the above.
Along with Invaders shooting, add a lose life function when hit.
But, to counter - Player gains a life when a wave is cleared.
A mothership should spawn at the top of the game, that can shoot insta-kill bombs
Lastly, I would like to add a barrier/shield which would disappear after 3 hits.



Thank you for reading :)
