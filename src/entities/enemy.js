import kplay from "../kaplayCtx";

export function makeEnemy(spriteName, pos) {
  return kplay.add([
    kplay.sprite(spriteName, { anim: "run" }),
    kplay.area({ shape: new kplay.Rect(kplay.vec2(-5, 0), 32, 32) }),
    kplay.scale(2),
    kplay.anchor("center"),
    kplay.pos(pos),
    kplay.offscreen(),
    "enemy",
    {
      enemyType: spriteName,
    },
  ]);
}
