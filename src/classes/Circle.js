import { GeometryObject } from "./GeometryObject";

export class Circle extends GeometryObject {

  #radius;
  #centerPoint;

  constructor (centerPoint, radius) {
    super.validatePoint(centerPoint);
    this.#centerPoint = centerPoint;
    super.validateNumber(radius)
    this.#radius = radius;
  }

  get radius() {
    return this.#radius;
  }

  get center () {
    return this.#centerPoint;
  }
}