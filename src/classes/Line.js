import { GeometryObject } from "./GeometryObject";

export class Line extends GeometryObject {

  #startPoint
  #endPoint

  constructor(start, end, strategy = null) {
    strategy ? super(strategy) : super();
    super.validatePoint(start)
    super.validatePoint(end)
    this.#startPoint = start;
    this.#endPoint = end;
  }

  get startPoint() {
    return this.#startPoint;
  }

  get endPoint() {
    return this.#endPoint;
  }

  get minX() {
    return Math.min(this.#startPoint.x, this.#endPoint.x);
  }

  get maxX() {
    return Math.max(this.#startPoint.x, this.#endPoint.x);
  }

  get minY() {
    return Math.min(this.#startPoint.y, this.#endPoint.y);
  }

  get maxY() {
    return Math.max(this.#endPoint.y, this.#startPoint.y);
  }
}