import { Shape } from '../classes/Shape';

export interface Layerable {
  parent: Shape | undefined;
  offsetToParent: { x: number; y: number };
  children: Shape[];

  setParent(parent: Shape): void;
  removeParent(): void;
  appendChild(shape: Shape): void;
  removeChild(shape: Shape): void;
}
