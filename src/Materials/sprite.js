import * as THREE from 'three';

export const PIXEIS_POR_UNIDADE = 100;
const loader = new THREE.TextureLoader();

export async function criarSprite(caminho) {
  let textura;
  try {
    textura = await loader.loadAsync(caminho);
  } catch {
    throw new Error(`Não foi possível carregar ${caminho}.\nCopia a imagem do Moodle para public/${caminho.replace(/^\//, '')}.\nConfirma o nome, as maiúsculas e a extensão.`);
  }
  textura.colorSpace = THREE.SRGBColorSpace;
  const largura = textura.image.width / PIXEIS_POR_UNIDADE;
  const altura = textura.image.height / PIXEIS_POR_UNIDADE;
  return new THREE.Mesh(
    new THREE.PlaneGeometry(largura, altura),
    new THREE.MeshBasicMaterial({ map: textura, transparent: true }),
  );
}
