import kplay from "../kaplayCtx";

export default function gameover(citySfx) {
  citySfx.paused = true;
  let bestScore = kplay.getData("best-score");
  const currentScore = kplay.getData("current-score");

  const rankGrades = ["F", "E", "D", "C", "B", "A", "S"];
  const rankValues = [50, 80, 100, 200, 300, 400, 500];

  let currentRank = "F";
  let bestRank = "F";
  for (let i = 0; i < rankValues.length; i++) {
    if (rankValues[i] < currentScore) {
      currentRank = rankGrades[i];
    }

    if (rankValues[i] < bestScore) {
      bestRank = rankGrades[i];
    }
  }

  if (bestScore < currentScore) {
    kplay.setData("best-score", currentScore);
    bestScore = currentScore;
    bestRank = currentRank;
  }

  kplay.add([
    kplay.text("GAME OVER", { font: "mania", size: 96 }),
    kplay.anchor("center"),
    kplay.pos(kplay.center().x, kplay.center().y - 300),
  ]);
  kplay.add([
    kplay.text(`BEST SCORE : ${bestScore}`, {
      font: "mania",
      size: 64,
    }),
    kplay.anchor("center"),
    kplay.pos(kplay.center().x - 400, kplay.center().y - 200),
  ]);
  kplay.add([
    kplay.text(`CURRENT SCORE : ${currentScore}`, {
      font: "mania",
      size: 64,
    }),
    kplay.anchor("center"),
    kplay.pos(kplay.center().x + 400, kplay.center().y - 200),
  ]);

  const bestRankBox = kplay.add([
    kplay.rect(400, 400, { radius: 4 }),
    kplay.color(0, 0, 0),
    kplay.area(),
    kplay.anchor("center"),
    kplay.outline(6, kplay.Color.fromArray([255, 255, 255])),
    kplay.pos(kplay.center().x - 400, kplay.center().y + 50),
  ]);

  bestRankBox.add([
    kplay.text(bestRank, { font: "mania", size: 100 }),
    kplay.anchor("center"),
  ]);

  const currentRankBox = kplay.add([
    kplay.rect(400, 400, { radius: 4 }),
    kplay.color(0, 0, 0),
    kplay.area(),
    kplay.anchor("center"),
    kplay.outline(6, kplay.Color.fromArray([255, 255, 255])),
    kplay.pos(kplay.center().x + 400, kplay.center().y + 50),
  ]);

  currentRankBox.add([
    kplay.text(currentRank, { font: "mania", size: 100 }),
    kplay.anchor("center"),
  ]);

  kplay.wait(1, () => {
    kplay.add([
      kplay.text("Press Space/Click/Touch to Play Again", {
        font: "mania",
        size: 64,
      }),
      kplay.anchor("center"),
      kplay.pos(kplay.center().x, kplay.center().y + 350),
    ]);
    kplay.onButtonPress("jump", () => kplay.go("game"));
  });
}
