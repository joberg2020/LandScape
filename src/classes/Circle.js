import { GeometryObject } from "./GeometryObject";

export class Circle extends GeometryObject {

  #radius;
  #centerPoint;

  constructor (centerPoint, radius, strategy = null) {
    strategy ? super(strategy) : super();
    super.validatePoint(centerPoint);
    this.#centerPoint = centerPoint;
    super.validateNumber(radius)
    if (radius < 0) {
      throw new Error('Radius must be a positive number');
    }
    this.#radius = radius;
  }

  get radius() {
    return this.#radius;
  }

  get center () {
    return this.#centerPoint;
  }

  get minX() {
    return this.#centerPoint.x - this.#radius;
  }

  get maxX() {
    return this.#centerPoint.x + this.#radius;
  }

  get minY() {
    return this.#centerPoint.y - this.#radius;
  }

  get maxY() {
    return this.#centerPoint.y + this.#radius;
  }
}