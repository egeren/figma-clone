import { Shape } from './Shape';

export class SingletonCanvas {
  private static instance: SingletonCanvas;
  public static getInstance(): SingletonCanvas {
    if (!SingletonCanvas.instance) {
      SingletonCanvas.instance = new SingletonCanvas();
    }
    return SingletonCanvas.instance;
  }

  backgroundColor = '#ccc';
  shapes: Shape[] = [];
  selectedShape: Shape | undefined;
  selectionOffset: { x: number; y: number } = { x: 0, y: 0 };
}
