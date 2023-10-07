# Multiverse Fighter

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

-


---

## Key Code Snippets

---

## Unsolved Problems

- **Transitioning to an end scene:** I created end scene images that I wanted to draw as a takeover to the canvas' dimensions if a fighter's hitpoints reached 0 or lower in the BattleScene. However I wasn't able to figure out the right function to clear the canvas and draw this without crashing the game. If you want to continue building the game to include these end scenes you can reference this [image](img\ryu-wins-ga.png) in the img folder for testing.

![EndScene](img\ryu-wins-ga.png)

---

## Stretch Goals

### Integrating additional fighters

While the game is setup for you to create your own character classes with their corresponding sprites and animations, sourcing sprites, mapping their frames' x, y coordinates, dimensions and frame delay values was impossible within this project's timeline. If you want to add your own characters just follow the structure of the Ken and Ryu classes and call your new character class when instantiating fighters.

You can take a look at the Venom.js file to see how earler on in the project I was able to bring over Venom using its arcade-version Marvel Vs. Capcom's sprites and was able to succesfully get him to move forward. Look at this repository's commits if you want to see this in action.

---

## Favorite Things This Project Thought Me

### So many new VS Code Keyboard Shortcuts

Some of my new favorites include (Windows):

- **Ctrl + D:** Select the word in cursor and the next following instance. This made updating variable names and refactoring a breeze.

- **Alt + Shift + F:** This shortcut triggers the "Format Document" feature in VS Code. Makes it really easy to copy and paste code snippets and quickly correct indentation.

- **Alt + UpArrow / Alt + DownArrow:** Moves selected lines up or down. This is really helpful when refactoring, udpating code to make it more readable.

### Set and Map Javascript Objects

- These two objects power some of the game engine's core components. The project uses a Set to track the user's keystrokes as individual instructions even when a key is held down. This prevents any of the attacks running infintely if a key is pressed down.
