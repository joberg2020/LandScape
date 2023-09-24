import { GeometryObject } from "./GeometryObject";

export class Polygon extends GeometryObject {

  #nodePoints = [];

  constructor(...points) {
    super();
    for (const p of points) {

      super.validatePoint(p);
      this.#nodePoints.push(p);
    }
  }

  get listOfPoints() {
    return this.#nodePoints;
  }

  get minX() {
    return Math.min(...this.#nodePoints.map(p => p.x));
  }

  get maxX() {
    return Math.max(...this.#nodePoints.map(p => p.x));
  }

  get minY() {
    return Math.min(...this.#nodePoints.map(p => p.y));
  }

  get maxY() {
    return Math.max(...this.#nodePoints.map(p =>p.y));
  }
}