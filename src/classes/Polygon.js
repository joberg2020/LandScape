import { PolygonStrategy } from "../strategies/PolygonStrategy";
import { GeometryObject } from "./GeometryObject";

export class Polygon extends GeometryObject {

  #nodePoints = [];

  constructor(strat=null, ...points) {
    if (strat instanceof PolygonStrategy) {
      super(strat)
    } 
    else {
      super();
      // This is not a perfect solution.
      points = [strat, ...points];
    }
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