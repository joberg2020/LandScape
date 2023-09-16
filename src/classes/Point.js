/**
 * @class Point
 * @description Represents a point in a 2D space.
 */
export class Point {
  #x;
  #y;

  /**
   * 
   * @param {number} x The x coordinate of the point.
   * @param {number} y THe y coordinate of the point.
   */
  constructor(x, y) {
    if (typeof x != 'number' || typeof y != 'number') {
      throw new Error('The coordinates must be numbers');
    }
    this.#x = x;
    this.#y = y;
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

}