import { GeometryStrategy } from './GeometryStrategy';
import { Point } from '../classes/Point.js';
// import { Mapper } from '../classes/Mapper.js';
// import { CoordinateSystem } from '../classes/CoordinateSystem';

export class PointStrategy extends GeometryStrategy {
  
  constructor(mapper) {
    super(mapper);
  }

  getMappedObject(point) {
    const newX = this.mapper.mappingRatioX * (point.x - this.mapper.sourceSystem.centerPoint.x) + this.mapper.targetSystem.centerPoint.x;
    console.log('Mappin point.x: ', point.x, ' pointY: ', point.y);
    const newY = this.mapper.mappingRatioY * (point.y - this.mapper.sourceSystem.centerPoint.y) + this.mapper.targetSystem.centerPoint.y;
    return new Point(newX, newY, this);
  }

  getRotatedObject(point, radians) {
      const originalX = point.x;
      const originalY = point.y;
      const centerPoint = this.getMappedObject(this.mapper.sourceSystem.centerPoint);
      const newX = (originalX - centerPoint.x) * Math.cos(radians) - (originalY - centerPoint.y) * Math.sin(radians) + centerPoint.x;
      const newY = (originalX - centerPoint.x) * Math.sin(radians) + (originalY - centerPoint.y) * Math.cos(radians) + centerPoint.y;
      return new Point(newX, newY, this)
  }

  renderObject(point, canvasContext) {
    canvasContext.fillRect(point.x - 2, point.y - 2, 4, 4);
  }
}
