export function end(k) {
  return k.scene("end", ({ nextLevel, currentLevel }) => {
    let keysJammed = false; // Flag to prevent multiple keypress actions
    let currentLevelData;
    // Text objects to be removed later
    const texts = [];

    // Display "You Win!"
    texts.push(
      k.add([
        k.text("You Win!", { size: 64, font: "myfont" }),
        k.pos(k.width() / 2, 720 / 2 - 150),
        k.anchor("center"),
      ])
    );

    // Display instructions
    texts.push(
      k.add([
        k.text("Press ← to Play Again", { size: 16, font: "myfont" }),
        k.pos(k.width() / 2, 720 / 2 - 50),
        k.anchor("center"),
      ])
    );

    texts.push(
      k.add([
        k.text("Press → to Move to Next Level", { size: 16, font: "myfont" }),
        k.pos(k.width() / 2, 720 / 2),
        k.anchor("center"),
      ])
    );

    texts.push(
      k.add([
        k.text("Press Enter to Navigate to Learning Path", { size: 16, font: "myfont" }),
        k.pos(k.width() / 2, 720 / 2 + 50),
        k.anchor("center"),
      ])
    );

    // Add a "Please wait..." message (initially hidden)
    const waitMessage = k.add([
      k.text("Wait for a few seconds", { size: 32, font: "myfont" }),
      k.pos(k.width() / 2, 720 / 2),
      k.anchor("center"),
      k.opacity(0), // Hidden by default
    ]);

    // Add a moving circle for loading
    const loadingCircle = k.add([
      k.circle(10), // Circle with a radius of 10
      k.color(255, 255, 255),
      k.pos(k.width() / 2, 720 / 2 + 80),
      k.opacity(0), // Hidden by default
    ]);

    const token = localStorage.getItem("token");
    fetch("http://localhost:3005/api/users/levelCompleted", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({
        nextLevel: nextLevel,
        currentLevel: currentLevel,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update progress");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Progress updated");
        currentLevelData = data.currentLevel;
      })
      .catch((error) => {
        console.error("Error updating progress:", error);
      });

    

    // Function to handle keypress actions
    const handleKeyPress = (action) => {
      if (keysJammed) return; // Ignore further keypresses if keys are jammed

      keysJammed = true; // Jam the keys
      texts.forEach((text) => text.destroy()); // Remove all other texts
      waitMessage.opacity = 1; // Show the "Please wait..." message
      loadingCircle.opacity = 1; // Show the loading circle

      // Execute the action after a delay
      setTimeout(() => {
        action();
      }, 2000); // 2-second delay
    };

    // Event listeners for keypress actions
    k.onKeyPress("left", () => {
      handleKeyPress(() => {
        k.go(currentLevel); // Restart the current level
      });
    });

    k.onKeyPress("right", () => {
      handleKeyPress(() => {
        window.location.href = `/game/${nextLevel}`;
      });
    });

    k.onKeyPress("enter", () => {
      handleKeyPress(() => {
        window.location.href = `/game-completion?levelId=${currentLevelData.id}&levelName=${currentLevelData.name}`;
      });
    });
  });
}
