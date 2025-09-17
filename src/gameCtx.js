export let SceneConfig = {
  backgroundPieceWidth: 1920,
  backgroundPieceScale: 1.2,
  platformPieceWidth: 1280,
  platformPieceScale: 4,
  platformYposition: 450,
};

export let GameSpeed = -1000;

export function updateSceneConfig(newSceneConfig) {
  SceneConfig = { ...SceneConfig, ...newSceneConfig };
}

export function updateGameSpeed(newGameSpped) {
  GameSpeed = newGameSpped;
}
