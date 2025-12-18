const intro = document.getElementById("introText");
const roomBg = document.getElementById("room-bg");
const bulbsContainer = document.getElementById("bulbsContainer");
const flyBalloons = document.getElementById("flyBalloons");
const song = document.getElementById("song");

const banner = document.getElementById("banner");
const table = document.getElementById("table");
const cake = document.getElementById("cake");
const giftLeft = document.getElementById("giftLeft");
const giftRight = document.getElementById("giftRight");

const letterZone = document.getElementById("letterZone");

/* INTRO TEXTS */
const introTexts = [
  "Hey!",
  "Why is it so dark here?",
  "Friend! Can you please switch on the lights?"
];

let idx = 0;

// Create the switch image and popup text for "click on the bulb"
const switchImg = document.createElement("img");
switchImg.src = "switch.png";
switchImg.style.position = "fixed";
switchImg.style.top = "50%";
switchImg.style.left = "50%";
switchImg.style.transform = "translate(-50%, -50%)";
switchImg.style.cursor = "pointer";
switchImg.style.zIndex = "60";
switchImg.style.width = "120px";
switchImg.style.display = "none";

const clickBulbPopup = document.createElement("div");
clickBulbPopup.textContent = "Click on the bulb";
clickBulbPopup.style.position = "fixed";
clickBulbPopup.style.top = "calc(50% + 90px)";
clickBulbPopup.style.left = "50%";
clickBulbPopup.style.transform = "translateX(-50%)";
clickBulbPopup.style.fontSize = "1.5rem";
clickBulbPopup.style.color = "white";
clickBulbPopup.style.opacity = "0";
clickBulbPopup.style.transition = "opacity 1s ease";
clickBulbPopup.style.zIndex = "60";

document.body.appendChild(switchImg);
document.body.appendChild(clickBulbPopup);

function showSwitchAndPopup() {
  switchImg.style.display = "block";
  setTimeout(() => {
    clickBulbPopup.style.opacity = "1";
  }, 500);
}

function playIntro() {
  intro.textContent = introTexts[idx];
  intro.style.fontFamily = "'Courgette', cursive";
  intro.style.opacity = 1;

  setTimeout(() => {
    intro.style.opacity = 0;

    // If this is the last message, show switch *after fade out* (2 seconds later)
    if (idx === introTexts.length - 1) {
      setTimeout(showSwitchAndPopup, 5000);
    }
  }, 2000);

  idx++;
  if (idx < introTexts.length) setTimeout(playIntro, 3000);
}

playIntro();

/* SWITCH CLICK - replace button click */
switchImg.onclick = () => {
  switchImg.style.display = "none";
  clickBulbPopup.style.opacity = "0";
  intro.style.opacity = 0;

  roomBg.style.opacity = 1;
  song.play();

  bulbsContainer.style.opacity = 1;
  blinkBulbs();

  introSequenceAfterLights();
};

function introSequenceAfterLights() {
  const texts = [
    "Okay! why is it so empty here?",
    "Oh wait, can you close your eyes for a second"
  ];
  let i = 0;

  function next() {
    intro.textContent = texts[i];
    intro.style.fontFamily = "'Courgette', cursive";
    intro.style.opacity = 1;
    setTimeout(() => intro.style.opacity = 0, 4500);
    i++;
    if (i < texts.length) setTimeout(next, 5000);
    else setTimeout(startDecorations, 5000);
  }
  next();
}

/* DECORATIONS */
function startDecorations() {
  for (let i = 0; i < 900; i++) {
    const img = document.createElement("img");
    img.src = [
      "b1.png","b2.png","b3.png","b4.png","b5.png","b6.png","b7.png",
      "heartr.png","heartb.png"
    ][Math.floor(Math.random() * 9)];

    img.className = "fly-balloon";
    img.style.left = Math.random() * 96 + "vw";
    img.style.width = 20 + Math.random() * 100 + "px";
    img.style.animationDuration = 5 + Math.random() * 7 + "s";
    flyBalloons.appendChild(img);
  }

  setTimeout(() => banner.classList.add("show-banner"), 3000);
  setTimeout(() => table.classList.add("show-table"), 3000);
  setTimeout(() => cake.classList.add("show-cake"), 3000);
  setTimeout(() => {
    giftLeft.classList.add("show-gift");
    giftRight.classList.add("show-gift");
  }, 3000);

  setTimeout(showLetterBalloons, 2000);
}

