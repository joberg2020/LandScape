import { GeometryStrategy } from './GeometryStrategy';
import { Line } from '../classes/Line.js';


export class LineStrategy extends GeometryStrategy {
  
  constructor(mapper) {
    super(mapper);
  }

  getMappedObject(line) {
    return new Line(line.startPoint.getMappedObject(), line.endPoint.getMappedObject(), this);
  }

  getRotatedObject(line, radians) {
    return new Line(line.startPoint.getRotatedObject(radians), line.endPoint.getRotatedObject(radians), this);
  }

  renderObject(line, canvasContext) {
    canvasContext.moveTo(line.startPoint.x, line.startPoint.y);
    canvasContext.lineTo(line.endPoint.x, line.endPoint.y);
    canvasContext.stroke();
  }
}