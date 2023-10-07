# Multiverse Fighter 💥🥊

---

## Project Overview

![GameOverview](img\docs\game-overview.png)

This project creates a playable browser-based version of the arcade version of Street Fighter II with Ken and Ryu as playable characters. This game utilizes the HTML canvas element and "vanilla" javascript to handle user input and animations.

All of the game's animations are handled through DOM Manipualtion using javascript. The stage, background characters and elements and Ryu and Ken themselves are all animated using javascript.

---

## Acknowledgments

Thanks to [Shezzor's Dev Corner](https://www.youtube.com/channel/UC6uz-Me49qF6Wq3KYqaO80g) for their breakdown of the original game's assets, animations and game engine. Check out their Street Fighter II Series to learn more about this particular game, some game development fundamentals and some of the core principles that make all great fighting games possible.

---

## Installation Guide

-Fork and clone this project and run index.html in your server of choice. As long as all the path's stay in place you should be able to run this game by just opening the index.html file.

---

## Project Structure

Here is a breakdown of all the project's files and how they come together to create the game in the browser.

- **index.html:** This is the html file where the playable version of the game lives. Open this in your browser to play the game. The javascript files that power the game reference images in this file, if you want add or change any images that are visible in-game, they will need to be added to this html. Please note that all image's display is set to none by default in the css.
- **css:** Houses as single "style.css" file that's used to format the index.html's page elements.
- **img:** This folder houses all the sprites that are used to animate the game's characters, environment and ui. You can find the original sprite sheets used in this project in [Sprite Resources](https://www.spriters-resource.com/). If you want to add more sprites or images to the game, please make sure your .png files have a transparent background. I recommend using [GraphicsGale](https://graphicsgale.com/us/) to quickly remove any background colors and working with sprites overall.
- **constants:** Houses files with constant declarations that get imported across the different game files. This helps make the game's code more readible and provide clear explanations to the use and definitions behind some of the "magic numbers" required to run animations at the appropiate speed's to mirror the original game's look and feel while refreshing the animation's at the user's monitor refresh rate.
- **config:** Hosts the file used to define the controls recognized by the game and its files and functions.
- **app.js:** This is the main javascript file handles a single responsibility which is to run the start function in the FigthingGame.js file when the window loads.
- **FightingGame.js:** This file is the core of the fighting game and the one that will call the different scenes contained in it. At the moment, the project only has a single scene hosted in BattleScene.js, but this set up will allow anyone to build upon the game's current state and add scenes like a game intro, round finishers, character and stage selection scenes, etc.
- **entities:** This folder houses the super class that contains the necessary input and animation mapping for each character and the character-specific class that is instantiated when the game runs. It also contains an index file with all the function exports that happen in this folder to streamline imports in other directories as a single line and a shared folder with the files that contain the animations and update functions shared by all characters: attack splashes and shadow.
- **state:** Hosts the files that keep track of the overall game's state and fighters' states so their information can be referenced across all other different files and functions with ease.
- **scenes:** Repository for different scenes in the game. For now it only houses our battle scene, but it could be expanded to include the game's menu, character and map selection amongst other secenes.
- **engine** Hosts the files that run the game's camera which allows following the fighters through the width of the stage and for the parallax scroll efect and the inputhandler that maps user input to its corresponding move/attack (if defined).
- **utilities:** Hosts a collection of helpers and utilities that are used throughout the game. Collisions contains helper functions that detect if there is collision between the specified fighters' boxes, our canvas, context configuration and drawFrame function and our debug functions that draw each fighters, push, hurt and hit boxes and the origin points for their animations as white crosses. You can uncomment line 586 in fighters.js if you want to see the debug features in action or look at the sreengrabs in this documentation.

---

## Key Code Snippets

### Collision Detection

Since all of the objects for which we want to have Collision Detection are rectangles (Push, Hurt and Hit Boxes) we can use a single function that detects overlap between 2 rectangles to assess if a collision has happened and pass that into one of our state handles.

This function takes in the x, y values, width and height associated with each rectangle we're checking and returns true if there's any overlap.

```javascript
export function rectsOverlap(
    x1, y1
    width1, height1,
    x2, y2,
    width2, height2) {
    return x1 < x2 + width2 && x1 + width1 >= x2 && y1 < y2 + height2 && y1 + height1 > y2;
}
```

### Understanding Character Sprites And Animations

All of the animated entities for the game are sourced from their respective sprite sheet. Take a look at the following image. This is what half of the frame's a single Ryu's move looks like

![RyuForward](img\docs\ryu-forward.png)


Sprite Sheets allow us to save a bunch of time and instead of extracting each of these frames' graphics using an image editor, we can use the x, y coordinates and dimensions for each frame and store them into an array inside a Map object. By using Map's .get method we can easily query frames by their name (ie., 'idle-1'), using string literals that take the corresponding state ('idle') and iterate through their sequential frame #'s.

```javascript
this.frames = new Map([
            // spirte name / sprite x-y origin / sprite dimension / pushbox state / hitboxes x,y, dimensions
            // Idle Sprites
            ['idle-1', [[[75, 14, 60, 89], [34, 86]], PushBox.IDLE, HurtBox.IDLE]],
            ['idle-2', [[[7, 14, 59, 90], [33, 87]], PushBox.IDLE, HurtBox.IDLE]],
            ['idle-3', [[[277, 11, 58, 92], [32, 89]], PushBox.IDLE, HurtBox.IDLE]],
            ['idle-4', [[[211, 10, 55, 93], [31, 90]], PushBox.IDLE, HurtBox.IDLE]],

            //Other frames + code...
            ...]);
```

---

## Unsolved Problems

- **Transitioning to an end scene:** I created end scene images that I wanted to draw as a takeover to the canvas' dimensions if a fighter's hitpoints reached 0 or lower in the BattleScene. However I wasn't able to figure out the right function to clear the canvas and draw this without crashing the game. If you want to continue building the game to include these end scenes you can reference this [image](img\ryu-wins-ga.png) in the img folder for testing. I even made a pixel-art style version of General Assembly's logo 🥲

![EndScene](img\ryu-wins-ga.png)

- **Troubleshooting Ryu's jump forward/backward animation:** One or more frame's in Ryu's jump + direction animations have errors, but it's hard to troubleshoot without access to the original game's information.

---
## Animated Elements

### Character Idle and Attack Animations

![IdleAndAtack](img\docs\chracter-animation.gif)

### Character Movement, Flag And Flashing Counter Animations

![MovementAndFlag](img\docs\flag-animation.gif)

### Background Character Animations

![BackgroundCharacters](img\docs\bg-characters.gif)

### Health Bar, Player Score, Attack Srpite and Critical Health KO Flashing Animations

![Damage](img\docs\damage.gif)

### Debug Features

![Damage](img\docs\debug-features.gif)

---

## Stretch Goals

### Integrating additional fighters

While the game is setup for you to create your own character classes with their corresponding sprites and animations, sourcing sprites, mapping their frames' x, y coordinates, dimensions and frame delay values was impossible within this project's timeline. If you want to add your own characters just follow the structure of the Ken and Ryu classes and call your new character class when instantiating fighters.

You can take a look at the Venom.js file to see how earler on in the project I was able to bring over Venom using its arcade-version Marvel Vs. Capcom's sprites and was able to succesfully get him to move forward. Look at this repository's commits if you want to see this in action.

As a fun fact, the shadow used for both Ryu and Ken is actually Blanka's shadow, I couldn't find a sprite for either that contained their shadow.

### Adding Sound Effects

My original vision for this game was to mash different characters from similar games into a "Multiverse Fighter" realizing how challenging and taxing that is without acccess to the original game's source code, I could fulfill my vision by adding SFX to the game and getting creative with what audio files I use for those and even record my own.

### Handling Timeout Draw Stage

While the current version of the game has a working timer. I didn't get the chance to build a draw state that's triggered if both fighter's health is higher than 0 when the timer runs out.

---

## Favorite Things This Project Thought Me

### So many new VS Code Keyboard Shortcuts

Some of my new favorites include (Windows):

- **Ctrl + D:** Select the word in cursor and the next following instance. This made updating variable names and refactoring a breeze.

- **Alt + Shift + F:** This shortcut triggers the "Format Document" feature in VS Code. Makes it really easy to copy and paste code snippets and quickly correct indentation.

- **Alt + UpArrow / Alt + DownArrow:** Moves selected lines up or down. This is really helpful when refactoring, udpating code to make it more readable.

### Set and Map Javascript Objects

- These two objects power some of the game engine's core components. The project uses a Set to track the user's keystrokes as individual instructions even when a key is held down. This prevents any of the attacks running infintely if a key is pressed down.

### Deconstructing Objects

- When dealing with more complex data structures, deconstructing them into smaller variables with only the elements you need makes handling those elements much more easier.

### Using Math.min and Math.max

- These two methods are very helpful when you're trying to find the lowest or highest possible value within a set of values.

### Writing code to be modular

- I had fun learning how to separate functions into different files with the least responsibilities as possible for better readability and maintenance. Learning how to work with export and import was extremely valuable.

### State Machine Design Pattern

- This [commonly used design pattern](https://refactoring.guru/design-patterns/state) comes in clutch to handle of the fighter's different states and how to transition (or not) between them.

### VSCode is amazing until it isn't

- While it's nice to leverage VSCode's autocomplete and similar features, some of by biggest struggles debugging came when they didn't perform as expected. Don't trust VSCode to handle your imports for you perfectly every single time.

### Ryu and Ken are pretty much the same fighters

- Anyone that played the original game probably knew this, but you can confirm it by looking at each fighter's class and their corresponding animation frames. Ryu and Ken share the same sprite dimensions or very close ones from almost all of their states.
