export function level13(k, music) {
    const sandboxContainer = document.getElementById("sandbox-container");
  
    // Add sandbox content
    sandboxContainer.innerHTML = `
      <div style="display: flex; align-items: center; margin-bottom: 24px;">
        <div style="width: 12px; height: 12px; background-color: #ff5f57; border-radius: 50%; margin-right: 8px;"></div>
        <div style="width: 12px; height: 12px; background-color: #febc2e; border-radius: 50%; margin-right: 8px;"></div>
        <div style="width: 12px; height: 12px; background-color: #28c840; border-radius: 50%; margin-right: 16px;"></div>
        <h3 style="margin: 0; font-weight: 500; font-size: 16px; color: #bdc3c7;">Queue Dequeue Operation</h3>
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
          <span class="code"><span class="keyword">function</span> <span class="function">dequeue</span>() {</span>
        </div>
        <div class="code-line" data-line="2">
          <span class="line-number">2</span>
          <span class="code">    <span class="keyword">return</span> queue.shift();</span>
        </div>
        <div class="code-line" data-line="3">
          <span class="line-number">3</span>
          <span class="code">}</span>
        </div>
      </div>
      <div style="margin-top: 20px; display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center;">
          <div style="width: 8px; height: 8px; background-color: #bd93f9; border-radius: 50%; margin-right: 8px;"></div>
          <span style="font-size: 12px; color: #bdc3c7;">Queue</span>
        </div>
        <div style="font-size: 12px; color: #6272a4;">Level 1</div>
      </div>
    `;
  
    // Define the "level13" scene
    k.scene("level13", () => {
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
  
      // Queue game variables
      let queue = [
        { x: 300, y: 350, value: 1 },
        { x: 370, y: 350, value: 2 },
        { x: 440, y: 350, value: 3 },
      ]; // Initial queue with some elements
      let gameState = "READY";
      let score = 0;
  
      let isSettingsOpen = false;
      let isMuted = false;
      let isPaused = false;
  
      function pointInRect(point, rect) {
        return point.x >= rect.x &&
          point.x <= rect.x + rect.width &&
          point.y >= rect.y &&
          point.y <= rect.y + rect.height;
      }
  
      function drawQueue() {
        queue.forEach((element, index) => {
          k.drawSprite({
            sprite: "user",
            pos: k.vec2(element.x, element.y),
            scale: 0.2,
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
          case "READY":
            k.drawText({
              text: "Press SPACE to",
              pos: k.vec2(130, 160),
              color: k.rgb(0, 0, 0),
              size: 24,
              font: "myFont",
              origin: "center",
            });
            k.drawText({
              text: "Dequeue an Element!",
              pos: k.vec2(130, 200),
              color: k.rgb(0, 0, 0),
              size: 24,
              font: "myFont",
              origin: "center",
            });
            break;
          case "DEQUEUED":
            k.drawText({
              text: "BRAVO!",
              pos: k.vec2(130, 160),
              color: k.rgb(0, 0, 0),
              size: 24,
              font: "myFont",
              origin: "center",
            });
            k.drawText({
              text: "Element Dequeued!",
              pos: k.vec2(130, 200),
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
  
        if (gameState === "READY") {
          // Dequeue an element on SPACE key press
          if (k.isKeyPressed("space")) {
            if (queue.length > 0) {
              // Remove the first element from the queue
              const dequeuedElement = queue.shift();
  
              // Shift remaining elements to the left
              queue.forEach((element, index) => {
                element.x = 300 + (index * 70);
              });
  
              k.play("goalSound", { volume: 0.7 });
              gameState = "DEQUEUED";
              setTimeout(() => {
                score += 10;
                k.play("attached", { volume: 0.8 });
              }, 500);
  
              setTimeout(() => {
                if (queue.length === 0) {
                  k.play("completed", { volume: 0.8 });
                  music.stop();
                  sandboxContainer.classList.add('hidden');
                  k.go('end', { nextLevel: 'level2', currentLevel: 'level13' });
                }
                gameState = "READY";
              }, 2000);
            }
          }
        }
  
        if (gameState !== prevGameState) {
          if (gameState === "READY") {
            highlightLine(null);
          } else if (gameState === "DEQUEUED") {
            highlightLine(2);
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
  
        drawQueue();
        drawInstructions();
  
        k.drawText({
          text: `Queue Dequeue`,
          pos: k.vec2(1000 - 720, 40),
          color: k.rgb(0, 0, 0),
          font: "myFont",
          size: 28,
        });
        k.drawText({
          text: `Level 1`,
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
  
        if (isSettingsOpen) {
          const menuArea = {
            x: 1000 - 180,
            y: 80,
            width: 160,
            height: 100
          };
  
          if (!pointInRect(mousePos, menuArea)) {
            isSettingsOpen = false;
            return;
          }
  
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
  
          const pauseButtonArea = {
            x: 1000 - 170,
            y: 140,
            width: 140,
            height: 40
          };
  
          if (pointInRect(mousePos, pauseButtonArea)) {
            if (!isPaused) {
              k.play("click");
              isSettingsOpen = false;
            }
            isPaused = true;
          }
        }
      });
    });
  
    // Start the "level13" scene
    k.go("level13");
  }