/* LETTER BALLOONS */
function showLetterBalloons() {
  const word = "HBDHANA".split("");
  let poppedCount = 0;

  word.forEach((letter, i) => {
    const holder = document.createElement("div");
    holder.className = "letter-holder";

    const letterEl = document.createElement("div");
    letterEl.className = "letter";
    letterEl.textContent = letter;
    letterEl.style.fontFamily = "'Monotype Corsiva', cursive, serif";

    const balloon = document.createElement("img");
    balloon.src = `b${(i % 7) + 1}.png`;
    balloon.className = "pop-balloon";

    balloon.onclick = () => {
      if (balloon.classList.contains("popped")) return;
      balloon.classList.add("popped");
      letterEl.style.opacity = 1;
      balloon.style.pointerEvents = "none";

      poppedCount++;
      if (poppedCount === word.length) {
        setTimeout(showLetterMessage, 2000);  // Delay 2 seconds after all popped
      }
    };

    holder.appendChild(letterEl);
    holder.appendChild(balloon);
    letterZone.appendChild(holder);
  });

  showPopHint();
}

/* POP BALLOONS HINT (POSITION FIXED LOWER) */
function showPopHint() {
  const hint = document.createElement("div");
  hint.textContent = "Pop the balloons";
  hint.style.position = "fixed";
  hint.style.top = "50vh"; // 👈 LOWER THAN HBDHANA
  hint.style.width = "100vw";
  hint.style.textAlign = "center";
  hint.style.fontSize = "2rem";
  hint.style.opacity = "0";
  hint.style.transition = "opacity 1s ease";
  hint.style.zIndex = "60";
  hint.style.color = "#000000ff";

  document.body.appendChild(hint);

  setTimeout(() => hint.style.opacity = "1", 3000);
  setTimeout(() => hint.style.opacity = "0", 4000);
  setTimeout(() => hint.remove(), 5000);
}

/* BULBS */
const bulbColors = [
  "bulb_blue.png",
  "bulb_green.png",
  "bulb_orange.png",
  "bulb_pink.png",
  "bulb_red.png",
  "bulb_yellow.png",
  "bulb_blue.png",
  "bulb_green.png",
  "bulb_orange.png"
];

bulbColors.forEach(src => {
  const img = document.createElement("img");
  img.src = src;
  img.className = "bulb";
  bulbsContainer.appendChild(img);
});

function blinkBulbs() {
  const bulbs = bulbsContainer.querySelectorAll(".bulb");
  let i = 0;

  setInterval(() => {
    bulbs.forEach((b, idx) => b.src = bulbColors[idx]);

    bulbs[i].src = "bulb.png";
    if (i + 4 < bulbs.length) bulbs[i + 4].src = "bulb.png";

    i = (i + 1) % bulbs.length;
  }, 300);
}

