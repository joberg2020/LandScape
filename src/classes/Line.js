import { GeometryObject } from "./GeometryObject";

export class Line extends GeometryObject {

  #startPoint
  #endPoint

  constructor(start, end) {
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
}