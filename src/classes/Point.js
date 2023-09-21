import { GeometryObject } from "./GeometryObject";

/**
 * @class Point
 * @description Represents a point in a 2D space.
 */
export class Point extends GeometryObject {
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

  /**
   * @description Checks if the current point is equal to another point.
   * @param {Point} other The point to compare with.
   * @throws {Error} If the other point is not a Point-object.
   * @returns True if the points are equal, false otherwise.
   */
  equals(other) {
    if (!other instanceof Point) {
      return false;
    }
    return this.x == other.x && this.y == other.y;
  }
}