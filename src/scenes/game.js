import kplay from "../kaplayCtx";
import { makeAfmirez } from "../entities/afmirez";
import { makeRing } from "../entities/ring";
import { Sounds } from "../constans/sounds";
import { Fonts } from "../constans/fonts";
import { makeRecruiterZombie } from "../entities/recruiter";
import { Sprites } from "../constans/sprites";

export default function game() {
  kplay.setGravity(3100);
  const citySfx = kplay.play(Sounds.CITY, { volume: 0.2, loop: true });

  const bgPieceWidth = 1920;

  const backgroundPieces = [
    // ver si hay que cambiar el scale
    kplay.add(
      [kplay.sprite(Sprites.CR_BACKGROUND), kplay.pos(0, 0), kplay.scale(1.5)],
      kplay.opacity(1)
    ),
    kplay.add(
      [
        kplay.sprite(Sprites.CR_BACKGROUND),
        kplay.pos(bgPieceWidth * 1.2, 0),
        kplay.scale(1.5),
      ],
      kplay.opacity(1)
    ),
  ];

  const plaformWidth = 1280;
  const platforms = [
    kplay.add([
      kplay.sprite(Sprites.PLATFORMS),
      kplay.pos(0, 415),
      kplay.scale(4.2),
    ]),
    kplay.add([
      kplay.sprite(Sprites.PLATFORMS),
      kplay.pos(0, 415),
      kplay.scale(4.2),
    ]),
  ];

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

    kplay.play(Sounds.HURT, { volume: 0.5 });
    kplay.setData("current-score", score);
    kplay.go("gameover", citySfx);
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

    if (backgroundPieces[1].pos.x < 0) {
      backgroundPieces[0].moveTo(
        backgroundPieces[1].pos.x + bgPieceWidth * 1.5,
        0
      );
      backgroundPieces.push(backgroundPieces.shift());
    }

    backgroundPieces[0].move(-100, 0);
    backgroundPieces[1].moveTo(
      backgroundPieces[0].pos.x + bgPieceWidth * 1.5,
      0
    );

    // for jump effect
    backgroundPieces[0].moveTo(
      backgroundPieces[0].pos.x,
      -afmirez.pos.y / 10 - 50
    );
    backgroundPieces[1].moveTo(
      backgroundPieces[1].pos.x,
      -afmirez.pos.y / 10 - 50
    );

    if (platforms[1].pos.x < 0) {
      platforms[0].moveTo(platforms[1].pos.x + plaformWidth * 4, 415);
      platforms.push(platforms.shift());
    }

    platforms[0].move(-gameSpeed, 0);
    platforms[1].moveTo(platforms[0].pos.x + plaformWidth * 4, 415);
  });
}
