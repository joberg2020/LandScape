export class GeometryStrategy {
  mapper;

  constructor(mapper) {
    if (this.constructor === GeometryStrategy) {
    throw new Error('GeometryStrategy is an abstract interface and cannot be instantiated directly.');
    } 
    else {
      this.mapper = mapper;
    }
  }

  getMappedObject(geometryObject) {
    throw new Error('Has to be implemented in concrete sub-classes.');
  }

  getRotatedObject(geometryObject, radians) {
    throw new Error('Has to be implemented in concrete sub-classes.');
  }

  renderObject(object, canvasContext) {
    throw new Error('Has to be implemented in concrete sub-classes.');
  }
}