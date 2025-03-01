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

  const setCustomCursor = (cursorPath) => {
    const canvas = k.canvas;
    canvas.style.cursor = `url('${cursorPath}'), auto`;
  };

  // Set default cursor
  setCustomCursor("/game/sprites/cursor.png");

  const music = k.play("bgMusic");
  music.value = 0.05;
  music.loop = true;


  level1(k, music);
  level2(k, music);
  level3(k, music);
  level4(k, music);
  level5(k, music);
  level6(k, music);
  level7(k, music);
  level8(k, music);
  level9(k, music);
  end(k);

  k.go(level);
});
}