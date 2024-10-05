import kaplay from "kaplay";
import "kaplay/global";
import { end } from "./end";
import { level1 } from "./level1";
import { level2 } from "./level2";

export default function main() {
const k = kaplay({
  width: 1000,
  height: 700,
  background: [0, 0, 0],
  container: document.getElementById("game-container")
})

k.loadFont("myFont", "/game/fonts/stocky.ttf", 48);
k.loadFont("myfont", "/game/fonts/myfont.ttf", 48);
k.loadSprite("boggy", "/game/sprites/boggy.png");
k.loadSprite("head", "/game/sprites/headboggy.png");
k.loadSprite("burp", "/game/sprites/burpman-o.png");
k.loadSprite("coin", "/game/sprites/coin.png");
k.loadSprite("cloud", "/game/sprites/cloud.png");
k.loadSprite("chain", "/game/sprites/chain.png");
k.loadSprite("portal", "/game/sprites/portal.png");
k.loadSprite("cursor", "/game/sprites/cursor.png");
k.loadSprite("pointer", "/game/sprites/pointer.png");
k.loadSprite("spike", "/game/sprites/spike.png");
k.loadSprite("kaboom", "/game/sprites/kaboom.png");
k.loadSprite("background", "/game/sprites/hills3.png");
k.loadSound("goalSound", "/game/sound/boxInGoal.wav");

level1(k);
level2(k);
end(k);

k.go("level1");

}