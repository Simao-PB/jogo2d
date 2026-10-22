
import * as THREE from 'three';
import RAPIER from '@dimforge/rapier2d-compat';
import GUI from 'lil-gui';

import { criarBackground } from '../Prefabs/background.js';
import { criarPlataforma } from '../Prefabs/plataforma.js';
import { criarSprite } from '../Materials/sprite.js';
import { createCoin } from '../Prefabs/coin.js';

import {
  adicionarRigidbody,
  adicionarBoxCollider,
  sincronizarFisica,
  tratarColisoes
} from '../Scripts/Fisica.js';

import { DebugFisica } from '../Scripts/DebugFisica.js';
import { Player } from '../Scripts/Player.js';
import { ScoreManager } from '../Scripts/ScoreManager.js';

import './hud.css';

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Camara
const TAMANHO_CAMERA = 5;
const camera = new THREE.OrthographicCamera();
camera.position.z = 10;

function ajustarEcra() {
  const aspeto = window.innerWidth / window.innerHeight;

  camera.left = -TAMANHO_CAMERA * aspeto;
  camera.right = TAMANHO_CAMERA * aspeto;
  camera.top = TAMANHO_CAMERA;
  camera.bottom = -TAMANHO_CAMERA;

  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

ajustarEcra();
window.addEventListener('resize', ajustarEcra);

// Cena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x314d79);

async function iniciarNivel() {

  // Inicializar a fisica
  await RAPIER.init();
  const fisica = new RAPIER.World({ x: 0, y: -9.81 });

  // Criar o mundo
  const mundo = new THREE.Group();
  mundo.name = 'World';
  scene.add(mundo);

  const coin1 = await createCoin(fisica, 1.2, -2.2);
  const coin2 = await createCoin(fisica, -5.5, 2.2);
  const coin3 = await createCoin(fisica, 5.5, 2.2);

  mundo.add(coin1, coin2, coin3);

  console.log('Moedas criadas:', coin1, coin2, coin3);

  // Background
  const bgFundos = await criarBackground(0, 0);
  bgFundos.name = 'Background';
  mundo.add(bgFundos);

  // Plataformas
  const chao = new THREE.Group();
  chao.name = 'Ground';
  mundo.add(chao);

  const plat1 = await criarPlataforma('Plat1', 0, -3.5);
  const plat2 = await criarPlataforma('Plat2', -5.5, 0.8);
  const plat3 = await criarPlataforma('Plat3', 5.5, 0.8);
  const plat4 = await criarPlataforma('Plat4', 0, 3.2);

  chao.add(plat1, plat2, plat3, plat4);

  // Adicionar colisores às plataformas
  for (const plataforma of chao.children) {
    adicionarBoxCollider(fisica, plataforma);
  }

  // Criar o jogador
  const player = await criarSprite('assets/Sprites/Player/Idle (1).png');

  player.name = 'Player';
  player.scale.set(0.5, 0.5, 1);
  player.position.set(0, 0, 2);

  scene.add(player);

  // Adicionar fisica ao jogador
  adicionarRigidbody(fisica, player);
  adicionarBoxCollider(fisica, player, 0.54, 0.83, -0.22, 0.02);

  // Mostrar os objetos da cena na consola
  function mostrarHierarquia(objeto, nivel = 0) {
    console.log(' '.repeat(nivel) + (objeto.name || objeto.type));

    for (const filho of objeto.children) {
      mostrarHierarquia(filho, nivel + 1);
    }
  }

  mostrarHierarquia(scene);

  // Scripts do jogo
  const playerScript = new Player(player);

  const scripts = [
    new DebugFisica(scene, fisica),
    playerScript,
    new ScoreManager(document.querySelector('#scoreValue'))
  ];

  // Inspector
  const gui = new GUI({ title: 'Inspector' });
  gui.add(playerScript, 'movementSpeed', 0, 10, 0.1);

  // Configuração da fisica
  const PASSO_FIXO = 1 / 50;
  fisica.timestep = PASSO_FIXO;

  let acumulador = 0;
  let tempoAnterior = performance.now();

  // Fila de eventos de colisão
  const eventos = new RAPIER.EventQueue(true);

  // Iniciar os scripts
  for (const script of scripts) {
    script.start?.();
  }

  // Ciclo principal do jogo
  renderer.setAnimationLoop((agora) => {

    const dt = Math.min((agora - tempoAnterior) / 1000, 0.1);
    tempoAnterior = agora;

    // Atualizar os scripts
    for (const script of scripts) {
      script.update?.(dt);
    }

    acumulador += dt;

    // Atualizar a fisica
    while (acumulador >= PASSO_FIXO) {

      for (const script of scripts) {
        script.fixedUpdate?.();
      }

      // Executar fisica com eventos de colisão
      fisica.step(eventos);

      // Verificar as colisões
      tratarColisoes(fisica, eventos);

      acumulador -= PASSO_FIXO;
    }

    // Sincronizar os objetos com a fisica
    sincronizarFisica(scene);

    // Desenhar a cena
    renderer.render(scene, camera);
  });
}

iniciarNivel().catch((erro) => {
  console.error('Erro ao iniciar o nível:', erro);

  const aviso = document.createElement('div');
  aviso.id = 'erro';
  aviso.textContent = 'Erro ao iniciar o jogo: ' + erro.message;

  document.body.appendChild(aviso);
});
