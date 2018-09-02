canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");
var newImgs = [];
var newImgsSymbols = [];
var newImgsStarsSymbols = [];
var gStarSymbols = [];
var arrowSpeed = 1;
var symbolsSpeed = 100;
var isArrowLoop = true;
var isSymbolsLoop = false;
var isButtonChange = true;
var buttonInterval = null;
var score = 3000000;
var scoreSpeed = 100;
var makeVictoryTimeOut = null;

var commaInteger = null;
var buttonSrc = "../../img/button-1.png";
if (!isSymbolsLoop) {
  canvas.addEventListener("click", startGame, false);
}

var gSymbols = [
  {
    name: "symbolWilka",
    id: 0,
    src: "../../img/symbols/symbolWilka.png",
    symbolPosX: 100,
    symbolPosY: 450
  },
  {
    name: "symbolBabcia",
    id: 1,
    src: "../../img/symbols/symbolBabcia.png",
    symbolPosX: 100,
    symbolPosY: 450
  },
  {
    name: "symbolBabcia",
    id: 2,
    src: "../../img/symbols/symbolBabcia.png",
    symbolPosX: 100,
    symbolPosY: 450
  },
  {
    name: "symbolScatter",
    id: 3,
    src: "../../img/symbols/symbolScatter.png",
    symbolPosX: 100,
    symbolPosY: 650
  },
  {
    name: "symbolSerce",
    id: 4,
    src: "../../img/symbols/symbolSerce.png",
    symbolPosX: 100,
    symbolPosY: 650
  },
  {
    name: "symbolWilka",
    id: 5,
    src: "../../img/symbols/symbolWilka.png",
    symbolPosX: 100,
    symbolPosY: 650
  },
  {
    name: "symbolChata",
    id: 6,
    src: "../../img/symbols/symbolChata.png",
    symbolPosX: 100,
    symbolPosY: 850
  },
  {
    name: "symbolWild",
    id: 7,
    src: "../../img/symbols/symbolWild.png",
    symbolPosX: 100,
    symbolPosY: 850
  },
  {
    name: "symbolChata",
    id: 8,
    src: "../../img/symbols/symbolChata.png",
    symbolPosX: 100,
    symbolPosY: 850
  }
];

var gVictorySymbols = [
  {
    name: "symbolWild",
    id: 0,
    src: "../../img/symbols/symbolWild.png",
    symbolPosX: 100,
    symbolPosY: 450
  },
  {
    name: "symbolBabcia",
    id: 1,
    src: "../../img/symbols/symbolBabcia.png",
    symbolPosX: 100,
    symbolPosY: 450
  },
  {
    name: "symbolWild",
    id: 2,
    src: "../../img/symbols/symbolWild.png",
    symbolPosX: 100,
    symbolPosY: 450
  },
  {
    name: "symbolScatter",
    id: 3,
    src: "../../img/symbols/symbolScatter.png",
    symbolPosX: 100,
    symbolPosY: 650
  },
  {
    name: "symbolSerce",
    id: 4,
    src: "../../img/symbols/symbolSerce.png",
    symbolPosX: 100,
    symbolPosY: 650
  },
  {
    name: "symbolWilka",
    id: 5,
    src: "../../img/symbols/symbolWilka.png",
    symbolPosX: 100,
    symbolPosY: 650
  },
  {
    name: "symbolChata",
    id: 6,
    src: "../../img/symbols/symbolChata.png",
    symbolPosX: 100,
    symbolPosY: 850
  },
  {
    name: "symbolWild",
    id: 7,
    src: "../../img/symbols/symbolWild.png",
    symbolPosX: 100,
    symbolPosY: 850
  },
  {
    name: "symbolChata",
    id: 8,
    src: "../../img/symbols/symbolChata.png",
    symbolPosX: 100,
    symbolPosY: 850
  }
];

var gImages = [
  {
    name: "bg",
    id: 0,
    src: "../../img/bg.png",
    width: 60,
    height: 40,
    posX: 0,
    posY: 0
  },
  {
    name: "board",
    id: 1,
    src: "../../img/board.png",
    width: 650,
    height: 650,
    posX: 30,
    posY: 400
  },
  {
    name: "redHood",
    id: 2,
    src: "../../img/red-hood.png",
    width: 1900,
    height: 1150,
    posX: -360,
    posY: 250
  },
  {
    name: "frontTrees",
    id: 3,
    src: "../../img/front-trees.png",
    width: 1500,
    height: 1750,
    posX: -380,
    posY: -200
  },
  {
    name: "button1",
    id: 4,
    src: buttonSrc,
    width: 500,
    height: 130,
    posX: 100,
    posY: 1060
  },

  {
    name: "arrow",
    id: 5,
    src: "../../img/arr.png",
    width: 180,
    height: 150,
    posX: 250,
    posY: 850
  },
  {
    name: "hand",
    id: 6,
    src: "../../img/hand.png",
    width: 200,
    height: 200,
    posX: 290,
    posY: 1100
  },
  {
    name: "huuugeLogo",
    id: 7,
    src: "../../img/huuuge-logo.png",
    width: 100,
    height: 80,
    posX: 20,
    posY: 40
  },
  {
    name: "logo",
    id: 8,
    src: "../../img/logo.png",
    width: 400,
    height: 150,
    posX: 150,
    posY: 100
  }
];

