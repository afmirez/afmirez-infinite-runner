import kplay from "../kaplayCtx";

export function makeRing(pos) {
  return kplay.add([
    kplay.sprite("ring", { anim: "spin" }),
    kplay.area(),
    kplay.scale(4),
    kplay.anchor("center"),
    kplay.pos(pos),
    kplay.offscreen(),
    "ring",
  ]);
}
