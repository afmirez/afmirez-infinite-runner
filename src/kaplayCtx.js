import kaplay from "kaplay";

// https://kaplayjs.com/docs/api/kaplay/?preview=KAPLAYOpt

const kplay = kaplay({
  width: 1920,
  height: 1080,
  letterbox: true,
  background: [0, 0, 0],
  global: true,
  touchToMouse: true,
  buttons: {
    jump: {
      keyboard: ["space"],
      mouse: "left",
    },
  },
  debugKey: "d",
  debug: true,
});

export default kplay;
