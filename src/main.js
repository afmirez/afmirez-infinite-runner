import kplay from "./kaplayCtx";
import { Sprites, Sounds, Fonts, Scenes } from "./constans";
import mainMenu from "./scenes/mainMenu";
import game from "./scenes/game";
import gameover from "./scenes/gameover";

/* 
  Sprites : https://kaplayjs.com/docs/api/ctx/loadSprite/?preview=SpriteAnims
*/
kplay.loadSprite(Sprites.CR_BACKGROUND, "graphics/costa-rica-background.png");
kplay.loadSprite(Sprites.PLATFORMS, "graphics/platforms.png");
kplay.loadSprite(Sprites.AFMIREZ, "graphics/afmirez-run.png", {
  sliceX: 6,
  sliceY: 2,
  anims: {
    run: { from: 0, to: 5, loop: true, speed: 13 },
    jump: { from: 6, to: 7, loop: true, speed: 2 },
  },
});
kplay.loadSprite(Sprites.RING, "graphics/ring.png", {
  sliceX: 16,
  sliceY: 1,
  anims: {
    spin: { from: 0, to: 15, loop: true, speed: 30 },
  },
});
kplay.loadSprite(Sprites.RECRUITER, "graphics/zombie-recruiter.png", {
  sliceX: 3,
  sliceY: 1,
  anims: {
    run: { from: 0, to: 2, loop: true, speed: 10 },
  },
});
kplay.loadSprite(Sprites.PIZZA, "graphics/zombie-pizza.png", {
  sliceX: 3,
  sliceY: 1,
  anims: {
    run: { from: 0, to: 2, loop: true, speed: 10 },
  },
});
kplay.loadSprite(Sprites.BUILDING, "graphics/zombie-building.png", {
  sliceX: 3,
  sliceY: 1,
  anims: {
    run: { from: 0, to: 2, loop: true, speed: 10 },
  },
});

/* 
  Font : https://kaplayjs.com/docs/api/ctx/loadFont/
*/
kplay.loadFont(Fonts.MANIA, "fonts/mania.ttf");

/* 
  Sounds : https://kaplayjs.com/docs/api/ctx/loadSound/
*/
kplay.loadSound(Sounds.DESTROY, "sounds/Destroy.wav");
kplay.loadSound(Sounds.HURT, "sounds/Hurt.wav");
kplay.loadSound(Sounds.HYPER_RING, "sounds/HyperRing.wav");
kplay.loadSound(Sounds.JUMP, "sounds/Jump.wav");
kplay.loadSound(Sounds.RING, "sounds/Ring.wav");
kplay.loadSound(Sounds.CITY, "sounds/city.mp3");

/* 
  Scenes : https://kaplayjs.com/docs/guides/scenes/
           https://kaplayjs.com/docs/api/ctx/scene/
*/
kplay.scene(Scenes.MAIN_MENU, mainMenu);
kplay.scene(Scenes.GAME, game);
kplay.scene(Scenes.GAMEOVER, gameover);
kplay.go(Scenes.MAIN_MENU);
