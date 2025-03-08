import kaplay from "kaplay";
import "kaplay/global";
import { end } from "./end";
import { level1 } from "./level1";
import { level2 } from "./level2";
import { level3 } from "./level3";
import { level4 } from "./level4";
import { level5 } from "./level5";
import { level6 } from "./level6";
import { level7 } from "./level7";
import { level8 } from "./level8";
import { level9 } from "./level9";

export default function main(level) {
  const k = kaplay({
    global: false,
    width: 1515,
    height: 700,
    background: [0, 0, 0],
    container: document.getElementById("game-container"),
  })

  //Loading fonts
  k.loadFont("myFont", "/game/fonts/stocky.ttf", 48);
  k.loadFont("myfont", "/game/fonts/myfont.ttf", 48);

  //Loading sprites
  k.loadSprite("boggy", "/game/sprites/boggy.png");
  k.loadSprite("head", "/game/sprites/headboggy.png");
  k.loadSprite("burp", "/game/sprites/burpman-o.png");
  k.loadSprite("coin", "/game/sprites/coin.png");
  k.loadSprite("cloud", "/game/sprites/cloud.png");
  k.loadSprite("chain", "/game/sprites/chain.png");
  k.loadSprite("chain2", "/game/sprites/chain2.png");
  k.loadSprite("chain3", "/game/sprites/chain3.png");
  k.loadSprite("portal", "/game/sprites/portal.png");
  k.loadSprite("cursor", "/game/sprites/cursor.png");
  k.loadSprite("pointer", "/game/sprites/pointer.png");
  k.loadSprite("pointer2", "/game/sprites/pointer2.png");
  k.loadSprite("spike", "/game/sprites/spike.png");
  k.loadSprite("kaboom", "/game/sprites/kaboom.png");
  k.loadSprite("background", "/game/sprites/hills3.png");
  k.loadSprite("background2", "/game/sprites/hills2.png");
  k.loadSprite("background3", "/game/sprites/hills4.png");
  k.loadSprite("bomb", "/game/sprites/bomb.png");
  k.loadSprite("bean", "/game/sprites/bean.png");
  k.loadSprite("gear", "/game/sprites/gear.png");
  k.loadSprite("arrow", "/game/sprites/arrow.png");

  //Loading sounds
  k.loadSound("goalSound", "/game/sound/coin.wav");
  k.loadSound("completed", "/game/sound/completed.wav");
  k.loadSound("data", "/game/sound/data.wav");
  k.loadSound("jump", "/game/sound/jump.wav");
  k.loadSound("link", "/game/sound/link.wav");
  k.loadSound("attached", "/game/sound/attached.wav");
  k.loadSound("appear", "/game/sound/appear.wav");
  k.loadSound("lose", "/game/sound/lose.wav");
  k.loadSound("bomb", "/game/sound/bomb.wav");
  k.loadSound("click", "/game/sound/click.wav");
  k.loadMusic("bgMusic", "/game/sound/bgMusic1.mp3");





  k.onLoad(() => {

    k.canvas.width = 1000
    k.canvas.style.width = "1000px";

    const sandboxContainer = document.createElement("div");
    sandboxContainer.id = "sandbox-container";
    sandboxContainer.style.cssText = `
    width: 520px;
    height: 700px;
    background-color: #1e1e2e;
    color: #f8f8f2;
    overflow: auto;
    padding: 28px;
    position: absolute;
    top: 0;
    right: 0;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
    border-radius: 0 12px 12px 0;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
`;

    // Append it to the main container
    const gameContainer = document.getElementById("game-container");
    gameContainer.appendChild(sandboxContainer)



    const setCustomCursor = (cursorPath) => {
      const canvas = k.canvas;
      canvas.style.cursor = `url('${cursorPath}'), auto`;
    };

    // Set default cursor
    setCustomCursor("/game/sprites/cursor.png");

    const music = k.play("bgMusic");
    music.value = 0.05;
    music.loop = true;


    const levelFunctions = {
      "level1": level1,
      "level2": level2,
      "level3": level3,
      "level4": level4,
      "level5": level5,
      "level6": level6,
      "level7": level7,
      "level8": level8,
      "level9": level9,
      "end": end
    };

    // Only call the specific level function that was passed
    if (levelFunctions[level]) {
      levelFunctions[level](k, music);
    } else {
      console.error(`Level "${level}" not found`);
      // Default to level1 if an invalid level is passed
      level1(k, music);
    }

    end(k);
    k.go(level);
  });
}