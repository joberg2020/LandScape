import { GeometryStrategy } from './GeometryStrategy';
import { Rectangle } from '../classes/Rectangle.js';


export class RectangleStrategy extends GeometryStrategy {
  
  constructor(mapper) {
    super(mapper);
  }

  getMappedObject(rectangle) {
    const startingPoint = rectangle.startingPoint.getMappedObject();
    const mappedWidth = this.mapper.mappingRatioX * rectangle.width;
    const mappedHeight = this.mapper.mappingRatioY * rectangle.height;
    return new Rectangle(startingPoint, mappedWidth, mappedHeight, this);
  }

  getRotatedObject(rectangle, radians) {
    const newRect = new Rectangle(rectangle.startingPoint.getRotatedObject(radians), rectangle.width, rectangle.height, this);
    // Keep track of rotation angle.
    newRect.rotationAngle += rectangle.rotationAngle + radians;
    return newRect;
  }

  renderObject(rectangle, canvasContext) {

    // TODO: Probably easier to change rectangle to some polygon lookalike. 
    canvasContext.beginPath;
    canvasContext.moveTo(rectangle.startingPoint.x, rectangle.startingPoint.y);
    canvasContext.lineTo(rectangle.startingPoint.x + Math.sin(rectangle.rotationAngle) * rectangle.width, rectangle.startingPoint.y + Math.cos(rectangle.rotationAngle) * rectangle.height);
    //canvasContext.rect(rectangle.startingPoint.x, rectangle.startingPoint.y, rectangle.width, rectangle.height);
    canvasContext.stroke();
  }
}