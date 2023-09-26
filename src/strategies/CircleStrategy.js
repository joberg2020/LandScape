import { GeometryStrategy } from './GeometryStrategy';
import { Circle } from '../classes/Circle.js';


export class CircleStrategy extends GeometryStrategy {
  
  constructor(mapper) {
    super(mapper);
  }

  getMappedObject(circle) {
    const mappedCenter = circle.center.getMappedObject();
    return new Circle(mappedCenter, circle.radius, this);
  }

  getRotatedObject(circle, radians) {
    //const rotatedCenter = new Circle()
    console.log('circle radius * Mapper mappingRatio at circlestrat: ', this.mapper.mappingRatioX * circle.radius);
    return new Circle(circle.center.getRotatedObject(radians), circle.radius, this);
  }

  renderObject(circle, canvasContext) {
    canvasContext.beginPath();
    // TODO: This radius adjustment could be faulty if mappingRatio differs between axes.
    canvasContext.arc(circle.center.x, circle.center.y, circle.radius * this.mapper.mappingRatioY, 0, 2 * Math.PI);
  }
}