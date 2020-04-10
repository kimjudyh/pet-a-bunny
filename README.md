# Project 0: The Game
## Introducing Pet-a-Bunny
Like Whack-a-Mole, but friendlier and with bunnies!

## User Stories
Bunnies pop out of their hole. The player tries to pet as many as possible in a given time limit. In the next level, the pattern changes.

## Wireframes
![wireframe1](img/wireframe1.png)
![wireframe2](img/wireframe2.png)
![wireframe3](img/wireframe3.png)
![wireframe4](img/wireframe4.png)
![wireframe5](img/wireframe5.png)


## Technologies Used
HTML, CSS, JavaScript, jQuery

## Approach Taken
Throughout the project, I grouped features together and went through the following process:  

Idea -> Plan -> Code -> Test -> Extend -> Fix -> Refine

* **Idea**: I came up with something I wanted to implement, such as a group of different game bonuses.  

* **Plan**: I drew and wrote up what the idea would look like, what data structure I would use, what logic I would need, when it would be executed.  
* **Code**: I chose one thing, such as giving a bonus for clicking enough gold bunnies, and typed up what was needed to get it to work. I tried to keep code readability and extensibility in mind, but in this phase I often had to hard-code in values.
* **Test**: Did it appear how I wanted in the browser? Did it behave how I wanted it to? Did it make the right changes to the game?
* **Extend**: If the test went well, I extended the code to a feature in the same group. For example, I used the same logic to give a bonus for clicking enough white bunnies, then the same logic for clicking snakes and normal bunnies.
* **Fix**: At this point, I would go back to refactor and remove any hard-coded values that could be replaced. This often broke things, but I worked to fix the code until the features behaved correctly again.
* **Refine**: Now that things are working, maybe I can refactor some more to improve efficiency, readability, and extensibility.


These are the groups of features that I made: Gameboard, Animals, Buttons, Transition Screens, Achievements

I started off with the HTML and CSS, making a very basic gameboard and seeing if I could add on images of the hole and bunny. Then I worked on getting one bunny to appear and disappear. I kept tweaking and adding code that made the bunny act more or less how I wanted it to.

I then refactored my code to use Classes and Objects, knowing that I wanted to make multiple bunnies.

Classes

Objects

I grouped features together and started with one part of the group, tested if it worked, and added the other parts when I was successful. After I got the basic functionality of the group working, then I added small improvements, such as animations.

Added one animal at a time - first the bunny, then the snake, then the white and gold bunny.

In between adding game logic, improved the CSS.

Added instructions, then a game over screen, then screens that appeared after each level. Added fading in and out animations later.



## Installation Instructions
Open a browser, such as Chrome. Go to the link.

## Unsolved Problems
High score  
Visual feedback that the animal was clicked.