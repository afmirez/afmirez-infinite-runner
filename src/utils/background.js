import kplay from "../kaplayCtx";
import { Sprites } from "../constans";

export function generateBackgroundPieces() {
  const backgroundPieceWidth = 1920;
  const platformPieceWidth = 1280;

  const backgroundPieces = [
    kplay.add(
      [kplay.sprite(Sprites.CR_BACKGROUND), kplay.pos(0, 0), kplay.scale(1.2)],
      kplay.opacity(1)
    ),
    kplay.add(
      [
        kplay.sprite(Sprites.CR_BACKGROUND),
        kplay.pos(backgroundPieceWidth * 1.2, 0),
        kplay.scale(1.2),
      ],
      kplay.opacity(1)
    ),
  ];

  const platforms = [
    kplay.add([
      kplay.sprite(Sprites.PLATFORMS),
      kplay.pos(0, 450),
      kplay.scale(4),
    ]),
    kplay.add([
      kplay.sprite(Sprites.PLATFORMS),
      kplay.pos(platformPieceWidth * 4, 450),
      kplay.scale(4),
    ]),
  ];

  return { backgroundPieces, platforms };
}
