export function level3(k) {
  k.scene("level3", () => {
    let bogies = [
      { x: 200, y: 420, value: 3 },
      { x: 400, y: 450, value: 5 },
      { x: 600, y: 450, value: 2 }
    ];
    let newBogie = { x: 20, y: 550, value: null };
    let chainPosition1 = { x: 840, y: 585 };
    let chainPosition2 = { x: 840, y: 585 };
    let gameState = "SELECT_NUMBER";
    let score = 0;
    let currentBogieIndex = -1
    let insertionIndex = Math.floor(Math.random() * (bogies.length - 1)) + 1;
    //let insertionIndex = 1
    let removeIndex = -100;


    function drawBogies() {
      bogies.forEach((bogie, index) => {
        if (index === 0) {
          k.drawSprite({
            sprite: "head",
            pos: k.vec2(bogie.x, bogie.y),
            scale: 0.1,
            origin: "center",
          });
          if (index !== removeIndex) {
            k.drawSprite({
              sprite: 'chain',
              pos: k.vec2(bogie.x + 97, bogie.y + 15),
              scale: 0.1,
              origin: 'center'
            });
          }
          k.drawText({
            text: bogie.value.toString(),
            pos: k.vec2(bogie.x + 37, bogie.y - 30),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
        } else {
          k.drawSprite({
            sprite: "boggy",
            pos: k.vec2(bogie.x - 5, bogie.y),
            scale: 0.1,
            origin: "center",
          });
          if (index < bogies.length - 1) {
            if (index !== removeIndex) {
              k.drawSprite({
                sprite: 'chain',
                pos: k.vec2(bogie.x + 88, bogie.y - 16),
                scale: 0.1,
                origin: 'center'
              });
            }
          }
          k.drawText({
            text: bogie.value.toString(),
            pos: k.vec2(bogie.x + 30, bogie.y - 30),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
        }

      });
    }

    function drawNewBogie() {
      k.drawSprite({
        sprite: 'boggy',
        pos: k.vec2(newBogie.x, newBogie.y),
        scale: 0.1,
        origin: 'center'
      });
      if (newBogie.value !== null) {
        k.drawText({
          text: newBogie.value.toString(),
          pos: k.vec2(newBogie.x + 40, newBogie.y - 30),
          color: k.rgb(0, 0, 0),
          size: 24,
          font: "myFont",
          origin: "center",
        });
      }
    }

    function drawChain() {

      if (gameState === "LINKOFFIRSTCHAIN") {
        //Appearing 1st chain
        k.drawSprite({
          sprite: 'chain2',
          pos: k.vec2(chainPosition1.x, chainPosition1.y),
          scale: insertionIndex === 1 ? 0.1 : 0.08,
          origin: 'center'
        });
      }

      if (gameState === "ATTACHEDFIRSTCHAIN" || gameState === "BEFORELINKOFSECONDCHAIN") {
        //Attached 1st chain
        k.drawSprite({
          sprite: 'chain2',
          pos: insertionIndex === 1 ?
            k.vec2(((bogies[insertionIndex].x) - 25), ((bogies[insertionIndex].y) - 90))
            :
            k.vec2(((bogies[insertionIndex].x) - 25), ((bogies[insertionIndex].y) - 75)),
          scale: insertionIndex === 1 ? 0.1 : 0.08,
          origin: 'center'
        });
      }

      if (gameState === "LINKOFSECONDCHAIN") {
        //Appearing 2nd chain
        k.drawSprite({
          sprite: 'chain2',
          pos: k.vec2(chainPosition2.x, chainPosition2.y),
          scale: insertionIndex === 1 ? 0.1 : 0.08,
          origin: 'center'
        });
        //Attached 1st chain
        k.drawSprite({
          sprite: 'chain2',
          pos: insertionIndex === 1 ?
            k.vec2(((bogies[insertionIndex].x) - 25), ((bogies[insertionIndex].y) - 90))
            :
            k.vec2(((bogies[insertionIndex].x) - 25), ((bogies[insertionIndex].y) - 75)),
          scale: insertionIndex === 1 ? 0.1 : 0.08,
          origin: 'center'
        });
      }


      if (gameState === "ATTACHEDSECONDCHAIN") {
        //Attached 1st chain
        k.drawSprite({
          sprite: 'chain2',
          pos: insertionIndex === 1 ?
            k.vec2(((bogies[insertionIndex].x) - 25), ((bogies[insertionIndex].y) - 90))
            :
            k.vec2(((bogies[insertionIndex].x) - 25), ((bogies[insertionIndex].y) - 75)),
          scale: insertionIndex === 1 ? 0.1 : 0.08,
          origin: 'center'
        });
        //Attached 2nd chain
        k.drawSprite({
          sprite: 'chain2',
          pos: insertionIndex === 1 ? 
          k.vec2(((bogies[insertionIndex - 1].x) + 80), (bogies[insertionIndex].y)-90)
          :
          k.vec2(((bogies[insertionIndex - 1].x) + 80), (bogies[insertionIndex].y)-75),
          scale: insertionIndex === 1 ? 0.1 : 0.08,
          origin: 'center'
        });
        removeIndex = insertionIndex - 1
      }

    }

    function drawInstructions() {

      switch (gameState) {
        case "SELECT_NUMBER":
          k.drawText({
            text: "Enter a Number",
            pos: k.vec2(130, 160),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          k.drawText({
            text: "For your Boggy !",
            pos: k.vec2(130, 200),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          break;
        case "JUMP":
          k.drawText({
            text: "Use SpaceBar to",
            pos: k.vec2(130, 160),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          k.drawText({
            text: "Jump over other boggies",
            pos: k.vec2(130, 200),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          k.drawText({
            text: `Reach before Boggy No. ${insertionIndex} `,
            pos: k.vec2(130, 240),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          break;
        case "MOVE_BOGIE":
          k.drawText({
            text: "Use Arrow Keys to",
            pos: k.vec2(130, 160),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          k.drawText({
            text: "Move your Boggy!",
            pos: k.vec2(130, 200),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          k.drawText({
            text: "Place it at the front!",
            pos: k.vec2(130, 240),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          break;
        case "BEFORELINKOFFIRSTCHAIN":
          k.drawText({
            text: "A chain will appear",
            pos: k.vec2(130, 160),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          k.drawText({
            text: "from the portal",
            pos: k.vec2(130, 200),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          k.drawText({
            text: "at the bottom!",
            pos: k.vec2(130, 240),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          break;
        case "BEFORELINKOFSECONDCHAIN":
          k.drawText({
            text: "A second chain will appear",
            pos: k.vec2(130, 160),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          k.drawText({
            text: "from the portal",
            pos: k.vec2(130, 200),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          k.drawText({
            text: "at the bottom!",
            pos: k.vec2(130, 240),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          break;
        case "LINKOFFIRSTCHAIN":
          k.drawText({
            text: "Drag the chain",
            pos: k.vec2(130, 160),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          k.drawText({
            text: "Place it between",
            pos: k.vec2(130, 200),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          k.drawText({
            text: "the new boggy and the next boggy!",
            pos: k.vec2(130, 240),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });

          break;
        case "LINKOFSECONDCHAIN":
          k.drawText({
            text: "Drag the chain",
            pos: k.vec2(130, 160),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          k.drawText({
            text: "Place it between",
            pos: k.vec2(130, 200),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          k.drawText({
            text: "the new boggy and the previous boggy!",
            pos: k.vec2(130, 240),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          break;
        case "ATTACHEDSECONDCHAIN":
          k.drawText({
            text: "Well done!",
            pos: k.vec2(130, 160),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          k.drawText({
            text: "Both chains are ",
            pos: k.vec2(130, 200),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          k.drawText({
            text: "attachted to the new boggy!",
            pos: k.vec2(130, 240),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          break;
        case "ATTACHEDFIRSTCHAIN":
          k.drawText({
            text: "Good!",
            pos: k.vec2(130, 160),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          k.drawText({
            text: "The new boggy is attached",
            pos: k.vec2(130, 200),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          k.drawText({
            text: "with the next boggy!",
            pos: k.vec2(130, 240),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          break;
        case "AFTERATTACHED":
          k.drawText({
            text: "BRAVO!",
            pos: k.vec2(130, 160),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          k.drawText({
            text: "The new boggy is inserted",
            pos: k.vec2(130, 200),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          k.drawText({
            text: "in the train!",
            pos: k.vec2(130, 240),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          break;

        default:
          k.drawText({
            text: "Enter a Number",
            pos: k.vec2(130, 160),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          k.drawText({
            text: "For your Boggy !",
            pos: k.vec2(130, 200),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
      }
      k.drawSprite({
        sprite: 'burp',
        pos: k.vec2(15, 150),
        scale: 1,
        origin: 'center'
      });
    }

    k.onKeyPress("space", () => {
      k.play("jump", { volume: 0.8 });
      if (gameState === "JUMP") {

        if (currentBogieIndex < insertionIndex) {
          const targetBogie = bogies[currentBogieIndex + 1];
          currentBogieIndex++;

          newBogie.x = targetBogie.x + 102;
          newBogie.y = targetBogie.y - 80;

          if (currentBogieIndex === (insertionIndex - 1)) {
            gameState = "BEFORELINKOFFIRSTCHAIN";
            setTimeout(() => {
              k.play("appear", { volume: 1.4 });
              gameState = "LINKOFFIRSTCHAIN";
            }, 2000);


          }
        }
      }
    });

    k.onUpdate(() => {
      if (gameState === "MOVE_BOGIE") {
        let moveX = 0;
        let moveY = 0;

        // Determine the intended movement based on key presses
        if (k.isKeyDown("right")) moveX += 2;
        if (k.isKeyDown("left")) moveX -= 2;
        if (k.isKeyDown("up")) moveY -= 2;
        if (k.isKeyDown("down")) moveY += 2;

        // Calculate the new position based on intended movement
        const newPosition = {
          x: newBogie.x + moveX,
          y: newBogie.y + moveY,
        };

        // Check for collisions with existing bogies
        let canMove = true;
        for (const bogie of bogies) {
          if (
            newPosition.x < bogie.x + 110 &&  // Right edge of the new bogie is to the left of the right edge of the bogie
            newPosition.x + 110 > bogie.x &&  // Left edge of the new bogie is to the right of the left edge of the bogie
            newPosition.y < bogie.y + 80 &&  // Bottom edge of the new bogie is above the bottom edge of the bogie
            newPosition.y + 80 > bogie.y      // Top edge of the new bogie is below the top edge of the bogie
          ) {
            canMove = false; // Collision detected
            break; // Exit loop early if a collision is found
          }
        }
        if (newPosition.x < 0 || newPosition.x > 750 || newPosition.y < 310 || newPosition.y > 660) {
          canMove = false; // Collision with boundaries
        }

        // If no collisions, update the new bogie's position
        if (canMove) {
          newBogie.x = newPosition.x;
          newBogie.y = newPosition.y;
        }

        if (
          Math.abs(newBogie.x - (bogies[0].x - 138)) < 10 &&
          Math.abs(newBogie.y - (bogies[0].y + 30)) < 10
        ) {
          k.play("link", { volume: 1.4 });
          gameState = "JUMP";
        }

      }


      if (gameState === "LINKOFSECONDCHAIN") {
        currentBogieIndex = 0
        if (k.isMouseDown()) {
          chainPosition2 = k.mousePos();
          // console.log("Chain Pos :"+ chainPosition.x +" "+ chainPosition.y)
          // console.log("Bogie Pos"+ bogies[insertionIndex-1].x + " "+  bogies[insertionIndex-1].y )

          if (
            Math.abs(chainPosition2.x - ((bogies[insertionIndex - 1].x) + 80)) < 10 &&
            Math.abs((chainPosition2.y + 60) - (bogies[insertionIndex - 1].y)) < 10
          ) {
            k.play("goalSound", { volume: 0.7 });
            gameState = "ATTACHEDSECONDCHAIN"

            setTimeout(() => {
              for (let i = 0; i < bogies.length; i++) {
                if (i < insertionIndex) {
                  bogies[i].x -= 50
                }
                else if (i === insertionIndex) {
                  bogies.splice(insertionIndex, 0, { x: bogies[i - 1].x + 200, y: bogies[bogies.length - 1].y, value: newBogie.value });
                }
                else if (i > insertionIndex) {
                  bogies[i].x += 150
                }

              }
              gameState = "AFTERATTACHED"
              removeIndex = -100
              chainPosition1 = { x: 840, y: 585 };
              chainPosition2 = { x: 840, y: 585 };
              currentBogieIndex = -1
              newBogie = { x: 20, y: 550, value: null };

              setTimeout(() => {
                score += 10;
                k.play("attached", { volume: 1.5 });
              }, 100);


              setTimeout(() => {
                if (score === 20) {
                  k.play("completed", { volume: 0.8 });
                  k.go('end', {nextLevel: 'level4', currentLevel: 'level3' })
                }
                gameState = "SELECT_NUMBER";
                insertionIndex = Math.floor(Math.random() * (bogies.length - 1)) + 1;
              }, 2500);

            }, 2500);





          }
        }
      }

      if (gameState === "LINKOFFIRSTCHAIN") {

        if (k.isMouseDown()) {
          chainPosition1 = k.mousePos();

          //   console.log("Chain Pos :"+ chainPosition2.x +" "+ chainPosition2.y)
          //   console.log("Bogie Pos"+ bogies[insertionIndex].x + " "+  bogies[insertionIndex].y )

          if (
            Math.abs(chainPosition1.x - ((bogies[insertionIndex].x) - 25)) < 10 &&
            Math.abs((chainPosition1.y + 75) - (bogies[insertionIndex].y)) < 10
          ) {

            k.play("goalSound", { volume: 0.7 });
            gameState = "ATTACHEDFIRSTCHAIN";

            // Change gameState to "BEFORELINK" after 1 seconds
            setTimeout(() => {
              gameState = "BEFORELINKOFSECONDCHAIN";

              // After another 2 seconds, change gameState to "LINK" and play the animation
              setTimeout(() => {
                k.play("appear", { volume: 1.4 });
                gameState = "LINKOFSECONDCHAIN";
              }, 2500);

            }, 2500);


          }
        }

      }

    });

    k.onDraw(() => {
      k.drawSprite({
        sprite: 'background3',
        pos: k.vec2(0, 0), // Position at the top-left corner
        scale: 1.1, // Scale to fit the screen
        origin: 'topleft'
      });

      drawBogies();
      drawNewBogie();
      drawChain();
      drawInstructions();

      k.drawText({
        text: `Linko Insertion`,
        pos: k.vec2(k.width() - 720, 40),
        color: k.rgb(0, 0, 0),
        font: "myFont",
        size: 28,
      });
      k.drawText({
        text: `Level 3`,
        pos: k.vec2(k.width() - 600, 90),
        color: k.rgb(0, 0, 0),
        font: "myFont",
        size: 28,
      });
      k.drawSprite({
        sprite: "cloud",
        pos: k.vec2(190, 50),
        scale: 1,
        origin: "center",
      });
      k.drawSprite({
        sprite: "cloud",
        pos: k.vec2(710, 50),
        scale: 1,
        origin: "center",
      });
      k.drawSprite({
        sprite: 'coin',
        pos: k.vec2(k.width() - 130, 150),
        scale: 1,
        origin: 'center'
      });
      k.drawText({
        text: `${score}`,
        pos: k.vec2(k.width() - 80, 160),
        color: k.rgb(0, 0, 0),
        font: "myFont",
        size: 24,
      });
      k.drawSprite({
        sprite: 'portal',
        pos: k.vec2(k.width() - 100, 600),
        scale: 0.9,
        origin: 'center'
      });

      if (gameState === "SELECT_NUMBER") {
        for (let i = 1; i <= 5; i++) {
          k.drawText({
            text: i.toString(),
            pos: k.vec2(70 + i * 60, 240),
            color: k.rgb(0, 0, 0),
            font: "myFont",
            size: 24,
          });
        }
      }
    });

    k.onKeyPress("1", () => { if (gameState === "SELECT_NUMBER") { k.play("data", { volume: 0.8 }); newBogie.value = 1; gameState = "MOVE_BOGIE"; } });
    k.onKeyPress("2", () => { if (gameState === "SELECT_NUMBER") { k.play("data", { volume: 0.8 }); newBogie.value = 2; gameState = "MOVE_BOGIE"; } });
    k.onKeyPress("3", () => { if (gameState === "SELECT_NUMBER") { k.play("data", { volume: 0.8 }); newBogie.value = 3; gameState = "MOVE_BOGIE"; } });
    k.onKeyPress("4", () => { if (gameState === "SELECT_NUMBER") { k.play("data", { volume: 0.8 }); newBogie.value = 4; gameState = "MOVE_BOGIE"; } });
    k.onKeyPress("5", () => { if (gameState === "SELECT_NUMBER") { k.play("data", { volume: 0.8 }); newBogie.value = 5; gameState = "MOVE_BOGIE"; } });
    k.onKeyPress("6", () => { if (gameState === "SELECT_NUMBER") { k.play("data", { volume: 0.8 }); newBogie.value = 6; gameState = "MOVE_BOGIE"; } });
  });

  k.go("level3");
}