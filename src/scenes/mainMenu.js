import kplay from "../kaplayCtx";
import { Sprites } from "../constans/sprites";
import { Fonts } from "../constans/fonts";
import { makeAfmirez } from "../entities/afmirez";
import { generateBackgroundPieces } from "../utils/background";

export default function mainMenu() {
  if (!kplay.getData("best-score")) kplay.setData("best-score", 0);

  kplay.onButtonPress("jump", () => kplay.go("game"));

  const { backgroundPieces, platforms } = generateBackgroundPieces();

  kplay.add([
    kplay.text("AFMIREZ: The Job-apocalypse", {
      font: Fonts.MANIA,
      size: 86,
    }),
    kplay.color([255, 217, 61]),
    kplay.pos(kplay.center().x, 400),
    kplay.anchor("center"),
  ]);

  kplay.add([
    kplay.text("Press Space/Click/Touch to Play", {
      font: Fonts.MANIA,
      size: 42,
    }),
    kplay.color([255, 217, 61]),
    kplay.anchor("center"),
    kplay.pos(kplay.center().x, kplay.center().y - 40),
  ]);

  makeAfmirez(kplay.vec2(200, 745));

  let bgPieceWidth = 1280;

  kplay.onUpdate(() => {
    if (backgroundPieces[1].pos.x < 0) {
      backgroundPieces[0].moveTo(
        backgroundPieces[1].pos.x + bgPieceWidth * 1.2,
        0
      );
      backgroundPieces.push(backgroundPieces.shift());
    }

    backgroundPieces[0].move(-100, 0);
    backgroundPieces[1].moveTo(
      backgroundPieces[0].pos.x + bgPieceWidth * 1.2,
      0
    );

    if (platforms[1].pos.x < 0) {
      platforms[0].moveTo(platforms[1].pos.x + platforms[1].width * 4, 450);
      platforms.push(platforms.shift());
    }

    platforms[0].move(-1000, 0);
    platforms[1].moveTo(platforms[0].pos.x + platforms[1].width * 4, 450);
  });
}
