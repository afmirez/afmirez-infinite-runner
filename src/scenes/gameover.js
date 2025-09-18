import kplay from "../kaplayCtx";
import { generateText } from "../utils/text";
import { Scenes, Colors, Sprites } from "../constans";

const enemyGameOverMsg = {
  [Sprites.RECRUITER]:
    "The recruiter zombie caught you! Now you’re stuck in an endless loop of interviews… with no final round in sight.",
  [Sprites.PIZZA]:
    "The pizza zombie got you! Welcome to infinite slices of ‘team spirit’ pizza parties.",
  [Sprites.BUILDING]:
    "The office zombie swallowed you whole! Say hello again to long commutes and office cubicles",
};

export default function gameover(gameoverCtx) {
  gameoverCtx.citySfx.paused = true;

  let bestScore = kplay.getData("best-score");
  const currentScore = kplay.getData("current-score");

  if (bestScore < currentScore) {
    kplay.setData("best-score", currentScore);
  }

  generateText("GAME OVER", 96, Colors.RED, {
    x: kplay.center().x,
    y: kplay.center().y - 300,
  });

  generateText(
    enemyGameOverMsg[gameoverCtx.enemy],
    64,
    Colors.RED,
    {
      x: kplay.center().x,
      y: kplay.center().y - 150,
    },
    "center",
    1400,
    "center"
  );

  generateText(
    `BEST SCORE : ${bestScore}  CURRENT SCORE : ${currentScore}`,
    64,
    Colors.WHITE,
    {
      x: kplay.center().x,
      y: kplay.center().y + 50,
    }
  );

  kplay.wait(1, () => {
    generateText("Press Space/Click/Touch to Play Again", 64, Colors.YELLOW, {
      x: kplay.center().x,
      y: kplay.center().y + 200,
    });
    kplay.onButtonPress("jump", () => kplay.go(Scenes.GAME));
  });
}
