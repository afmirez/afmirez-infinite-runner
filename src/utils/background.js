import kplay from "../kaplayCtx";
import { Sprites } from "../constans";

const backgroundPieceWidth = 1920;
const backgroundPieceScale = 1.2;
const platformPieceWidth = 1280;
const platformPieceScale = 4;
const platformYposition = 450;

export function generateScenePieces() {
  const backgroundPieces = [
    kplay.add(
      [
        kplay.sprite(Sprites.CR_BACKGROUND),
        kplay.pos(0, 0),
        kplay.scale(backgroundPieceScale),
      ],
      kplay.opacity(1)
    ),
    kplay.add(
      [
        kplay.sprite(Sprites.CR_BACKGROUND),
        kplay.pos(backgroundPieceWidth * backgroundPieceScale, 0),
        kplay.scale(backgroundPieceScale),
      ],
      kplay.opacity(1)
    ),
  ];

  const platforms = [
    kplay.add([
      kplay.sprite(Sprites.PLATFORMS),
      kplay.pos(0, platformYposition),
      kplay.scale(platformPieceScale),
    ]),
    kplay.add([
      kplay.sprite(Sprites.PLATFORMS),
      kplay.pos(platformPieceWidth * platformPieceScale, platformYposition),
      kplay.scale(platformPieceScale),
    ]),
  ];

  return { backgroundPieces, platforms };
}

export function backgroundLoop(backgroundPieces, platforms, canJump = false) {
  if (backgroundPieces[1].pos.x < 0) {
    backgroundPieces[0].moveTo(
      backgroundPieces[1].pos.x + backgroundPieceWidth * backgroundPieceScale,
      0
    );
    backgroundPieces.push(backgroundPieces.shift());
  }

  backgroundPieces[0].move(-100, 0);
  backgroundPieces[1].moveTo(
    backgroundPieces[0].pos.x + backgroundPieceWidth * backgroundPieceScale,
    0
  );

  if (platforms[1].pos.x < 0) {
    platforms[0].moveTo(
      platforms[1].pos.x + platformPieceWidth * platformPieceScale,
      platformYposition
    );
    platforms.push(platforms.shift());
  }

  platforms[0].move(-1000, 0);
  platforms[1].moveTo(
    platforms[0].pos.x + platformPieceWidth * platformPieceScale,
    platformYposition
  );
}