/* AFTER ALL BALLOONS POPPED - SHOW LETTER MESSAGE */
function showLetterMessage() {
  // Dark overlay
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.inset = 0;
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
  overlay.style.zIndex = "70";
  overlay.style.display = "flex";
  overlay.style.flexDirection = "column";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.color = "white";
  overlay.style.fontFamily = "'Poor Richard', serif";
  overlay.style.padding = "20px";
  overlay.style.opacity = "0";
  overlay.style.transition = "opacity 1s ease";
  document.body.appendChild(overlay);

  // Fade in overlay
  setTimeout(() => {
    overlay.style.opacity = "1";
  }, 100); // small delay for smooth fade

  // Message text
  const message = document.createElement("div");
  message.textContent = "Hey look someone sent you a letter";
  message.style.fontFamily = "'Courgette', cursive";
  message.style.fontSize = "2rem";
  message.style.marginBottom = "20px";
  message.style.opacity = "0";
  message.style.transition = "opacity 1s ease";
  overlay.appendChild(message);

  // Letter image
  const letterImg = document.createElement("img");
  letterImg.src = "letter.png";
  letterImg.style.width = "150px";
  letterImg.style.cursor = "pointer";
  letterImg.style.marginBottom = "20px";
  letterImg.style.opacity = "0";
  letterImg.style.transition = "opacity 1s ease";
  overlay.appendChild(letterImg);

  // Click letter message
  const clickMsg = document.createElement("div");
  clickMsg.textContent = "Click letter to open message";
  clickMsg.style.fontSize = "1.4rem";
  clickMsg.style.opacity = "0";
  clickMsg.style.transition = "opacity 1s ease";
  overlay.appendChild(clickMsg);

  // Close letter button
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Close Letter";
  closeBtn.style.fontSize = "1.1rem";
  closeBtn.style.padding = "8px 14px";
  closeBtn.style.marginTop = "20px";
  closeBtn.style.cursor = "pointer";
  closeBtn.style.borderRadius = "6px";
  closeBtn.style.border = "none";
  closeBtn.style.backgroundColor = "black";
  closeBtn.style.color = "rgba(191, 245, 157, 0.95)";
  closeBtn.style.opacity = "0";
  closeBtn.style.transition = "opacity 1s ease";
  closeBtn.style.alignSelf = "center";
  closeBtn.style.display = "none"; // initially hidden
  overlay.appendChild(closeBtn);

  // Show the first message after 2 seconds
  setTimeout(() => {
    message.style.opacity = "1";
  }, 2000);

  // Show letter image and click message 2 seconds after message (4 seconds total)
  setTimeout(() => {
    letterImg.style.opacity = "1";
    clickMsg.style.opacity = "1";
  }, 4000);

  // Show close button after 3 seconds of letter showing (7 seconds total)
  setTimeout(() => {
    closeBtn.style.display = "block";
    setTimeout(() => closeBtn.style.opacity = "1", 50);
  }, 10000);

  // On letter click - show scrollable text message
  letterImg.onclick = () => {
    // Clear overlay content
    overlay.innerHTML = "";

    // Create scrollable container
    const scrollBox = document.createElement("div");
    scrollBox.style.backgroundColor = "rgba(191, 245, 157, 0.95)";
    scrollBox.style.color = "#000";
    scrollBox.style.padding = "20px";
    scrollBox.style.borderRadius = "8px";
    scrollBox.style.width = "50vw";  // Narrower width
    scrollBox.style.height = "60vh";
    scrollBox.style.overflowY = "auto";
    scrollBox.style.fontSize = "1.3rem";
    scrollBox.style.lineHeight = "1.5";
    scrollBox.style.fontFamily = "'Poor Richard', serif";
    scrollBox.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
    overlay.style.justifyContent = "flex-start";
    overlay.style.alignItems = "center";
    overlay.style.paddingTop = "40px";

    // Add message text
    scrollBox.innerText = `Hi Hana,

Today feels like any other day, yet it carries something different — a quiet magic that belongs just to you.

Another year has passed, almost without notice, yet this day reminds us of how much growth, change, and beauty a single year can hold.

I hope you know how truly special you are, not just today, but every day. You’ve touched my life in ways I don’t always say, and I’m grateful for every moment we’ve shared.

May this year bring you peace in your heart, courage in your steps, and endless reasons to smile — your beautiful smile that lights up everything around you.

Let your spirit fly high, unburdened and free,
for every day holds new chances and endless possibilities.

The night may stretch its shadow, but dawn will always break,
and with it comes the courage to hold on, to wait.

And just in case you ever forget, always remember:
You matter, You’re special, You’re worthy, You’re awesome, You’re talented, You’re strong, You’re kind, You’re loved, You are enough.

Lastly...
I’d like to wish you one more time
Happy Birthday, Hana.

Thank you for being you.

—Ahamed Asri`;

    overlay.appendChild(scrollBox);

    // Append close button to scroll view too
    overlay.appendChild(closeBtn);
  };

  // Close button closes the overlay and resets UI
  closeBtn.onclick = () => {
    overlay.remove();
    // Optional: you can reset or show something here if needed
  };
}

