export function level7(k, music) {
  const sandboxContainer = document.getElementById("sandbox-container");
  sandboxContainer.classList.remove('hidden')

  // Add sandbox content
  sandboxContainer.innerHTML = `
    <div style="display: flex; align-items: center; margin-bottom: 24px;">
      <div style="width: 12px; height: 12px; background-color: #ff5f57; border-radius: 50%; margin-right: 8px;"></div>
      <div style="width: 12px; height: 12px; background-color: #febc2e; border-radius: 50%; margin-right: 8px;"></div>
      <div style="width: 12px; height: 12px; background-color: #28c840; border-radius: 50%; margin-right: 16px;"></div>
      <h3 style="margin: 0; font-weight: 500; font-size: 16px; color: #bdc3c7;">Deletion At Front</h3>
    </div>
    <div class="code-display">
      <style>
        .code-display {
          background: #282a36;
          padding: 20px;
          border-radius: 10px;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 14px;
          line-height: 1.6;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .code-line {
          display: flex;
          align-items: center;
          padding: 4px 8px;
          border-radius: 6px;
          transition: background 0.2s ease;
        }
        .code-line:hover {
          background: rgba(255, 255, 255, 0.05);
        }
        .line-number {
          color: #6272a4;
          min-width: 32px;
          user-select: none;
          font-size: 12px;
          text-align: right;
          padding-right: 12px;
        }
        .code {
          color: #f8f8f2;
          padding-left: 12px;
          border-left: 1px solid rgba(255, 255, 255, 0.1);
        }
        .keyword {
          color: #ff79c6;
        }
        .function {
          color: #50fa7b;
        }
        .object {
          color: #8be9fd;
        }
        .operator {
          color: #ff79c6;
        }
        .string {
          color: #f1fa8c;
        }
        .highlighted {
          background: rgba(96, 165, 250, 0.2);
          border-left: 2px solid #bd93f9;
        }
      </style>
      <div class="code-line" data-line="1">
          <span class="line-number">1</span>
          <span class="code"><span class="keyword">function</span> <span class="function">deleteAtFront</span>() {</span>
      </div>
      <div class="code-line" data-line="2">
          <span class="line-number">2</span>
          <span class="code">    <span class="keyword">let</span> current <span class="operator">=</span> head;</span>
      </div>
      <div class="code-line" data-line="3">
          <span class="line-number">3</span>
          <span class="code">    head <span class="operator">=</span> head.next;</span>
      </div>
      <div class="code-line" data-line="4">
          <span class="line-number">4</span>
          <span class="code">    current <span class="operator">=</span> <span class="keyword">null</span>;</span>
      </div>
      <div class="code-line" data-line="5">
          <span class="line-number">5</span>
          <span class="code">}</span>
      </div>
    </div>
    <div style="margin-top: 20px; display: flex; justify-content: space-between; align-items: center;">
      <div style="display: flex; align-items: center;">
        <div style="width: 8px; height: 8px; background-color: #bd93f9; border-radius: 50%; margin-right: 8px;"></div>
        <span style="font-size: 12px; color: #bdc3c7;">Linked List</span>
      </div>
      <div style="font-size: 12px; color: #6272a4;">Level 7</div>
    </div>
  `;

  k.scene("level7", () => {
    let bogies = [
      { x: 200, y: 420, value: 3 },
      { x: 350, y: 450, value: 5 },
      { x: 490, y: 450, value: 1 },
      { x: 630, y: 450, value: 7 },
      { x: 770, y: 450, value: 8 },
    ];
    let newBogie = { x: 20, y: 550, value: null };
    let chainPosition = { x: 840, y: 600 };
    let gameState = "MOVE_BOGIE";
    let score = 0;
    let currentBogieIndex = 0

    let isSettingsOpen = false;
    let isMuted = false;
    let isPaused = false;

    function highlightLine(...args) {
      // Determine the array of line numbers to highlight
      let lineNumbers;
      if (Array.isArray(args[0])) {
        lineNumbers = args[0]; // Use the array if the first argument is an array
      } else {
        lineNumbers = args; // Use the arguments as the array otherwise
      }
    
      // Remove 'highlighted' class from all lines
      document.querySelectorAll('.code-line').forEach(el => {
        el.classList.remove('highlighted');
      });
    
      // Highlight each specified line
      lineNumbers.forEach(lineNumber => {
        const lineEl = document.querySelector(`.code-line[data-line="${lineNumber}"]`);
        if (lineEl) {
          lineEl.classList.add('highlighted');
        }
      });
    }

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
      if (newBogie != null) {
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
            text: "Jump over the",
            pos: k.vec2(130, 200),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          k.drawText({
            text: "HEAD boggy!",
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
            text: "to shift the head",
            pos: k.vec2(130, 200),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          k.drawText({
            text: "one position down!",
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
            text: "the temporary bogie",
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
            text: "from the front!",
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
          if (currentBogieIndex === 1) {
            gameState = "BEFORESHIFT";
            newBogie.value = bogies[0].value
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
                newBogie.y = bogies[1].y
                bogies[1].y = bogies[0].y;
                bogies.shift();
                submitButton.remove();
                document.querySelector('canvas').focus();
                gameState = "BEFOREBOMB";
                setTimeout(() => {
                  k.play("appear", { volume: 1.4 });
                  gameState = "BOMB";
                }, 2000);
              });
            }, 2000);

          }
        }
      }
    });

    let prevGameState = null;
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
            Math.abs(chainPosition.x - ((newBogie.x) + 25)) < 10 &&
            Math.abs((chainPosition.y + 35) - (newBogie.y)) < 10
          ) {

            newBogie = null;
            k.play("bomb", { volume: 1.5 });
            gameState = "ATTACHED";
            setTimeout(() => {
              score += 10;
              k.play("attached", { volume: 0.8 });
            }, 2000);

            setTimeout(() => {
              if (score === 30) {
                k.play("completed", { volume: 0.8 });
                music.stop();
                sandboxContainer.classList.add('hidden');
                k.go('end', { nextLevel: 'level8', currentLevel: 'level7' })
              }
              newBogie = { x: 20, y: 550, value: null };
              gameState = "MOVE_BOGIE";
            }, 2000);


          }
        }
      }

      if (gameState !== prevGameState) {
        if (gameState === "MOVE_BOGIE") {
          highlightLine(null);
        } else if (gameState === "JUMP") {
          highlightLine(2);
        } else if (gameState === "SHIFT" || gameState === "BEFOREBOMB") {
          highlightLine(3);
        } else if (gameState === "BOMB") {
          highlightLine(4);
        }
        prevGameState = gameState;
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
        text: `Linko Deletion`,
        pos: k.vec2(1000 - 720, 40),
        color: k.rgb(0, 0, 0),
        font: "myFont",
        size: 28,
      });
      k.drawText({
        text: `Level 7`,
        pos: k.vec2(1000 - 600, 90),
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
        pos: k.vec2(1000 - 130, 150),
        scale: 1,
        origin: 'center'
      });
      k.drawText({
        text: `${score}`,
        pos: k.vec2(1000 - 80, 160),
        color: k.rgb(0, 0, 0),
        font: "myFont",
        size: 24,
      });
      k.drawSprite({
        sprite: 'portal',
        pos: k.vec2(1000 - 100, 600),
        scale: 0.9,
        origin: 'center'
      });

      //Settings
      k.drawSprite({
        sprite: 'gear',
        pos: k.vec2(1000 - 50, 50),
        scale: 0.5,
        origin: 'center'
    });

    if (isSettingsOpen) {
        // Menu background with shadow and rounded corners
        k.drawRect({
            pos: k.vec2(1000 - 200, 85),
            width: 180,
            height: 120,
            color: k.rgb(250, 250, 250), // Softer background
            outline: { width: 3, color: k.rgb(50, 50, 50) }, // Stronger outline
            radius: 10, // Rounded corners
        });

        // Mute button with hover effect
        let muteColor = isMuted ? k.rgb(180, 180, 180) : k.rgb(220, 220, 220);
        k.drawRect({
            pos: k.vec2(1000 - 190, 95),
            width: 160,
            height: 45,
            color: muteColor,
            outline: { width: 2, color: k.rgb(80, 80, 80) },
            radius: 8, // Rounded corners
        });
        k.drawText({
            text: isMuted ? "🔊 Unmute" : "🔈 Mute",
            pos: k.vec2(1000 - 180, 110),
            origin: "center",
            size: 15,
            font: "myFont",
            color: k.rgb(30, 30, 30),
        });

        // Pause button with hover effect
        let pauseColor = isPaused ? k.rgb(180, 180, 180) : k.rgb(220, 220, 220);
        k.drawRect({
            pos: k.vec2(1000 - 190, 150),
            width: 160,
            height: 45,
            color: pauseColor,
            outline: { width: 2, color: k.rgb(80, 80, 80) },
            radius: 8, // Rounded corners
        });
        k.drawText({
            text: isPaused ? "▶ Resume" : "⏸ Pause",
            pos: k.vec2(1000 - 180, 165),
            origin: "center",
            size: 15,
            font: "myFont",
            color: k.rgb(30, 30, 30),
        });
    }

    if (isPaused) {
        k.drawRect({
            pos: k.vec2(0, 0),
            width: 1000,
            height: k.height(),
            opacity: 0.8,
            color: k.rgb(0, 0, 0, 0)
        });
        k.drawSprite({
            sprite: 'arrow',
            pos: k.vec2(500 - 40, k.center().y - 50),
            scale: 1.2,
            origin: 'center'
        });
        k.drawText({
            text: "Resume",
            pos: k.vec2(500 - 100, k.center().y + 40),
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
          x: 500 - 40,
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
        x: 1000 - 70,
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
          x: 1000 - 180,
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
          x: 1000 - 170,
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
          x: 1000 - 170,
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

  k.go("level7");
}