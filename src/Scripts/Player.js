
import { Input } from './Input.js';

export class Player {
  #playerRb;
  #horizontal = 0;
  movementSpeed = 1;

  constructor(object) {
    this.object = object;
  }

  start() {
    this.#playerRb = this.object.userData.rigidBody;
  }

  update() {
    this.#horizontal = Input.getAxis('Horizontal');
  }

  fixedUpdate() {
    this.#handleMovement();
  }

  #handleMovement() {
    this.#playerRb.setLinvel(
      {
        x: this.#horizontal * this.movementSpeed,
        y: this.#playerRb.linvel().y
      },
      true
    );
  }
}
