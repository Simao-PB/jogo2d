
import { SceneManager } from './SceneManager.js';

export class MainMenu {
  levelToLoad = 'nivel1';

  newGame() {
    localStorage.setItem('score', 0);
    SceneManager.loadScene(this.levelToLoad);
  }

  quitGame() {
    window.close();
    document.body.innerHTML = '<h1>Obrigado por jogar!</h1>';
  }
}
