if (
  confirm(
    "Welcome to the Gift Collector Game! 🎁\n\nAvoid the moving boxes and collect as many gifts as you can. Good luck!",
  )
) {
  const container = document.getElementById("container");
  const boxes = document.querySelectorAll(".box");
  const level2 = document.querySelectorAll(".level2");
  const level3 = document.querySelectorAll(".level3");
  const level4 = document.querySelectorAll(".level4");

  let gameOver = false;
  let level = 1;

  level2.forEach((box) => {
    box.style.display = "none";
  });

  level3.forEach((box) => {
    box.style.display = "none";
  });

  level4.forEach((box) => {
    box.style.display = "none";
  });

  // Track mouse position
  // container.addEventListener("mousemove", function (event) {
  //   if (gameOver) return;

  //   const rect = container.getBoundingClientRect();
  //   const mouseX = event.clientX;
  //   const mouseY = event.clientY;

  //   // Check collision with every box
  //   boxes.forEach((box) => {
  //     const boxRect = box.getBoundingClientRect();

  //     if (
  //       mouseX >= boxRect.left &&
  //       mouseX <= boxRect.right &&
  //       mouseY >= boxRect.top &&
  //       mouseY <= boxRect.bottom
  //     ) {
  //       stopGame();
  //     }
  //   });
  // });

  container.addEventListener("mousemove", checkCollision);
  container.addEventListener("touchmove", checkCollision);

  function checkCollision(event) {
    if (gameOver) return;

    const rect = container.getBoundingClientRect();

    // get pointer position (mouse or touch)
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const clientY = event.touches ? event.touches[0].clientY : event.clientY;

    const mouseX = clientX;
    const mouseY = clientY;

    boxes.forEach((box) => {
      const boxRect = box.getBoundingClientRect();

      if (
        mouseX >= boxRect.left &&
        mouseX <= boxRect.right &&
        mouseY >= boxRect.top &&
        mouseY <= boxRect.bottom
      ) {
        stopGame();
      }
    });
  }
  // Stop game
  function stopGame() {
    gameOver = true;

    // Stop all animations
    boxes.forEach((box) => {
      box.style.animationPlayState = "paused";
    });

    // Alert with replay
    setTimeout(() => {
      if (confirm("💀 Game Over!\nPlay Again?")) {
        location.reload();
      }
    }, 100);
  }

  // gifts
  const gift = document.getElementById("gift");
  const giftCount = document.getElementById("giftCount");
  const levelCount = document.getElementById("levelCount");
  let gifts = 0;

  /* show gift every 3 sec */
  setInterval(() => {
    if (gameOver) return;

    const x = Math.random() * 1180;
    const y = Math.random() * 500;

    gift.style.left = x + "px";
    gift.style.top = y + "px";
    gift.style.display = "block";

    /* hide after 2 sec if not taken */
    setTimeout(() => {
      gift.style.display = "none";
    }, 2000);
  }, 3000);

  /* collect gift when cursor hover */
  gift.addEventListener("mouseenter", () => {
    if (gameOver) return;

    gifts++;
    giftCount.textContent = gifts;

    gift.style.display = "none";

    //level two
    if (gifts === 5) {
      level = 2;
      level2.forEach((box) => (box.style.display = "block"));
      levelCount.textContent = level;
    }

    //level three
    if (gifts === 10) {
      level = 3;
      level3.forEach((box) => (box.style.display = "block"));
      levelCount.textContent = level;
    }

    //level three
    if (gifts === 10) {
      level = 3;
      level3.forEach((box) => (box.style.display = "block"));
      levelCount.textContent = level;
    }

    //level four
    if (gifts === 15) {
      level = 4;
      level4.forEach((box) => (box.style.display = "block"));
      levelCount.textContent = level;
    }
    if (gifts === 20) {
      alert(
        "Congratulations! You've collected 20 gifts and completed the game! 🎉",
      );
      location.reload();
    }
  });
}
