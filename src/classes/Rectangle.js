import { GeometryObject } from "./GeometryObject";

export class Rectangle extends GeometryObject {

  #startingPoint
  #width
  #height

  constructor (startingPoint, width, height) {
    super();
    super.validatePoint(startingPoint)
    super.validateNumber(width, height);
    if (width < 0 || height < 0) {
      throw new Error('Width and height must be positive numbers');
    }
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

  get minX() {
    return this.#startingPoint.x;
    }

  get maxX() {
    return this.#startingPoint.x + this.#width;
  }

  get minY() {
    return this.#startingPoint.y;
  }

  get maxY () {
    return this.#startingPoint.y + this.#height;
  }
}