import kplay from "../kaplayCtx";
import { Fonts } from "../constans";

export function generateText(
  message,
  size,
  color,
  position,
  anchor = "center",
  width = null,
  align = null
) {
  return kplay.add([
    kplay.text(message, {
      font: Fonts.MANIA,
      size: size,
      width: width,
      align: align,
    }),
    kplay.color(color),
    kplay.pos(position.x, position.y),
    kplay.anchor(anchor),
  ]);
}
