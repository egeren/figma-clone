import { Shape } from './Shape';
import { Layerable } from '../interfaces/interfaces';

export class Frame extends Shape {
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    ctx: CanvasRenderingContext2D
  ) {
    super(x, y, width, height, ctx);
  }
}
