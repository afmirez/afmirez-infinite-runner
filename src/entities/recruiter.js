import kplay from "../kaplayCtx";
import { Sprites } from "../constans/sprites";

export function makeRecruiterZombie(pos) {
  return kplay.add([
    kplay.sprite(Sprites.RECRUITER, { anim: "run" }),
    kplay.area({ shape: new kplay.Rect(kplay.vec2(-5, 0), 32, 32) }),
    kplay.scale(2),
    kplay.anchor("center"),
    kplay.pos(pos),
    kplay.offscreen(),
    "recruiter",
  ]);
}
