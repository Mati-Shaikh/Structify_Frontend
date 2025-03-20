export function level11(k, music) {
  const sandboxContainer = document.getElementById("sandbox-container");

  // Add sandbox content
  sandboxContainer.innerHTML = `
    <div style="display: flex; align-items: center; margin-bottom: 24px;">
      <div style="width: 12px; height: 12px; background-color: #ff5f57; border-radius: 50%; margin-right: 8px;"></div>
      <div style="width: 12px; height: 12px; background-color: #febc2e; border-radius: 50%; margin-right: 8px;"></div>
      <div style="width: 12px; height: 12px; background-color: #28c840; border-radius: 50%; margin-right: 16px;"></div>
      <h3 style="margin: 0; font-weight: 500; font-size: 16px; color: #bdc3c7;">Stack Pop Operation</h3>
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
        <span class="code"><span class="keyword">function</span> <span class="function">pop</span>() {</span>
      </div>
      <div class="code-line" data-line="2">
        <span class="line-number">2</span>
        <span class="code">    <span class="keyword">if</span> (stack.length === 0) <span class="keyword">return</span> <span class="string">"Underflow"</span>;</span>
      </div>
      <div class="code-line" data-line="3">
        <span class="line-number">3</span>
        <span class="code">    <span class="keyword">return</span> stack.pop();</span>
      </div>
      <div class="code-line" data-line="4">
        <span class="line-number">4</span>
        <span class="code">}</span>
      </div>
    </div>
    <div style="margin-top: 20px; display: flex; justify-content: space-between; align-items: center;">
      <div style="display: flex; align-items: center;">
        <div style="width: 8px; height: 8px; background-color: #bd93f9; border-radius: 50%; margin-right: 8px;"></div>
        <span style="font-size: 12px; color: #bdc3c7;">Stack</span>
      </div>
      <div style="font-size: 12px; color: #6272a4;">Level 2</div>
    </div>
  `;

  // Define the "level1" scene
  k.scene("level11", () => {
    function highlightLine(lineNumber) {
      document.querySelectorAll('.code-line').forEach(el => {
        el.classList.remove('highlighted');
      });
      if (lineNumber) {
        const lineEl = document.querySelector(`.code-line[data-line="${lineNumber}"]`);
        if (lineEl) {
          lineEl.classList.add('highlighted');
        }
      }
    }

    // Stack game variables
    let stack = [
      { x: 300, y: 350, value: 3 },
      { x: 300, y: 420, value: 5 },
      { x: 300, y: 490, value: 7 },
    ];
    let gameState = "SELECT_NUMBER";
    let score = 0;

    let isSettingsOpen = false;
    let isMuted = false;
    let isPaused = false;

    // Animation variables
    let isAnimating = false;
    let animationProgress = 0;
    const animationDuration = 30; // Frames for animation

    function pointInRect(point, rect) {
      return point.x >= rect.x &&
        point.x <= rect.x + rect.width &&
        point.y >= rect.y &&
        point.y <= rect.y + rect.height;
    }

    function drawStack() {
      stack.forEach((element, index) => {
        k.drawSprite({
          sprite: "boook",
          pos: k.vec2(element.x, element.y),
          scale: 0.3,
          origin: "center",
        });
        k.drawText({
          text: element.value.toString(),
          pos: k.vec2(element.x + 30, element.y - 30),
          color: k.rgb(0, 0, 0),
          size: 24,
          font: "myFont",
          origin: "center",
        });
      });
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
            text: "to Pop from Stack!",
            pos: k.vec2(130, 200),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          break;
        case "POP_ELEMENT":
          k.drawText({
            text: "Popping Element...",
            pos: k.vec2(130, 160),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          break;
        case "CORRECT_POP":
          k.drawText({
            text: "BRAVO!",
            pos: k.vec2(130, 160),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          k.drawText({
            text: "Stack works on LIFO.",
            pos: k.vec2(130, 200),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          break;
        case "INCORRECT_POP":
          k.drawText({
            text: "Oops!",
            pos: k.vec2(130, 160),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          k.drawText({
            text: "Stacks work on LIFO,",
            pos: k.vec2(130, 200),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          k.drawText({
            text: "so please select the last element.",
            pos: k.vec2(130, 240),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
          break;
      }
    }

    let prevGameState = null;
    k.onUpdate(() => {
      if (isPaused) return;

      // Handle animation
      if (isAnimating) {
        animationProgress++;
        if (animationProgress >= animationDuration) {
          isAnimating = false;
          animationProgress = 0;
          stack.shift(); // Remove the top element after animation
          gameState = "CORRECT_POP";
          setTimeout(() => {
            if (score === 30) {
              k.play("completed", { volume: 0.8 });
              music.stop();
              sandboxContainer.classList.add('hidden');
              k.go('end', { nextLevel: 'level3', currentLevel: 'level1' });
            }
            gameState = "SELECT_NUMBER";
          }, 2000);
        }
      }

      if (gameState !== prevGameState) {
        if (gameState === "SELECT_NUMBER") {
          highlightLine(null);
        } else if (gameState === "POP_ELEMENT") {
          highlightLine(3);
        } else if (gameState === "CORRECT_POP" || gameState === "INCORRECT_POP") {
          highlightLine(null);
        }
        prevGameState = gameState;
      }
    });

    k.onDraw(() => {
      k.drawSprite({
        sprite: 'background',
        pos: k.vec2(0, 0),
        scale: 1.1,
        origin: 'topleft'
      });

      // Draw stack elements
      stack.forEach((element, index) => {
        if (isAnimating && index === 0) {
          // Animate the top element being removed
          const offsetY = (animationProgress / animationDuration) * 100;
          k.drawSprite({
            sprite: "boook",
            pos: k.vec2(element.x, element.y - offsetY),
            scale: 0.3,
            origin: "center",
          });
          k.drawText({
            text: element.value.toString(),
            pos: k.vec2(element.x + 30, element.y - 30 - offsetY),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
        } else {
          k.drawSprite({
            sprite: "boook",
            pos: k.vec2(element.x, element.y),
            scale: 0.3,
            origin: "center",
          });
          k.drawText({
            text: element.value.toString(),
            pos: k.vec2(element.x + 30, element.y - 30),
            color: k.rgb(0, 0, 0),
            size: 24,
            font: "myFont",
            origin: "center",
          });
        }
      });

      drawInstructions();

      k.drawText({
        text: `Stacko Pop`,
        pos: k.vec2(1000 - 720, 40),
        color: k.rgb(0, 0, 0),
        font: "myFont",
        size: 28,
      });
      k.drawText({
        text: `Level 2`,
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
    });

    k.onKeyPress("1", () => handlePop(1));
    k.onKeyPress("2", () => handlePop(2));
    k.onKeyPress("3", () => handlePop(3));
    k.onKeyPress("4", () => handlePop(4));
    k.onKeyPress("5", () => handlePop(5));
    k.onKeyPress("6", () => handlePop(6));

    function handlePop(number) {
      if (isPaused || gameState !== "SELECT_NUMBER" || isAnimating) return;

      if (stack.length === 0) {
        k.play("error", { volume: 0.8 });
        gameState = "INCORRECT_POP";
        setTimeout(() => gameState = "SELECT_NUMBER", 2000);
        return;
      }

      const topElement = stack[0].value;
      if (number === topElement) {
        k.play("goalSound", { volume: 0.7 });
        score += 10;
        isAnimating = true; // Start animation
      } else {
        k.play("error", { volume: 0.8 });
        gameState = "INCORRECT_POP";
        setTimeout(() => gameState = "SELECT_NUMBER", 2000);
      }
    }
  });

  // Start the "level1" scene
  k.go("level11");
}