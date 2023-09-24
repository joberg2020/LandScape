import { Point } from "./Point";
export class GeometryObject {
  
  constructor() {
    if (this.constructor === GeometryObject) {
      throw new Error('GeometryObject is an abstract class and cannot be instantiated directly');
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
}