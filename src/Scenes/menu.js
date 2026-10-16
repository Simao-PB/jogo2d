
import './menu.css';
import { MainMenu } from '../Scripts/MainMenu.js';
import { SceneManager } from '../Scripts/SceneManager.js';

const menu = new MainMenu();
menu.levelToLoad = 'nivel1';

document.querySelector('#btnPlay').addEventListener('click', () => menu.newGame());

document.querySelector('#btnCredits').addEventListener('click', () => SceneManager.loadScene('creditos'));

document.querySelector('#btnQuit').addEventListener('click', () => menu.quitGame());
