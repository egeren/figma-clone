import { calculatePositionInParent } from '../helpers/Canvas/positionHelpers';
import { Layerable } from '../interfaces/interfaces';
import { SingletonCanvas } from './SingletonCanvas';

export class Shape implements Layerable {
  isHovered = false;
  parent: Shape | undefined;
  offsetToParent: { x: number; y: number } = { x: 0, y: 0 };
  children: Shape[] = [];

  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    public ctx: CanvasRenderingContext2D,
    public color: string = '#fff'
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.color = color;
  }

  get position() {
    return { x: this.x, y: this.y };
  }

  set position(pos) {
    this.x = pos.x + this.offsetToParent.x;
    this.y = pos.y + this.offsetToParent.y;
  }

  get size() {
    return { width: this.width, height: this.height };
  }

  set size(size) {
    this.width = size.width;
    this.height = size.height;
  }

  setParent(parent: Shape): void {
    this.offsetToParent = calculatePositionInParent(parent, this);
    this.parent = parent;
  }

  removeParent(): void {
    this.parent = undefined;
  }

  appendChild(shape: Shape): void {
    shape.clear();
    shape.setParent(this);
    shape.position = this.position;
    this.children.push(shape);
    this.draw();
    shape.draw();
  }

  removeChild(shape: Shape): void {
    this.children = this.children.filter((child) => child !== shape);
  }

  public draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.drawChildren();
  }

  public drawOutline() {
    if (!this.isHovered) {
      this.ctx.strokeStyle = '#00ff00';
      this.ctx.strokeRect(
        this.x + 1,
        this.y + 1,
        this.width - 2,
        this.height - 2
      );
      this.isHovered = true;
    }
  }

  public removeOutline() {
    if (this.isHovered) {
      this.clear();
      this.draw();
      this.isHovered = false;
    }
  }

  public move(position: { x: number; y: number }) {
    this.clear();
    this.position = position;
    this.draw();
    SingletonCanvas.getInstance().shapes.forEach((shape) => {
      shape.draw();
    });
    this.children.forEach((child) => child.move(this.position));
    this.removeOutline();
    this.drawOutline();
  }

  public clear() {
    this.ctx.fillStyle = SingletonCanvas.getInstance().backgroundColor;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  public drawChildren() {
    this.children.forEach((child) => child.draw());
  }
}
