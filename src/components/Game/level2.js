export function level2(k, music) {
  k.scene("level2", () => {
    let bogies = [
      { x: 200, y: 420, value: 3 },
      { x: 350, y: 450, value: 5 },
      { x: 490, y: 450, value: 2 }
    ];
    let newBogie = { x: 20, y: 550, value: null };
    let chainPosition = { x: 860, y: 605 };
    let gameState = "SELECT_NUMBER";
    let score = 0;
    let currentBogieIndex = 0

    let isSettingsOpen = false;
    let isMuted = false;
    let isPaused = false;

    function pointInRect(point, rect) {
      return point.x >= rect.x &&
        point.x <= rect.x + rect.width &&
        point.y >= rect.y &&
        point.y <= rect.y + rect.height;
    }


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
      if (gameState === "LINK") {
        k.drawSprite({
          sprite: 'chain2',
          pos: k.vec2(chainPosition.x, chainPosition.y),
          scale: 0.05,
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
            text: "Reach at the end!",
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
        case "BEFORELINK":
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
        case "LINK":
          k.drawText({
            text: "Drag the chain",
            pos: k.vec2(130, 160),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          k.drawText({
            text: "At the end of last boggy",
            pos: k.vec2(130, 200),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          k.drawText({
            text: "To link the new Boggy!",
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
            text: "The boggy is attached",
            pos: k.vec2(130, 200),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          k.drawText({
            text: "at the end!",
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
      if (isPaused) return;
      k.play("jump", { volume: 0.8 });
      if (gameState === "JUMP") {
        if (currentBogieIndex < bogies.length) {
          const targetBogie = bogies[currentBogieIndex];
          currentBogieIndex++;

          // Immediately place the newBogie on top of the current bogie
          newBogie.x = targetBogie.x;
          newBogie.y = targetBogie.y - 80;  // Jump above the target bogie

          // If we've jumped over all the bogies, switch to the LINK state
          if (currentBogieIndex === bogies.length) {
            gameState = "BEFORELINK";
            setTimeout(() => {
              k.play("appear", { volume: 1.4 });
              gameState = "LINK";
            }, 2000);
            // Move to LINK state after the last jump
          }
        }
      }
    });

    k.onUpdate(() => {
      if (isPaused) return;
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
          chainPosition = { x: 860, y: 605 };
        }

      }

      if (gameState === "LINK") {
        currentBogieIndex = 0
        if (k.isMouseDown()) {
          chainPosition = k.mousePos();

          if (
            Math.abs(chainPosition.x - ((bogies[bogies.length - 1].x) + 80)) < 10 &&
            Math.abs((chainPosition.y + 35) - (bogies[bogies.length - 1].y)) < 10
          ) {
            bogies.push({ x: bogies[bogies.length - 1].x + 140, y: bogies[bogies.length - 1].y, value: newBogie.value });

            newBogie = { x: 20, y: 550, value: null };
            k.play("goalSound", { volume: 0.7 });
            gameState = "ATTACHED";
            setTimeout(() => {
              score += 10;
              k.play("attached", { volume: 0.8 });
            }, 500);

            setTimeout(() => {
              if (score === 30) {
                k.play("completed", { volume: 0.8 });
                music.stop();
                k.go('end', {nextLevel: 'level3', currentLevel: 'level2' })
              }
              gameState = "SELECT_NUMBER";
            }, 2000);


          }
        }
      }
    });

    k.onDraw(() => {
      k.drawSprite({
        sprite: 'background2',
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
        text: `Level 2`,
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

      //Settings
      k.drawSprite({
        sprite: 'gear',
        pos: k.vec2(k.width() - 50, 50),
        scale: 0.5,
        origin: 'center'
      });

      if (isSettingsOpen) {
        // Menu background with shadow and rounded corners
        k.drawRect({
          pos: k.vec2(k.width() - 200, 85),
          width: 180,
          height: 120,
          color: k.rgb(250, 250, 250), // Softer background
          outline: { width: 3, color: k.rgb(50, 50, 50) }, // Stronger outline
          radius: 10, // Rounded corners
        });

        // Mute button with hover effect
        let muteColor = isMuted ? k.rgb(180, 180, 180) : k.rgb(220, 220, 220);
        k.drawRect({
          pos: k.vec2(k.width() - 190, 95),
          width: 160,
          height: 45,
          color: muteColor,
          outline: { width: 2, color: k.rgb(80, 80, 80) },
          radius: 8, // Rounded corners
        });
        k.drawText({
          text: isMuted ? "🔊 Unmute" : "🔈 Mute",
          pos: k.vec2(k.width() - 180, 110),
          origin: "center",
          size: 15,
          font: "myFont",
          color: k.rgb(30, 30, 30),
        });

        // Pause button with hover effect
        let pauseColor = isPaused ? k.rgb(180, 180, 180) : k.rgb(220, 220, 220);
        k.drawRect({
          pos: k.vec2(k.width() - 190, 150),
          width: 160,
          height: 45,
          color: pauseColor,
          outline: { width: 2, color: k.rgb(80, 80, 80) },
          radius: 8, // Rounded corners
        });
        k.drawText({
          text: isPaused ? "▶ Resume" : "⏸ Pause",
          pos: k.vec2(k.width() - 180, 165),
          origin: "center",
          size: 15,
          font: "myFont",
          color: k.rgb(30, 30, 30),
        });
      }

      if (isPaused) {
        k.drawRect({
          pos: k.vec2(0, 0),
          width: k.width(),
          height: k.height(),
          opacity: 0.8,
          color: k.rgb(0, 0, 0, 0)
        });
        k.drawSprite({
          sprite: 'arrow',
          pos: k.vec2(k.center().x - 40, k.center().y - 50),
          scale: 1.2,
          origin: 'center'
        });
        k.drawText({
          text: "Resume",
          pos: k.vec2(k.center().x - 100, k.center().y + 40),
          origin: "center",
          size: 30,
          font: "myFont",
          color: k.rgb(255, 255, 255),
        });
      }

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

    k.onMousePress(() => {
      const mousePos = k.mousePos();
      if (isPaused) {
        const resumeButtonArea = {
          x: k.center().x - 40,
          y: k.center().y - 50,
          width: 80,
          height: 80
        };
        if (pointInRect(mousePos, resumeButtonArea)) {
          isPaused = false;
          k.play("click");
        }
      }

      // Settings icon click
      const settingsIconArea = {
        x: k.width() - 70,
        y: 30,
        width: 40,
        height: 40
      };

      if (!isSettingsOpen && pointInRect(mousePos, settingsIconArea)) {
        isSettingsOpen = true;
        return;
      }

      // Menu interactions
      if (isSettingsOpen) {
        const menuArea = {
          x: k.width() - 180,
          y: 80,
          width: 160,
          height: 100
        };

        // Click outside menu
        if (!pointInRect(mousePos, menuArea)) {
          isSettingsOpen = false;
          return;
        }

        // Mute button click
        const muteButtonArea = {
          x: k.width() - 170,
          y: 90,
          width: 140,
          height: 40
        };

        if (pointInRect(mousePos, muteButtonArea)) {
          isMuted = !isMuted;
          if (isMuted) {
            music.stop();
          } else {
            music.play();
          }
          k.play("click");
        }

        // Pause button click
        const pauseButtonArea = {
          x: k.width() - 170,
          y: 140,
          width: 140,
          height: 40
        };

        if (pointInRect(mousePos, pauseButtonArea)) {
          if (!isPaused) {
            k.play("click");
            isSettingsOpen = false
          }
          isPaused = true;
        }

      }
    });

    k.onKeyPress("1", () => { if (!isPaused && gameState === "SELECT_NUMBER") { k.play("data", { volume: 0.8 }); newBogie.value = 1; gameState = "MOVE_BOGIE"; } });
    k.onKeyPress("2", () => { if (!isPaused && gameState === "SELECT_NUMBER") { k.play("data", { volume: 0.8 }); newBogie.value = 2; gameState = "MOVE_BOGIE"; } });
    k.onKeyPress("3", () => { if (!isPaused && gameState === "SELECT_NUMBER") { k.play("data", { volume: 0.8 }); newBogie.value = 3; gameState = "MOVE_BOGIE"; } });
    k.onKeyPress("4", () => { if (!isPaused && gameState === "SELECT_NUMBER") { k.play("data", { volume: 0.8 }); newBogie.value = 4; gameState = "MOVE_BOGIE"; } });
    k.onKeyPress("5", () => { if (!isPaused && gameState === "SELECT_NUMBER") { k.play("data", { volume: 0.8 }); newBogie.value = 5; gameState = "MOVE_BOGIE"; } });
    k.onKeyPress("6", () => { if (!isPaused && gameState === "SELECT_NUMBER") { k.play("data", { volume: 0.8 }); newBogie.value = 6; gameState = "MOVE_BOGIE"; } });
  });

  k.go("level2");
}