export function level4(k, music) {
    k.scene("level4", () => {
        let bogies = [
            { x: 200, y: 420, value: 3 },
            { x: 350, y: 450, value: 5 },
            { x: 490, y: 450, value: 2 }
        ];
        let newBogie = { x: 20, y: 550, value: 0 };
        let gameState = "MOVE_BOGIE";
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

        function addBogie() {
            if (bogies.length < 6) {
                const lastBogie = bogies[bogies.length - 1];
                const secondLastBogie = bogies[bogies.length - 2];
                const xDifference = lastBogie.x - secondLastBogie.x;

                // Set the dynamic value (for example, it could be random, based on previous value, etc.)
                const dynamicValue = Math.floor(Math.random() * 9) + 1;

                const newBogie = {
                    x: (lastBogie.x + xDifference) - 5,
                    y: lastBogie.y,
                    value: dynamicValue // Use dynamic value
                };

                // Add the new bogie to the array
                bogies.push(newBogie);
            }
        }

        function removeBogie() {
            if (bogies.length >= 3) {
                bogies.pop();
            }
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
                        text: "Use SpaceBar to jump",
                        pos: k.vec2(130, 160),
                        color: k.rgb(0, 0, 0),
                        size: 24,
                        font: "myFont",
                        origin: "center",
                    });
                    k.drawText({
                        text: "The count will increase",
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
                        text: "Count the boggies!",
                        pos: k.vec2(130, 160),
                        color: k.rgb(0, 0, 0),
                        size: 24,
                        font: "myFont",
                        origin: "center",
                    });
                    k.drawText({
                        text: "MOVE ! (Using arrow keys)",
                        pos: k.vec2(130, 200),
                        color: k.rgb(0, 0, 0),
                        size: 24,
                        font: "myFont",
                        origin: "center",
                    });
                    k.drawText({
                        text: "Place boggie at the front",
                        pos: k.vec2(130, 240),
                        color: k.rgb(0, 0, 0),
                        size: 24,
                        font: "myFont",
                        origin: "center",
                    });
                    break;
                case "BEFORELINK":
                    k.drawText({
                        text: "How many boggies",
                        pos: k.vec2(130, 160),
                        color: k.rgb(0, 0, 0),
                        size: 24,
                        font: "myFont",
                        origin: "center",
                    });
                    k.drawText({
                        text: "are in the train?",
                        pos: k.vec2(130, 200),
                        color: k.rgb(0, 0, 0),
                        size: 24,
                        font: "myFont",
                        origin: "center",
                    });
                    k.drawText({
                        text: "Answer the portal!",
                        pos: k.vec2(130, 240),
                        color: k.rgb(0, 0, 0),
                        size: 24,
                        font: "myFont",
                        origin: "center",
                    });
                    break;
                case "LINK":
                    k.drawText({
                        text: "How many boggies",
                        pos: k.vec2(130, 160),
                        color: k.rgb(0, 0, 0),
                        size: 24,
                        font: "myFont",
                        origin: "center",
                    });
                    k.drawText({
                        text: "are in the train?",
                        pos: k.vec2(130, 200),
                        color: k.rgb(0, 0, 0),
                        size: 24,
                        font: "myFont",
                        origin: "center",
                    });
                    k.drawText({
                        text: "Answer the portal!",
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
                        text: "You have got it right!",
                        pos: k.vec2(130, 200),
                        color: k.rgb(0, 0, 0),
                        size: 24,
                        font: "myFont",
                        origin: "center",
                    });
                    k.drawText({
                        text: `The number is ${bogies.length}`,
                        pos: k.vec2(130, 240),
                        color: k.rgb(0, 0, 0),
                        size: 24,
                        font: "myFont",
                        origin: "center",
                    });
                    break;
                case "UNATTACHED":
                    k.drawText({
                        text: "HARD LUCK!",
                        pos: k.vec2(130, 160),
                        color: k.rgb(0, 0, 0),
                        size: 24,
                        font: "myFont",
                        origin: "center",
                    });
                    k.drawText({
                        text: "You have got it wrong :(",
                        pos: k.vec2(130, 200),
                        color: k.rgb(0, 0, 0),
                        size: 24,
                        font: "myFont",
                        origin: "center",
                    });
                    k.drawText({
                        text: `The right number is ${bogies.length}`,
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
                    newBogie.value += 1

                    // If we've jumped over all the bogies, switch to the LINK state
                    if (currentBogieIndex === bogies.length) {
                        gameState = "BEFORELINK";
                        setTimeout(() => {
                            k.play("appear", { volume: 1.4 });
                            gameState = "LINK";




                            const inputField = document.createElement("input");
                            inputField.type = "text";
                            inputField.placeholder = "Enter";
                            inputField.style.position = "absolute";
                            inputField.style.bottom = "48px";
                            inputField.style.left = "800px";
                            inputField.style.transform = "translateX(-50%)";
                            inputField.style.padding = "6px 10px";
                            inputField.style.width = "85px";
                            inputField.style.fontSize = "14px";
                            inputField.style.border = "2px solid rgba(255, 255, 255, 0.2)";
                            inputField.style.borderRadius = "4px";
                            inputField.style.outline = "none";
                            inputField.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
                            inputField.style.color = "#FFF8EA";
                            inputField.style.transition = "all 0.2s ease";
                            document.body.appendChild(inputField);

                            // Add subtle focus effect
                            inputField.addEventListener("focus", () => {
                                inputField.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
                                inputField.style.border = "2px solid rgba(255, 255, 255, 0.4)";
                            });

                            inputField.addEventListener("blur", () => {
                                inputField.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
                                inputField.style.border = "2px solid rgba(255, 255, 255, 0.2)";
                            });

                            inputField.addEventListener("input", () => {
                                const hasValue = inputField.value.trim() !== "";
                                submitButton.disabled = !hasValue;
                            });

                            // Create a minimal, matching button
                            const submitButton = document.createElement("button");
                            submitButton.disabled = true;
                            submitButton.innerText = "→";  // Using an arrow instead of "Submit"
                            submitButton.style.position = "absolute";
                            submitButton.style.bottom = "48px";
                            submitButton.style.left = "850px";
                            submitButton.style.padding = "6px 12px";
                            submitButton.style.fontSize = "14px";
                            submitButton.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
                            submitButton.style.color = "#ffffff";
                            submitButton.style.border = "2px solid rgba(255, 255, 255, 0.2)";
                            submitButton.style.borderRadius = "4px";
                            submitButton.style.cursor = "url(/game/sprites/pointer.png), pointer"
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
                                const userInput = inputField.value;
                                const numericInput = parseInt(userInput, 10);

                                inputField.remove();
                                submitButton.remove();

                                document.querySelector('canvas').focus();



                                if (numericInput === bogies.length) {

                                    k.play("goalSound", { volume: 0.7 });
                                    gameState = "ATTACHED";
                                    setTimeout(() => {
                                        score += 10;
                                        k.play("attached", { volume: 0.8 });

                                    }, 3000);

                                    setTimeout(() => {
                                        if (score === 30) {
                                            k.play("completed", { volume: 0.8 });
                                            music.stop();
                                            k.go('end', { nextLevel: 'level5', currentLevel: 'level4' })
                                        }
                                        newBogie = { x: 20, y: 550, value: 0 };
                                        for (let i = 0; i <= 9; i++) {
                                            const dynamicValue = Math.floor(Math.random() * 100); // Random number between 0 and 99
                                            console.log(dynamicValue);

                                            if (dynamicValue % 2 === 0) {
                                                addBogie(); // Add bogie if the number is even
                                            } else {
                                                removeBogie(); // Remove bogie if the number is odd
                                            }
                                        }
                                        currentBogieIndex = 0
                                        gameState = "MOVE_BOGIE";
                                    }, 3000);
                                } else {
                                    k.play("lose", { volume: 1.0 });
                                    gameState = "UNATTACHED";
                                    setTimeout(() => {
                                        k.play("data", { volume: 0.8 });
                                    }, 3000);

                                    setTimeout(() => {
                                        if (score === 30) {
                                            k.play("completed", { volume: 1.8 });
                                            music.stop();
                                            k.go('end', { nextLevel: 'level5', currentLevel: 'level4' })
                                        }
                                        newBogie = { x: 20, y: 550, value: 0 };
                                        for (let i = 0; i <= 10; i++) {
                                            const dynamicValue = Math.floor(Math.random() * 100); // Random number between 0 and 99
                                            console.log(dynamicValue);

                                            if (dynamicValue % 2 === 0) {
                                                addBogie(); // Add bogie if the number is even
                                            } else {
                                                removeBogie(); // Remove bogie if the number is odd
                                            }
                                        }
                                        currentBogieIndex = 0
                                        gameState = "MOVE_BOGIE";
                                    }, 3000);
                                }

                            });






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
            drawInstructions();

            k.drawText({
                text: `Linko Traversal`,
                pos: k.vec2(k.width() - 720, 40),
                color: k.rgb(0, 0, 0),
                font: "myFont",
                size: 28,
            });
            k.drawText({
                text: `Level 4`,
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

            if (gameState === "MOVE_BOGIE") {

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

    });

    k.go("level4");
}