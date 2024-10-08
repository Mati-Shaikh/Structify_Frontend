
export function begin(k) {
    return k.scene("begin", () => {
      k.add([
        k.text("Press Enter to Play", { size: 32, font: "myfont" }),
        k.pos(k.width()/2, 660 / 2 ),
        k.anchor("center"),
      ]);
  
      k.onKeyPress("enter", () => {
        k.go("level1");
      });
    });
  }