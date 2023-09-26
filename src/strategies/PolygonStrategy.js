import { GeometryStrategy } from './GeometryStrategy';
import { Polygon } from '../classes/Polygon';
import { Point } from '../classes/Point';

export class PolygonStrategy extends GeometryStrategy {

  constructor(mapper) {
    super(mapper);
  }

  getMappedObject(polygon) {
    const mappedPoints = [];
    for (const p of polygon.listOfPoints) {
      mappedPoints.push(p.getMappedObject());
    }
    return new Polygon(this, ...mappedPoints);
  }

  getRotatedObject(polygon, radians) {
    const rotatedPoints = [];
    for (const p of polygon.listOfPoints) {
      rotatedPoints.push(p.getRotatedObject(radians));
    }
    return new Polygon(this, ...rotatedPoints);
  }

  renderObject(polygon, canvasContext) {
    let isFirst = true;
    let firstPoint = null;
    for (const p of polygon.listOfPoints) {
      p.renderObject(canvasContext);
      if (isFirst) {
        canvasContext.beginPath;
        canvasContext.moveTo(p.x, p.y);
        firstPoint = p;
        isFirst = false;
      }
      canvasContext.lineTo(p.x, p.y);
    }
    canvasContext.lineTo(firstPoint.x, firstPoint.y);
    canvasContext.stroke();
  }
}