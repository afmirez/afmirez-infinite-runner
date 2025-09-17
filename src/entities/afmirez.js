import kplay from "../kaplayCtx";
import { Sprites } from "../constans/sprites";

export function makeAfmirez(pos) {
  const afmirez = kplay.add([
    kplay.sprite(Sprites.AFMIREZ, { anim: "run" }),
    kplay.scale(2),
    kplay.area(),
    kplay.anchor("center"),
    kplay.pos(pos),
    kplay.body({ jumpForce: 1700 }),
    {
      ringCollectUI: null,
      setControls() {
        kplay.onButtonPress("jump", () => {
          if (this.isGrounded()) {
            this.play("jump");
            this.jump();
            kplay.play("jump", { volume: 0.5 });
          }
        });
      },
      setEvents() {
        this.onGround(() => {
          this.play("run");
        });
      },
    },
  ]);

  afmirez.ringCollectUI = afmirez.add([
    kplay.text("", { font: "mania", size: 24 }),
    kplay.color(255, 255, 0),
    kplay.anchor("center"),
    kplay.pos(30, -10),
  ]);

  return afmirez;
}
