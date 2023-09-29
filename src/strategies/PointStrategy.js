import { GeometryStrategy } from './GeometryStrategy';
import { Point } from '../classes/Point.js';


export class PointStrategy extends GeometryStrategy {
  
  constructor(mapper) {
    super(mapper);
  }

  /**
   * Returns a new point with lineary mapped coordinates. http://learnwebgl.brown37.net/08_projections/projections_mapping.html
   * @param {Point} point The point that will be mapped.
   * @returns {Point} The mapped point. That is the coordinates of the point transformed to the target coordinate system.
   */
  getMappedObject(point) {
    const newX = this.#linearMap(point.x, this.mapper.mappingRatioX, this.mapper.sourceSystem.centerPoint.x, this.mapper.targetSystem.centerPoint.x);
    const newY = this.#linearMap(point.y, this.mapper.mappingRatioY, this.mapper.sourceSystem.centerPoint.y, this.mapper.targetSystem.centerPoint.y);
    return new Point(newX, newY, this);
  }

  #linearMap(pointValue, mappingRatio, fixPointSource, fixPointTarget) {
    return mappingRatio * (pointValue - fixPointSource) + fixPointTarget;
  }

  getRotatedObject(point, radians) {
      const originalX = point.x;
      const originalY = point.y;
      const centerPoint = this.getMappedObject(this.mapper.sourceSystem.centerPoint);
      const newX = (originalX - centerPoint.x) * Math.cos(radians) - (originalY - centerPoint.y) * Math.sin(radians) + centerPoint.x;
      const newY = (originalX - centerPoint.x) * Math.sin(radians) + (originalY - centerPoint.y) * Math.cos(radians) + centerPoint.y;
      return new Point(newX, newY, this)
  }

  unMapPoint(point) {
    const sourceX = ((point.x - this.mapper.targetSystem.centerPoint.x) / this.mapper.mappingRatioX) + this.mapper.sourceSystem.centerPoint.x;
    const sourceY = ((point.y - this.mapper.targetSystem.centerPoint.y) / this.mapper.mappingRatioY) + this.mapper.sourceSystem.centerPoint.y;
    return new Point(sourceX, sourceY, this);
  }

  renderObject(point, canvasContext) {
    canvasContext.fillRect(point.x - 2, point.y - 2, 4, 4);
  }
}
