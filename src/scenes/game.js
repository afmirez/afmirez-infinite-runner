import kplay from "../kaplayCtx";
import { makeAfmirez } from "../entities/afmirez";
import { makeRing } from "../entities/ring";
import { Sounds } from "../constans/sounds";
import { Fonts } from "../constans/fonts";
import { makeRecruiterZombie } from "../entities/recruiter";
import { Sprites } from "../constans/sprites";
import { updateSceneConfig } from "../gameCtx";
import { backgroundLoop, generateScenePieces } from "../utils/background";

export default function game() {
  kplay.setGravity(4600);

  const citySfx = kplay.play(Sounds.CITY, { volume: 0.2, loop: true });

  updateSceneConfig({
    backgroundPieceScale: 1.3,
    platformPieceScale: 4.2,
    platformYposition: 410,
  });

  const { backgroundPieces, platforms } = generateScenePieces();

  let score = 0;
  let scoreMultiplier = 0;

  const scoreText = kplay.add([
    kplay.text("SCORE : 0", { font: Fonts.MANIA, size: 72 }),
    kplay.pos(20, 20),
  ]);

  const afmirez = makeAfmirez(kplay.vec2(200, 750));
  afmirez.setControls();
  afmirez.setEvents();

  afmirez.onCollide("ring", (ring) => {
    kplay.play(Sounds.RING, { volume: 0.5 });
    kplay.destroy(ring);
    score++;
    scoreText.text = `SCORE : ${score}`;
    afmirez.ringCollectUI.text = "+1";
    kplay.wait(1, () => {
      afmirez.ringCollectUI.text = "";
    });
  });

  afmirez.onCollide("recruiter", (enemy) => {
    if (!afmirez.isGrounded()) {
      kplay.play(Sounds.DESTROY, { volume: 0.5 });
      kplay.play(Sounds.HYPER_RING, { volume: 0.5 });
      kplay.destroy(enemy);
      afmirez.play(Sounds.JUMP);
      afmirez.jump();
      scoreMultiplier += 1;
      score += 10 * scoreMultiplier;
      scoreText.text = `SCORE : ${score}`;
      if (scoreMultiplier === 1) {
        afmirez.ringCollectUI.text = `+${10 * scoreMultiplier}`;
      }
      if (scoreMultiplier > 1) {
        afmirez.ringCollectUI.text = `x${scoreMultiplier}`;
      }
      kplay.wait(1, () => {
        afmirez.ringCollectUI.text = "";
      });
      return;
    }

    // kplay.play(Sounds.HURT, { volume: 0.5 });
    // kplay.setData("current-score", score);
    // kplay.go("gameover", citySfx);
  });

  let gameSpeed = 300;

  const spawnRecruiterZombie = () => {
    const recruiter = makeRecruiterZombie(kplay.vec2(1950, 725));
    recruiter.onUpdate(() => {
      if (gameSpeed < 3000) {
        recruiter.move(-(gameSpeed + 300), 0);
        return;
      }

      recruiter.move(-gameSpeed, 0);
    });

    recruiter.onExitScreen(() => {
      if (recruiter.pos.x < 0) kplay.destroy(recruiter);
    });

    const waitTime = kplay.rand(0.5, 2.5);
    kplay.wait(waitTime, spawnRecruiterZombie);
  };

  spawnRecruiterZombie();

  const spawnRing = () => {
    const ring = makeRing(kplay.vec2(1950, 745));
    ring.onUpdate(() => {
      ring.move(-gameSpeed, 0);
    });
    ring.onExitScreen(() => {
      if (ring.pos.x < 0) kplay.destroy(ring);
    });

    const waitTime = kplay.rand(0.5, 3);

    kplay.wait(waitTime, spawnRing);
  };

  spawnRing();

  kplay.loop(1, () => {
    gameSpeed += 50;
  });

  kplay.add([
    kplay.rect(1920, 300),
    kplay.opacity(0),
    kplay.area(),
    kplay.pos(0, 832),
    kplay.body({ isStatic: true }),
  ]);

  kplay.onUpdate(() => {
    if (afmirez.isGrounded()) scoreMultiplier = 0;
    backgroundLoop(backgroundPieces, platforms, -afmirez.pos.y);
  });
}
