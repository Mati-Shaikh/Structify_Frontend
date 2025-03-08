export function level3(k, music) {
  const sandboxContainer = document.getElementById("sandbox-container");
  sandboxContainer.classList.remove('hidden')

  // Add sandbox content
  sandboxContainer.innerHTML = `
    <div style="display: flex; align-items: center; margin-bottom: 24px;">
      <div style="width: 12px; height: 12px; background-color: #ff5f57; border-radius: 50%; margin-right: 8px;"></div>
      <div style="width: 12px; height: 12px; background-color: #febc2e; border-radius: 50%; margin-right: 8px;"></div>
      <div style="width: 12px; height: 12px; background-color: #28c840; border-radius: 50%; margin-right: 16px;"></div>
      <h3 style="margin: 0; font-weight: 500; font-size: 16px; color: #bdc3c7;">Insertion In Middle</h3>
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
    <span class="code"><span class="keyword">function</span> <span class="function">insertInMiddle</span>(<span class="object">targetIndex</span>, <span class="object">newData</span>) {</span>
</div>
<div class="code-line" data-line="2">
    <span class="line-number">2</span>
    <span class="code">    <span class="keyword">let</span> newNode <span class="operator">=</span> <span class="keyword">new</span> <span class="function">Node</span>(<span class="object">newData</span>);</span>
</div>
<div class="code-line" data-line="3">
    <span class="line-number">3</span>
    <span class="code">    <span class="keyword">let</span> current <span class="operator">=</span> head;</span>
</div>
<div class="code-line" data-line="4">
    <span class="line-number">4</span>
    <span class="code">    <span class="keyword">let</span> count <span class="operator">=</span> 0;</span>
</div>
<div class="code-line" data-line="5">
    <span class="line-number">5</span>
    <span class="code"></span>
</div>
<div class="code-line" data-line="6">
    <span class="line-number">6</span>
    <span class="code">    <span class="keyword">while</span> (current.next <span class="operator">!==</span> <span class="keyword">null</span>) {</span>
</div>
<div class="code-line" data-line="7">
    <span class="line-number">7</span>
    <span class="code">        <span class="keyword">if</span> (count <span class="operator">===</span> targetIndex - 1) {</span>
</div>
<div class="code-line" data-line="8">
    <span class="line-number">8</span>
    <span class="code">            newNode.next <span class="operator">=</span> current.next;</span>
</div>
<div class="code-line" data-line="9">
    <span class="line-number">9</span>
    <span class="code">            current.next <span class="operator">=</span> newNode;</span>
</div>
<div class="code-line" data-line="10">
    <span class="line-number">10</span>
    <span class="code">            <span class="keyword">return</span>;</span>
</div>
<div class="code-line" data-line="11">
    <span class="line-number">11</span>
    <span class="code">        }</span>
</div>
<div class="code-line" data-line="12">
    <span class="line-number">12</span>
    <span class="code">        current <span class="operator">=</span> current.next;</span>
</div>
<div class="code-line" data-line="13">
    <span class="line-number">13</span>
    <span class="code">        count++;</span>
</div>
<div class="code-line" data-line="14">
    <span class="line-number">14</span>
    <span class="code">    }</span>
</div>
<div class="code-line" data-line="15">
    <span class="line-number">15</span>
    <span class="code">}</span>
</div>
    </div>
    <div style="margin-top: 20px; display: flex; justify-content: space-between; align-items: center;">
      <div style="display: flex; align-items: center;">
        <div style="width: 8px; height: 8px; background-color: #bd93f9; border-radius: 50%; margin-right: 8px;"></div>
        <span style="font-size: 12px; color: #bdc3c7;">Linked List</span>
      </div>
      <div style="font-size: 12px; color: #6272a4;">Level 3</div>
    </div>
  `;

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
    if  (insertionIndex === 1){
      insertionIndex = 2
    }
    //let insertionIndex = 1
    let removeIndex = -100;

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
      if (isPaused) return;
      k.play("jump", { volume: 0.8 });
      if (gameState === "JUMP") {
        highlightLine(6, 7, 12, 13)
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
                  music.stop();
                  sandboxContainer.classList.add('hidden');
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

      if (gameState !== prevGameState) {
        if (gameState === "SELECT_NUMBER") {
          highlightLine(null);
        } else if (gameState === "MOVE_BOGIE") {
          highlightLine(2);
        } else if (gameState === "JUMP") {
          highlightLine(3, 4);
        }  else if (gameState === "BEFORELINK") {
          highlightLine(4);
        }  else if (gameState === "BEFORELINKOFFIRSTCHAIN") {
            highlightLine(7);
        }  else if (gameState === "LINKOFFIRSTCHAIN") {
          highlightLine(8);
        }  else if (gameState === "LINKOFSECONDCHAIN") {
          highlightLine(9);
        } else if (gameState === "AFTERATTACHED") {
          highlightLine(10);
        }
        prevGameState = gameState;
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
        pos: k.vec2(1000 - 720, 40),
        color: k.rgb(0, 0, 0),
        font: "myFont",
        size: 28,
      });
      k.drawText({
        text: `Level 3`,
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

  k.go("level3");
}