import { Shape } from '../../classes/Shape';
import { SingletonCanvas } from '../../classes/SingletonCanvas';

export const moveShape = (e: MouseEvent) => {
  const instance = SingletonCanvas.getInstance();
  if (!instance.selectedShape) return;
  const position = instance.selectedShape.position;
  const offset = instance.selectionOffset;

  console.log(e.clientX, offset.x);
  const mouse = {
    x: e.clientX - offset.x,
    y: e.clientY - offset.y,
  };
  instance.selectedShape.move(mouse);
};
