import * as THREE from 'three';
import RAPIER from '@dimforge/rapier2d-compat';

export function adicionarRigidbody(fisica, objeto, massa = 1) {
  const descricao = RAPIER.RigidBodyDesc.dynamic()
    .setTranslation(objeto.position.x, objeto.position.y)
    .setAdditionalMass(massa);
  const corpo = fisica.createRigidBody(descricao);
  objeto.userData.rigidBody = corpo;
  return corpo;
}

export function sincronizarFisica(scene) {
  scene.traverse((objeto) => {
    const corpo = objeto.userData.rigidBody;
    if (corpo) {
      const posicao = corpo.translation();
      objeto.position.x = posicao.x;
      objeto.position.y = posicao.y;
      objeto.rotation.z = corpo.rotation();
    }
  });
}

export function adicionarBoxCollider(fisica, objeto, ajusteX = 1, ajusteY = 1, deslocX = 0, deslocY = 0) {
  const caixa = new THREE.Box3().setFromObject(objeto);
  const tamanho = caixa.getSize(new THREE.Vector3());
  const centro = caixa.getCenter(new THREE.Vector3());
  const dx = tamanho.x * deslocX;
  const dy = tamanho.y * deslocY;
  const descricao = RAPIER.ColliderDesc.cuboid(
    (tamanho.x / 2) * ajusteX,
    (tamanho.y / 2) * ajusteY,
  );

  // Experiência final da ficha: descomenta para tornar as caixas sensores.
  // descricao.setSensor(true);
  // descricao.setActiveEvents(RAPIER.ActiveEvents.COLLISION_EVENTS);

  const corpo = objeto.userData.rigidBody;
  let collider;
  if (corpo) {
    descricao.setTranslation(dx, dy);
    collider = fisica.createCollider(descricao, corpo);
  } else {
    descricao.setTranslation(centro.x + dx, centro.y + dy);
    collider = fisica.createCollider(descricao);
  }
  objeto.userData.collider = collider;
  return collider;
}