function init() {
  increaseScore(score);
  drawImage();
  if (isArrowLoop) {
    requestAnimationFrame(arrowloop);
  }
  if (isButtonChange) {
    changeButton();
  }
}

function drawImage() {
  gImages.forEach(img => {
    let newImg = new Image(img.width, img.height);
    newImg.src = img.src;
    newImg.posX = img.posX;
    newImg.posY = img.posY;
    newImg.name = img.name;
    newImg.id = img.id;

    newImgs.push(newImg);
  });

  newImgs.forEach(newImg => {
    newImg.onload = drawImageActualSize;
  });

  gSymbols.forEach(symbol => {
    let newImgSymbol = new Image(150, 150);
    newImgSymbol.src = symbol.src;
    newImgSymbol.id = symbol.id;
    newImgSymbol.symbolPosX = symbol.symbolPosX;
    newImgSymbol.symbolPosY = symbol.symbolPosY;

    newImgsSymbols.push(newImgSymbol);
  });

  newImgsSymbols.forEach(newImgSymbol => {
    newImgSymbol.onload = drawImageActualSize;
  });

  newImgsStarsSymbols.forEach(newImgStarSymbol => {
    newImgStarSymbol.onload = drawImageActualSize;
  });
}

function drawImageActualSize() {
  canvas.width = newImgs[0].naturalWidth;
  canvas.height = newImgs[0].naturalHeight;
  context.drawImage(newImgs[0], 0, 0);
  context.drawImage(
    newImgs[1],
    newImgs[1].posX,
    newImgs[1].posY,
    newImgs[1].width,
    newImgs[1].height
  );
  newImgsSymbols.forEach(newImgSymbol => {
    if (newImgSymbol.id <= 2) {
      newImgSymbol.symbolPosX = 40 + newImgSymbol.id * 230;
      newImgSymbol.symbolPosY = newImgSymbol.symbolPosY;
    } else if (newImgSymbol.id > 2 && newImgSymbol.id <= 5) {
      newImgSymbol.symbolPosX = 40 + (newImgSymbol.id % 3) * 230;
      newImgSymbol.symbolPosY = newImgSymbol.symbolPosY;
    } else if (newImgSymbol.id > 5 && newImgSymbol.id <= 8) {
      newImgSymbol.symbolPosX = 40 + (newImgSymbol.id % 3) * 230;
      newImgSymbol.symbolPosY = newImgSymbol.symbolPosY;
    }

    context.drawImage(
      newImgSymbol,
      newImgSymbol.symbolPosX,
      newImgSymbol.symbolPosY,
      newImgSymbol.width,
      newImgSymbol.height
    );
  });

  newImgs.forEach(newImg => {
    if (newImg.id !== "1" && newImg.id !== "5") {
      context.drawImage(
        newImg,
        newImg.posX,
        newImg.posY,
        newImg.width,
        newImg.height
      );
    }
  });

  newImgsStarsSymbols.forEach(newImgStarSymbol => {
    context.drawImage(
      newImgStarSymbol,
      newImgStarSymbol.symbolPosX,
      newImgStarSymbol.symbolPosY,
      newImgStarSymbol.width,
      newImgStarSymbol.height
    );
  });

  context.font = "bold 60pt ariel";
  context.fillStyle = "orange";
  context.fillText(commaInteger, 200, 350);
}

function arrowloop() {
  moveArrow();
  drawImageActualSize();

  context.drawImage(
    newImgs[5],
    gImages[5].posX,
    gImages[5].posY,
    gImages[5].width,
    gImages[5].height
  );

  if (isArrowLoop) {
    requestAnimationFrame(arrowloop);
  }
}

function moveArrow() {
  if (gImages[5].posY < 900 && gImages[5].posY > 850) {
    gImages[5].posY += arrowSpeed;
  } else {
    if (gImages[5].posY === 900) {
      arrowSpeed = arrowSpeed * -1;
      gImages[5].posY -= 5;
    } else {
      arrowSpeed = arrowSpeed * -1;
      gImages[5].posY += 5;
    }
  }
}

