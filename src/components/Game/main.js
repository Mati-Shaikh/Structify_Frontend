import kaplay from "kaplay";
import "kaplay/global";
import { end } from "./end";
import { level1 } from "./level1";
import { level2 } from "./level2";

export default function main() {
  const k = kaplay({
    global: false,
    width: 1000,
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
  k.loadSprite("portal", "/game/sprites/portal.png");
  k.loadSprite("cursor", "/game/sprites/cursor.png");
  k.loadSprite("pointer", "/game/sprites/pointer.png");
  k.loadSprite("pointer2", "/game/sprites/pointer2.png");
  k.loadSprite("spike", "/game/sprites/spike.png");
  k.loadSprite("kaboom", "/game/sprites/kaboom.png");
  k.loadSprite("background", "/game/sprites/hills3.png");
  k.loadSprite("background2", "/game/sprites/hills2.png");

  //Loading sounds
  k.loadSound("goalSound", "/game/sound/coin.wav");
  k.loadSound("completed", "/game/sound/completed.wav");
  k.loadSound("data", "/game/sound/data.wav");
  k.loadSound("jump", "/game/sound/jump.wav");
  k.loadSound("link", "/game/sound/link.wav");
  k.loadSound("attached", "/game/sound/attached.wav");
  k.loadSound("appear", "/game/sound/appear.wav");
  k.loadMusic("bgMusic", "/game/sound/bgMusic1.mp3");

  const setCustomCursor = (cursorPath) => {
    const canvas = k.canvas;
    canvas.style.cursor = `url('${cursorPath}'), auto`;
  };

  // Set default cursor
  setCustomCursor("/game/sprites/cursor.png");


  level1(k);
  level2(k);
  end(k);

  k.go("level1");

}