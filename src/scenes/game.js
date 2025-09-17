import kplay from "../kaplayCtx";
import { makeAfmirez } from "../entities/afmirez";
import { makeRing } from "../entities/ring";
import { Sounds } from "../constans/sounds";
import { GameSpeed, updateSceneConfig, updateGameSpeed } from "../gameCtx";
import { backgroundLoop, generateScenePieces } from "../utils/background";
import { generateText } from "../utils/text";
import { makeEnemy } from "../entities/enemy";
import { EnemySprites } from "../constans";

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

  const scoreText = generateText(
    "SCORE : 0",
    72,
    [255, 217, 61],
    {
      x: 20,
      y: 50,
    },
    "left"
  );

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

  afmirez.onCollide("enemy", (enemy) => {
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

  // let gameSpeed = 300;
  updateGameSpeed(300);

  const spawnEnemy = () => {
    const spriteName =
      EnemySprites[Math.floor(kplay.rand(0, EnemySprites.length))];

    const enemy = makeEnemy(spriteName, kplay.vec2(1950, 725));
    enemy.onUpdate(() => {
      if (GameSpeed < 3000) {
        enemy.move(-(GameSpeed + 300), 0);
        return;
      }

      enemy.move(-GameSpeed, 0);
    });

    enemy.onExitScreen(() => {
      if (enemy.pos.x < 0) kplay.destroy(enemy);
    });
    const waitTime = kplay.rand(0.5, 2.5);
    kplay.wait(waitTime, spawnEnemy);
  };

  spawnEnemy();

  const spawnRing = () => {
    const ring = makeRing(kplay.vec2(1950, 745));
    ring.onUpdate(() => {
      ring.move(-GameSpeed, 0);
    });
    ring.onExitScreen(() => {
      if (ring.pos.x < 0) kplay.destroy(ring);
    });

    const waitTime = kplay.rand(0.5, 3);

    kplay.wait(waitTime, spawnRing);
  };

  spawnRing();

  kplay.loop(1, () => {
    updateGameSpeed(GameSpeed + 50);
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
