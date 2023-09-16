import { Point } from './Point.js';
import { Interval } from './Interval.js';
export class CoordinateSystem {
  #xRange = new Interval(-10, 10);
  #yRange = new Interval(-10, 10);
  #origo = new Point(0, 0);

  setXRange (lowerBound, upperBound) {
    if (typeof lowerBound != 'number' || typeof upperBound != 'number') {
      throw new Error('The range must be numbers');
    }
    this.#xRange = new Interval(lowerBound, upperBound);
  }

  setYRange (lowerBound, upperBound) {
    this.#yRange = new Interval(lowerBound, upperBound);
  }

  setXRange (interval) {
    if (!interval instanceof Interval) {
      throw new Error('The range must be an Interval');
    }
    this.#xRange = interval;
  }

  setYRange (interval) {
    if (!interval instanceof Interval) {
      throw new Error('The range must be an Interval');
    }
    this.#yRange = interval;
  }

  getOrigo () {
    return this.#origo;
  }

  setOrigo (point) {
    if (!point instanceof Point) {
      throw new Error('The origo must be a Point');
    }
     if (!this.containsPoint(point)) {
      throw new Error('The origo must be within the range of the coordinate system');
    }
    this.#origo = point;
  }

  containsPoint (point) {
    return this.#xRange.contains(point.x) && this.#yRange.contains(point.y);
  }
}