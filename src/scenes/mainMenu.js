import kplay from "../kaplayCtx";
import { makeAfmirez } from "../entities/afmirez";
import { backgroundLoop, generateScenePieces } from "../utils/background";
import { generateText } from "../utils/text";
import { Colors } from "../constans";

export default function mainMenu() {
  if (!kplay.getData("best-score")) kplay.setData("best-score", 0);

  kplay.onButtonPress("jump", () => kplay.go("game"));

  const { backgroundPieces, platforms } = generateScenePieces();

  generateText("AFMIREZ: The Job-apocalypse", 86, Colors.YELLOW, {
    x: kplay.center().x,
    y: 400,
  });

  generateText("Press Space/Click/Touch to Play", 42, Colors.RED, {
    x: kplay.center().x,
    y: kplay.center().y - 40,
  });

  makeAfmirez(kplay.vec2(200, 745));

  kplay.onUpdate(() => {
    backgroundLoop(backgroundPieces, platforms);
  });
}