function startGame(e) {
  let rect = this.getBoundingClientRect(),
    x = e.clientX - rect.left,
    y = e.clientY - rect.top;

  if (
    x >= 80 &&
    x <= 50 + gImages[4].width &&
    y >= 500 &&
    y <= 550 + gImages[4].height
  ) {
    isSymbolsLoop = true;
    isArrowLoop = false;
    let filterImgs = gImages.filter(gImg => {
      return gImg.id !== "2" && gImg.id !== "5" && gImg.id !== "6";
    });
    gImages = [];

    filterImgs.forEach((filerImg, idx) => {
      gImages.push(filerImg);
    });

    let filterNewImgs = newImgs.filter(newImg => {
      return newImg.id !== "2" && newImg.id !== "5" && newImg.id !== "6";
    });
    newImgs = [];

    filterNewImgs.forEach((filerImg, idx) => {
      newImgs.push(filerImg);
    });
    drawImageActualSize();

    if (isSymbolsLoop) {
      isButtonChange = false;
      requestAnimationFrame(symbolsLoop);
      clearInterval(buttonInterval);
    }
  }
  makeVictoryTimeOut = setTimeout(function() {
    makeVictory();
  }, 2000);
}

function symbolsLoop() {
  moveSymbols();
  drawImageActualSize();
  newImgsSymbols.forEach(newImgSymbol => {
    context.drawImage(
      newImgSymbol,
      newImgSymbol.symbolPosX,
      newImgSymbol.symbolPosY,
      newImgSymbol.width,
      newImgSymbol.height
    );
  });
  if (isSymbolsLoop) {
    requestAnimationFrame(symbolsLoop);
  }
}

function moveSymbols() {
  let posHigh = 450;
  let posLow = 850;
  isButtonChange = false;
  if (isSymbolsLoop) {
    newImgsSymbols.forEach(newImgsSymbol => {
      if (
        newImgsSymbol.symbolPosY >= posHigh &&
        newImgsSymbol.symbolPosY < posLow
      ) {
        newImgsSymbol.symbolPosY += symbolsSpeed;
      } else if (
        newImgsSymbol.symbolPosY === posLow ||
        newImgsSymbol.symbolPosY > posLow
      ) {
        newImgsSymbol.symbolPosY = posHigh;
      }
    });
  }
}

function makeVictory() {
  clearTimeout(makeVictoryTimeOut);
  scoreSpeed = 2000;
  gVictorySymbols.forEach((victorySymbol, idx) => {
    let newImgSymbol = new Image(150, 150);
    newImgSymbol.src = victorySymbol.src;
    newImgSymbol.id = victorySymbol.id;
    newImgSymbol.symbolPosX = victorySymbol.symbolPosX;
    newImgSymbol.symbolPosY = victorySymbol.symbolPosY;

    newImgsSymbols.splice(idx, 1, newImgSymbol);
  });
  newImgsSymbols.forEach(newImgSymbol => {
    context.drawImage(
      newImgSymbol,
      newImgSymbol.symbolPosX,
      newImgSymbol.symbolPosY,
      newImgSymbol.width,
      newImgSymbol.height
    );
  });
  isSymbolsLoop = false;

  gStarSymbols = [
    {
      name: "stars",
      id: 0,
      src: "../../img/stars.png",
      symbolPosX: 0,
      symbolPosY: 380
    },
    {
      name: "stars",
      id: 1,
      src: "../../img/stars.png",
      symbolPosX: 460,
      symbolPosY: 380
    },
    {
      name: "stars",
      id: 2,
      src: "../../img/stars.png",
      symbolPosX: 230,
      symbolPosY: 780
    }
  ];

  gStarSymbols.forEach(starSymbol => {
    let newImgStarSymbol = new Image(230, 250);

    newImgStarSymbol.src = starSymbol.src;
    newImgStarSymbol.id = starSymbol.id;
    newImgStarSymbol.symbolPosX = starSymbol.symbolPosX;
    newImgStarSymbol.symbolPosY = starSymbol.symbolPosY;

    newImgsStarsSymbols.push(newImgStarSymbol);
  });

  drawImageActualSize();
  setTimeout(() => {
    reStart();
  }, 3000);
}

function changeButton() {
  buttonInterval = setInterval(function() {
    buttonSrc = "../../img/button-2.png";

    newImgs.forEach(newImg => {
      if (newImg.id === "4") {
        newImg.src = buttonSrc;
        context.drawImage(
          newImg,
          newImg.posX,
          newImg.posY,
          newImg.width,
          newImg.height
        );
      }
    });

    drawImageActualSize();
    setTimeout(function() {
      buttonSrc = "../../img/button-1.png";
      newImgs.forEach(newImg => {
        if (newImg.id === "4") {
          newImg.src = buttonSrc;
          context.drawImage(
            newImg,
            newImg.posX,
            newImg.posY,
            newImg.width,
            newImg.height
          );
        }
      });
    }, 250);
  }, 500);
}

function numberWithCommas(x) {
  x = x.toString();
  let pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
  return x;
}

function increaseScore(score) {
  let scoreInterval = setInterval(function() {
    commaInteger = numberWithCommas(score);

    drawImageActualSize();

    score += scoreSpeed;
  }, 0.00001);
  scoreInterval;
}

function reStart() {
  changeButton();
  gStarSymbols = [];
  newImgsStarsSymbols = [];
  scoreSpeed = 100;
}
