import { Point } from "./Point";
export class GeometryObject {

  strategy;
  
  constructor(strat = null) {
    if (this.constructor === GeometryObject) {
      throw new Error('GeometryObject is an abstract class and cannot be instantiated directly');
    }
    else if (strat!== null) {
      this.strategy = strat;
    }
  }

  validatePoint(...points) {
    for (const p of points)
    if (!(p instanceof Point)) {
      throw new Error('Point must be a Point-object')
    }
  }

  validateNumber(...numbers) {
    for (const n of numbers) {
      if (typeof n !== 'number') {
        throw new Error('The argument must be a number')
      }
    }
  }

  // Strategies 
  getMappedObject() {
    return this.strategy.getMappedObject(this);
  }

  getRotatedObject(radians) {
    return this.strategy.getRotatedObject(this, radians);
  }

  renderObject(canvasContext) {
    return this.strategy.renderObject(this, canvasContext);
  }
}