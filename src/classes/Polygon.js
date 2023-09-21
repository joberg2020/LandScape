import { GeometryObject } from "./GeometryObject";

export class Polygon extends GeometryObject {

  #nodePoints = [];

  constructor(...points) {
    for (const p of points) {
      super.validatePoint(p);
      this.#nodePoints.push(p);
    }
  }

  get listOfPoints() {
    return this.#nodePoints;
  }
}