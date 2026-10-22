
import * as THREE from 'three';
import { criarSprite } from '../Materials/sprite.js';
import { adicionarCircleCollider } from '../Scripts/Fisica.js';
import { CoinPickup } from '../Scripts/CoinPickup.js';

export async function createCoin(fisica, x, y) {
  const coin = new THREE.Group();
  coin.name = 'Coin';
  coin.position.set(x, y, 0);

  const image = await criarSprite('assets/Sprites/Objects/coin.png');
  image.name = 'CoinImage';
  image.position.set(0, 0, 1.5);

  coin.add(image);

  adicionarCircleCollider(fisica, coin, true);

  new CoinPickup(coin);

  return coin;
}
