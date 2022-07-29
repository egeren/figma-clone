import { SingletonCanvas } from '../../classes/SingletonCanvas';

export const hoverShape = (e: MouseEvent, ctx: CanvasRenderingContext2D) => {
  const mouse = {
    x: e.clientX,
    y: e.clientY,
  };
  const shapes = SingletonCanvas.getInstance().shapes;
  shapes.forEach((shape) => {
    if (
      shape.position.x < mouse.x &&
      shape.position.x + shape.size.width > mouse.x &&
      shape.position.y < mouse.y &&
      shape.position.y + shape.size.height > mouse.y
    ) {
      shape.drawOutline();
    } else {
      shape.removeOutline();
    }
  });
};
export const findObjectWithMouse = (e: MouseEvent) => {
  const mouse = {
    x: e.clientX,
    y: e.clientY,
  };
  const shapes = SingletonCanvas.getInstance().shapes;
  return shapes.find(
    (shape) =>
      shape.position.x < mouse.x &&
      shape.position.x + shape.size.width > mouse.x &&
      shape.position.y < mouse.y &&
      shape.position.y + shape.size.height > mouse.y
  );
};
