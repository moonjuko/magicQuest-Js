import { Player } from "./Player.js";
import { Columns } from "./Columns.js";

export function getRandomInt(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

// change to test commit
// test push
let blabla = "test variable"

let canvas = document.getElementById("gameScreen"); //Association with HTML file
let ctx = canvas.getContext("2d"); //Turn on the depiction function with the getContext method

const GAME_WIDTH = 826;
const GAME_HEIGHT = 450;

// Create an object from the class
// Variable name is a name to recognize the created object
let player = new Player(GAME_WIDTH, GAME_HEIGHT);
let columns = [];
let lastTime = 0;
let counter = 0;
let interval = 0;
let stopEverything = false;
let howManyPoints = 0;

//get an object iwth query selector, then add an event listener
//to call a function when button is clicked
//then request animation frame gameLoop
document.querySelector("#startButton").addEventListener("click", function () {
  document.querySelector(".startMenu").style.display = "none";
  document.querySelector("#scoreAppear").innerHTML = "0";
  requestAnimationFrame(gameLoop);
});

//restart screen needs to put player on the same position as startScreen
// points need to restart too
document.querySelector("#restartButton").addEventListener("click", function () {
  document.querySelector(".endMenu").style.display = "none";
  columns = [];
  howManyPoints = 0;
  document.querySelector("#scoreAppear").innerHTML = `${howManyPoints}`;
  player = new Player(GAME_WIDTH, GAME_HEIGHT);
  stopEverything = false;
  requestAnimationFrame(gameLoop);
});

document.querySelector("#winButton").addEventListener("click", function () {
  document.querySelector(".winMenu").style.display = "none";
  columns = [];
  howManyPoints = 0;
  document.querySelector("#scoreAppear").innerHTML = `${howManyPoints}`;
  player = new Player(GAME_WIDTH, GAME_HEIGHT);
  stopEverything = false;
  requestAnimationFrame(gameLoop);
});

//Game loop function for updating and redrawing
function gameLoop(timestamp) {
  if (!stopEverything) {
    //when player falls end menu is called
    if (player.position.y >= GAME_HEIGHT - player.r) {
      stopEverything = true;
      document.querySelector(".endMenu").style.display = "block";
    }

    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    player.update(deltaTime);
    player.render(ctx);

    counter += deltaTime;
    if (counter > interval) {
      let top = getRandomInt(100, 200); //上のパイプの長さ top columns length
      let bottom = getRandomInt(90, 140); //下のパイプの長さ bottom columns length
      columns.push(new Columns(GAME_WIDTH, GAME_HEIGHT, top, 1)); //push new colums
      columns.push(new Columns(GAME_WIDTH, GAME_HEIGHT, bottom, 2));
      counter = 0;
      interval = 1500; //1,5 seconds new colums will appear
    }

    columns.forEach(function (eachColumn, columnPosition) {
      eachColumn.update(deltaTime);
      eachColumn.render(ctx);

      //collision detection if player touches each column thats not outside of canvas
      //if so , the end screen is called
      if (
        checkCollisionBetween(player, eachColumn) &&
        !eachColumn.outsideCanvas
      ) {
        stopEverything = true;
        document.querySelector(".endMenu").style.display = "block";
      }
      //if collums is outside of canvas then point is increased
      if (eachColumn.x + eachColumn.width <= 0 && !eachColumn.outsideCanvas) {
        howManyPoints += 0.5;
        document.querySelector("#scoreAppear").innerHTML = `${howManyPoints}`;
        eachColumn.outsideCanvas = true;
      }
      //if points pass 15 , then player wins
      if (howManyPoints === 16) {
        stopEverything = true;
        document.querySelector(".winMenu").style.display = "block";
      }
    });
    requestAnimationFrame(gameLoop);
  }
}

//declares collision detection of bounding boxes of player and colunms
let checkCollisionBetween = (gameObjectA, gameObjectB) => {
  let bbA = gameObjectA.getBoundingBox();
  let bbB = gameObjectB.getBoundingBox();

  if (
    bbA.x < bbB.x + bbB.w &&
    bbA.x + bbA.w > bbB.x &&
    bbA.y < bbB.y + bbB.h &&
    bbA.y + bbA.h > bbB.y
  ) {
    // collision happened
    return true;
  } else {
    return false;
  }
};
