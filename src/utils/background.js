import kplay from "../kaplayCtx";
import { Sprites } from "../constans";
import { SceneConfig } from "../gameCtx";

export function generateScenePieces() {
  const backgroundPieces = [
    kplay.add(
      [
        kplay.sprite(Sprites.CR_BACKGROUND),
        kplay.pos(0, 0),
        kplay.scale(SceneConfig.backgroundPieceScale),
      ],
      kplay.opacity(1)
    ),
    kplay.add(
      [
        kplay.sprite(Sprites.CR_BACKGROUND),
        kplay.pos(
          SceneConfig.backgroundPieceWidth * SceneConfig.backgroundPieceScale,
          0
        ),
        kplay.scale(SceneConfig.backgroundPieceScale),
      ],
      kplay.opacity(1)
    ),
  ];

  const platforms = [
    kplay.add([
      kplay.sprite(Sprites.PLATFORMS),
      kplay.pos(0, SceneConfig.platformYposition),
      kplay.scale(SceneConfig.platformPieceScale),
    ]),
    kplay.add([
      kplay.sprite(Sprites.PLATFORMS),
      kplay.pos(
        SceneConfig.platformPieceWidth * SceneConfig.platformPieceScale,
        SceneConfig.platformYposition
      ),
      kplay.scale(SceneConfig.platformPieceScale),
    ]),
  ];

  return { backgroundPieces, platforms };
}

export function backgroundLoop(
  backgroundPieces,
  platforms,
  jumpYReference = null
) {
  if (backgroundPieces[1].pos.x < 0) {
    backgroundPieces[0].moveTo(
      backgroundPieces[1].pos.x +
        SceneConfig.backgroundPieceWidth * SceneConfig.backgroundPieceScale,
      0
    );
    backgroundPieces.push(backgroundPieces.shift());
  }

  backgroundPieces[0].move(-100, 0);
  backgroundPieces[1].moveTo(
    backgroundPieces[0].pos.x +
      SceneConfig.backgroundPieceWidth * SceneConfig.backgroundPieceScale,
    0
  );

  if (jumpYReference !== null) {
    backgroundPieces[0].moveTo(
      backgroundPieces[0].pos.x,
      jumpYReference / 10 - 10
    );
    backgroundPieces[1].moveTo(
      backgroundPieces[1].pos.x,
      jumpYReference / 10 - 10
    );
  }

  if (platforms[1].pos.x < 0) {
    platforms[0].moveTo(
      platforms[1].pos.x +
        SceneConfig.platformPieceWidth * SceneConfig.platformPieceScale,
      SceneConfig.platformYposition
    );
    platforms.push(platforms.shift());
  }

  platforms[0].move(-1000, 0);
  platforms[1].moveTo(
    platforms[0].pos.x +
      SceneConfig.platformPieceWidth * SceneConfig.platformPieceScale,
    SceneConfig.platformYposition
  );
}
