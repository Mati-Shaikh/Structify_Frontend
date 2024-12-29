export function level9(k) {
    k.scene("level9", () => {
      let bogies = [
        { x: 200, y: 420, value: 3 },
        { x: 350, y: 450, value: 5 },
        { x: 490, y: 450, value: 1 },
        { x: 630, y: 450, value: 7 },
        { x: 770, y: 450, value: 8 },
        { x: 910, y: 450, value: 2 },
      ];
      let newBogie = { x: 20, y: 550, value: null };
      let deleteBogie = null;
      let chainPosition = { x: 840, y: 600 };
      let gameState = "MOVE_BOGIE";
      let score = 0;
      let currentBogieIndex = 0
      let deletionIndex = Math.floor(Math.random() * (bogies.length - 2)) + 2;
      console.log(deletionIndex)
  
  
      function drawBogies() {
        bogies.forEach((bogie, index) => {
          if (index === 0) {
            k.drawSprite({
              sprite: "head",
              pos: k.vec2(bogie.x, bogie.y),
              scale: 0.1,
              origin: "center",
            });
            k.drawSprite({
              sprite: 'chain',
              pos: k.vec2(bogie.x + 97, bogie.y + 27),
              scale: 0.05,
              origin: 'center'
            });
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
              k.drawSprite({
                sprite: 'chain',
                pos: k.vec2(bogie.x + 86, bogie.y - 3),
                scale: 0.05,
                origin: 'center'
              });
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
        if(newBogie != null){
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
      }

      function drawDeleteBogie() {
        if(deleteBogie != null){
        k.drawSprite({
          sprite: 'boggy',
          pos: k.vec2(deleteBogie.x, deleteBogie.y),
          scale: 0.1,
          origin: 'center'
        });
        if (deleteBogie.value !== null) {
          k.drawText({
            text: deleteBogie.value.toString(),
            pos: k.vec2(deleteBogie.x + 40, deleteBogie.y - 30),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
        }
      }
      }
  
      function drawChain() {
        if (gameState === "BOMB") {
          k.drawSprite({
            sprite: 'bomb',
            pos: k.vec2(chainPosition.x, chainPosition.y),
            scale: 0.03,
            origin: 'center'
          });
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
                text: `Reach before Boggy No. ${deletionIndex} `,
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
          case "BEFORESHIFT":
            k.drawText({
              text: "A button will appear",
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
          case "SHIFT":
            k.drawText({
              text: "Press the button",
              pos: k.vec2(130, 160),
              color: k.rgb(0, 0, 0),
              size: 24,
              font: "myFont",
              origin: "center",
            });
            k.drawText({
              text: "so that the current pointer",
              pos: k.vec2(130, 200),
              color: k.rgb(0, 0, 0),
              size: 24,
              font: "myFont",
              origin: "center",
            });
            k.drawText({
              text: "is updated to next->next !",
              pos: k.vec2(130, 240),
              color: k.rgb(0, 0, 0),
              size: 24,
              font: "myFont",
              origin: "center",
            });
            break;
            case "BEFOREBOMB":
              k.drawText({
                text: "A bomb will appear",
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
              case "BOMB":
                k.drawText({
                  text: "Drag the bomb to",
                  pos: k.vec2(130, 160),
                  color: k.rgb(0, 0, 0),
                  size: 24,
                  font: "myFont",
                  origin: "center",
                });
                k.drawText({
                  text: "the popped bogie",
                  pos: k.vec2(130, 200),
                  color: k.rgb(0, 0, 0),
                  size: 24,
                  font: "myFont",
                  origin: "center",
                });
                k.drawText({
                  text: "to delete it",
                  pos: k.vec2(130, 240),
                  color: k.rgb(0, 0, 0),
                  size: 24,
                  font: "myFont",
                  origin: "center",
                });
                break;
          case "ATTACHED":
            k.drawText({
              text: "BRAVO!",
              pos: k.vec2(130, 160),
              color: k.rgb(0, 0, 0),
              size: 24,
              font: "myFont",
              origin: "center",
            });
            k.drawText({
              text: "The boggy is deleted",
              pos: k.vec2(130, 200),
              color: k.rgb(0, 0, 0),
              size: 24,
              font: "myFont",
              origin: "center",
            });
            k.drawText({
              text: "from the middle!",
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
          if (currentBogieIndex < bogies.length) {
            const targetBogie = bogies[currentBogieIndex];
            currentBogieIndex++;
  
            // Immediately place the newBogie on top of the current bogie
            newBogie.x = targetBogie.x;
            newBogie.y = targetBogie.y - 80;  // Jump above the target bogie
            newBogie.value= targetBogie.value
  
            // If we've jumped over all the bogies, switch to the LINK state
            console.log(currentBogieIndex)
            if (currentBogieIndex === deletionIndex - 1) {
              gameState = "BEFORESHIFT";
              setTimeout(() => {
                k.play("appear", { volume: 1.4 });
                gameState = "SHIFT";
                const submitButton = document.createElement("button");
                submitButton.innerText = "SHIFT";  // Using an arrow instead of "Submit"
                submitButton.style.position = "absolute";
                submitButton.style.bottom = "48px";
                submitButton.style.left = "820px";
                submitButton.style.padding = "6px 12px";
                submitButton.style.fontSize = "14px";
                submitButton.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
                submitButton.style.color = "#ffffff";
                submitButton.style.border = "2px solid rgba(255, 255, 255, 0.2)";
                submitButton.style.borderRadius = "4px";
                submitButton.style.cursor = "url(/game/sprites/pointer.png), pointer";
                submitButton.style.transition = "all 0.2s ease";
                document.body.appendChild(submitButton);
  
                // Add subtle hover effect
                submitButton.addEventListener("mouseover", () => {
                  submitButton.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
                  submitButton.style.border = "2px solid rgba(255, 255, 255, 0.4)";
                });
  
                submitButton.addEventListener("mouseout", () => {
                  submitButton.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
                  submitButton.style.border = "2px solid rgba(255, 255, 255, 0.2)";
                });
  
                // Event Listener for Submit Button
                submitButton.addEventListener("click", () => {
                  k.play("goalSound", { volume: 0.7 });
                  deleteBogie = bogies[deletionIndex - 1];
                  console.log(deleteBogie)
                  bogies.splice(deletionIndex - 1, 1);
                  if (bogies[deletionIndex - 1]) {
                    // Update the x of the next bogie to the deleted bogie's x
                    bogies[deletionIndex - 1].x = deleteBogie.x;
                  
                    // Update the x of all bogies after the updated one
                    for (let i = deletionIndex; i < bogies.length; i++) {
                      bogies[i].x = bogies[i - 1].x + 140;
                    }
                  }
                  deleteBogie.y += 70
                  submitButton.remove();
                  document.querySelector('canvas').focus(); 
                  gameState = "BEFOREBOMB";
                          setTimeout(() => {
                              k.play("appear", { volume: 1.4 });
                              gameState = "BOMB"; }, 2000);
                });
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
            chainPosition = { x: 840, y: 600 };
          }
  
        }
  
        if (gameState === "BOMB") {
          currentBogieIndex = 0
          if (k.isMouseDown()) {
            chainPosition = k.mousePos();
  
            console.log(chainPosition)
            console.log(newBogie)
  
            if (
              Math.abs(chainPosition.x - ((deleteBogie.x) + 25)) < 10 &&
              Math.abs((chainPosition.y + 35) - (deleteBogie.y)) < 10
            ) {
              
              newBogie = null;
              deleteBogie= null;
              deletionIndex = Math.floor(Math.random() * (bogies.length - 2)) + 2;
              k.play("bomb", { volume: 1.5});
              gameState = "ATTACHED";
              setTimeout(() => {
                score += 10;
                k.play("attached", { volume: 0.8 });
              }, 2000);
  
              setTimeout(() => {
                if (score === 30) {
                  k.play("completed", { volume: 0.8 });
                  k.go('end', { nextLevel: 'level10', currentLevel: 'level9' })
                }
                newBogie = { x: 20, y: 550, value: null };
                gameState = "MOVE_BOGIE";
              }, 2000);
  
  
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
        drawDeleteBogie();
        drawChain();
        drawInstructions();
  
        k.drawText({
          text: `Linko Deletion`,
          pos: k.vec2(k.width() - 720, 40),
          color: k.rgb(0, 0, 0),
          font: "myFont",
          size: 28,
        });
        k.drawText({
          text: `Level 9`,
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
  
    k.go("level9");
  }