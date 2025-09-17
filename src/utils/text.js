import kplay from "../kaplayCtx";
import { Fonts } from "../constans";

export function generateText(
  message,
  size,
  color,
  position,
  anchor = "center"
) {
  kplay.add([
    kplay.text(message, {
      font: Fonts.MANIA,
      size: size,
    }),
    kplay.color(color),
    kplay.pos(position.x, position.y),
    kplay.anchor(anchor),
  ]);
}
