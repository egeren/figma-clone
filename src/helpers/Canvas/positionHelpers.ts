import { Shape } from '../../classes/Shape';

export const calculatePositionInParent = (
  parent: Shape | undefined,
  shape: Shape
) => {
  if (!parent) return shape.position;
  const parentX = parent.position.x;
  const parentY = parent.position.y;
  const { x, y } = shape.position;
  return {
    x,
    y,
  };
};
