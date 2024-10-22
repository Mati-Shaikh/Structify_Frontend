export function end(k) {
    return k.scene("end", ({ nextLevel }) => {
      k.add([
        k.text("You Win!", { size: 64, font: "myfont" }),
        k.pos(k.width()/2, 720 / 2 - 100),
        k.anchor("center"),
      ]);
  
      k.add([
        k.text("Press Enter to Continue", { size: 32, font: "myfont" }),
        k.pos(k.width()/2, 720 / 2),
        k.anchor("center"),
      ]);
  
      k.onKeyPress("enter", () => {
        k.go(nextLevel)
      });
    });
  }