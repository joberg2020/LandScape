import { GeometryObject } from "./GeometryObject";

export class Rectangle extends GeometryObject {

  #startingPoint
  #width
  #height

  constructor (startingPoint, width, height) {
    super.validatePoint(startingPoint)
    super.validateNumber(width, height);
    this.#startingPoint = startingPoint;
    this.#width = width;
    this.#height = height;
  }

  get startingPoint() {
    return this.#startingPoint;
  }

  get width () {
    return this.#width;
  }

  get height () {
    return this.#height;
  }
}