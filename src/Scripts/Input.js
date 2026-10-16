
const keys = new Set();

window.addEventListener('keydown', (event) => keys.add(event.code));
window.addEventListener('keyup', (event) => keys.delete(event.code));
window.addEventListener('blur', () => keys.clear());

function pressed(...codes) {
  return codes.some((code) => keys.has(code));
}

export const Input = {
  getAxis(axis) {
    let value = 0;

    if (axis === 'Horizontal') {
      if (pressed('KeyA', 'ArrowLeft')) value -= 1;
      if (pressed('KeyD', 'ArrowRight')) value += 1;
    } else if (axis === 'Vertical') {
      if (pressed('KeyS', 'ArrowDown')) value -= 1;
      if (pressed('KeyW', 'ArrowUp')) value += 1;
    }

    return value;
  },
};
