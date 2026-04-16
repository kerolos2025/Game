if (
  confirm(
    "Welcome to the Gift Collector Game! 🎁\n\nAvoid the boxes and collect gifts!",
  )
) {
  const container = document.getElementById("container");
  const boxes = document.querySelectorAll(".box");
  const level2 = document.querySelectorAll(".level2");
  const level3 = document.querySelectorAll(".level3");
  const level4 = document.querySelectorAll(".level4");

  const gift = document.getElementById("gift");
  const giftCount = document.getElementById("giftCount");
  const levelCount = document.getElementById("levelCount");
  const fakeCursor = document.getElementById("cursor");

  let gameOver = false;
  let level = 1;
  let gifts = 0;

  // ===============================
  // 🎮 INITIAL STATE
  // ===============================
  level2.forEach((b) => (b.style.display = "none"));
  level3.forEach((b) => (b.style.display = "none"));
  level4.forEach((b) => (b.style.display = "none"));

  // ===============================
  // 🧠 CURSOR SYSTEM
  // ===============================
  let started = false;

  let cursorX = window.innerWidth / 2;
  let cursorY = window.innerHeight / 2;

  function moveCursor(x, y) {
    started = true;

    cursorX = x;
    cursorY = y - 40; // ✅ fixed offset (bird above finger)

    fakeCursor.style.left = cursorX + "px";
    fakeCursor.style.top = cursorY + "px";
  }

  // Desktop
  document.addEventListener("mousemove", (e) => {
    moveCursor(e.pageX, e.pageY);
  });

  // Mobile
  document.addEventListener(
    "touchmove",
    (e) => {
      const t = e.touches[0];
      moveCursor(t.pageX, t.pageY);
    },
    { passive: false },
  );

  // prevent scroll
  document.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();
    },
    { passive: false },
  );

  // ===============================
  // 🎯 COLLISION SYSTEM (BOXES + GIFT)
  // ===============================
  container.addEventListener("mousemove", checkCollision);
  container.addEventListener("touchmove", checkCollision);

  function checkCollision() {
    if (gameOver || !started) return;

    const rect = container.getBoundingClientRect();

    const birdX = cursorX - rect.left;
    const birdY = cursorY - rect.top;

    // ===========================
    // 💀 BOX COLLISION
    // ===========================
    boxes.forEach((box) => {
      const r = box.getBoundingClientRect();

      const x1 = r.left - rect.left;
      const x2 = r.right - rect.left;
      const y1 = r.top - rect.top;
      const y2 = r.bottom - rect.top;

      if (birdX >= x1 && birdX <= x2 && birdY >= y1 && birdY <= y2) {
        stopGame();
      }
    });

    // ===========================
    // 🎁 GIFT COLLISION
    // ===========================
    const g = gift.getBoundingClientRect();

    const gx1 = g.left - rect.left;
    const gx2 = g.right - rect.left;
    const gy1 = g.top - rect.top;
    const gy2 = g.bottom - rect.top;

    if (
      birdX >= gx1 &&
      birdX <= gx2 &&
      birdY >= gy1 &&
      birdY <= gy2 &&
      gift.style.display !== "none"
    ) {
      collectGift();
    }
  }

  // ===============================
  // 💀 GAME OVER
  // ===============================
  function stopGame() {
    gameOver = true;

    boxes.forEach((box) => {
      box.style.animationPlayState = "paused";
    });

    setTimeout(() => {
      if (confirm("💀 Game Over!\nPlay Again?")) {
        location.reload();
      }
    }, 100);
  }

  // ===============================
  // 🎁 COLLECT GIFT (REPLACED mouseenter)
  // ===============================
  function collectGift() {
    if (gameOver) return;

    gifts++;
    giftCount.textContent = gifts;

    gift.style.display = "none";

    // ===============================
    // ⭐ LEVEL SYSTEM
    // ===============================
    if (gifts === 5) {
      level = 2;
      level2.forEach((b) => (b.style.display = "block"));
      levelCount.textContent = level;
    }

    if (gifts === 10) {
      level = 3;
      level3.forEach((b) => (b.style.display = "block"));
      levelCount.textContent = level;
    }

    if (gifts === 15) {
      level = 4;
      level4.forEach((b) => (b.style.display = "block"));
      levelCount.textContent = level;
    }

    if (gifts === 20) {
      alert("🎉 You Win! Game Completed!");
      location.reload();
    }
  }

  // ===============================
  // 🎁 GIFT SPAWN
  // ===============================
  setInterval(() => {
    if (gameOver) return;

    const x = Math.random() * (container.clientWidth - 80);
    const y = Math.random() * (container.clientHeight - 80);

    gift.style.left = x + "px";
    gift.style.top = y + "px";
    gift.style.display = "block";

    setTimeout(() => {
      gift.style.display = "none";
    }, 2000);
  }, 3000);
}
