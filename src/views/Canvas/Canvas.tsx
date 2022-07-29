import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Shape } from '../../classes/Shape';
import { SingletonCanvas } from '../../classes/SingletonCanvas';
import {
  findObjectWithMouse,
  hoverShape,
} from '../../helpers/Canvas/objectFinder';
import { moveShape } from '../../helpers/Canvas/shapeActions';

function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
    const canvas = canvasRef.current.getContext('2d');
    if (canvas !== null) {
      const instance = SingletonCanvas.getInstance();
      canvas.fillStyle = '#ccc';
      canvas.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      const handleMouseMove = (e: MouseEvent) => {
        hoverShape(e, canvas);
        if (instance.selectedShape) {
          moveShape(e);
        }
      };

      const handleMouseDown = (e: MouseEvent) => {
        instance.selectedShape = findObjectWithMouse(e);
        if (instance.selectedShape) {
          instance.selectionOffset = {
            x: e.clientX - instance.selectedShape.position.x,
            y: e.clientY - instance.selectedShape.position.y,
          };
        }
      };

      const handleMouseUp = (e: MouseEvent) => {
        instance.selectedShape = undefined;
        console.log(instance.shapes);
      };

      const shape = new Shape(20, 20, 450, 450, canvas);

      const shape2 = new Shape(600, 600, 500, 500, canvas, 'lightblue');

      const child = new Shape(50, 50, 50, 50, canvas, 'red');

      shape.appendChild(child);
      shape2.appendChild(shape);
      instance.shapes.push(shape2);

      canvasRef.current.addEventListener('mousemove', handleMouseMove);
      canvasRef.current.addEventListener('mousedown', handleMouseDown);
      canvasRef.current.addEventListener('mouseup', handleMouseUp);

      return () => {
        if (!canvasRef.current) return;
        canvasRef.current.removeEventListener('mousemove', handleMouseMove);
        canvasRef.current.removeEventListener('mousedown', handleMouseDown);
        canvasRef.current.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, []);

  return (
    <div className="canvas-container w-full h-full">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}

export default Canvas;
