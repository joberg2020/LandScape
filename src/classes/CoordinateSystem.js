import { Point } from './Point.js';
import { Axis } from './Axis.js';
import { Interval } from './Interval.js';

export class CoordinateSystem {
  #x;
  #y;
  #autoAdjustOrigo;
  #origo;
  /**
   * Creates an instance of CoordinateSystem.
   * @param {Axis} xAxis
   * @param {Axis} yAxis
   * @param {Point} [origo=null] The origo of the coordinate system. If null, the origo will be set to (0, 0) if possible or to the center of the ranges of the axes.
   * @param {boolean} [autoAdjustOrigo=false] If true, the origo will be adjusted on later changes of axes if it is not within the range of the new axes.
   * @memberof CoordinateSystem
   * @throws {Error} If the axes are not Axis-objects.
   * @throws {Error} If the given origo is not within the range of the axes.
   */
  constructor({ xAxis, yAxis, origo = null, autoAdjustOrigo = false }) {
    this.autoAdjustOrigo = autoAdjustOrigo;
    this.#validateAxis(xAxis);
    this.#validateAxis(yAxis);
    this.#x = xAxis;
    this.#y = yAxis;

    if (origo == null) {
      this.origo = this.#getSuitableOrigoForAxis();
    } else {
      this.origo = origo;
    }
  }

  #validateAxis(axis) {
    if (!(axis instanceof Axis)) {
      throw new Error('The axes must be Axis-objects');
    }
  }

  normalizeScales() {
    const ratio = this.x.range.intervalLength / this.y.range.intervalLength;
    this.x.scale *= ratio;
    this.y.scale /= ratio;
  }

  /**
   * Tries to establish a resonable origo for the coordinate system. Will be (0, 0) if possible, otherwise the center of the ranges of the axes.
   * @returns {Point} The suggested origo for the coordinate system.
   */
  #getSuitableOrigoForAxis() {
    let suggestedOrigo;
    if (this.x.contains(0) && this.y.contains(0)) {
      suggestedOrigo = new Point(0, 0);
    } else {
      suggestedOrigo = new Point(this.x.range.middle, this.y.range.middle);
    }
    return suggestedOrigo;
  }

  get autoAdjustOrigo() {
    return this.#autoAdjustOrigo;
  }

  set autoAdjustOrigo(value) {
    if (typeof value != 'boolean') {
      throw new Error('The autoAdjustOrigo property must be a boolean');
    }
    this.#autoAdjustOrigo = value;
  }

  /**
   * @description Gets the x-axis of the coordinate system.
   * @return {Axis} The x-axis of the coordinate system.
   * @readonly
   * @memberof CoordinateSystem
   */
  get x() {
    return this.#x;
  }

  /**
   * @description Tries to set a new x-axis.
   * @memberof CoordinateSystem
   * @param {Axis} newAxis The new axis for x. 
   * @throws {Error} If the axis is not an Axis-object.
   * @throws {Error} If the origo is not within the range of the new axis and autoAdjustOrigo is disabled (i.e. is false).
   */
  set x(newAxis) {
    this.#validateAxis(newAxis);

    if (!newAxis.contains(this.origo.x)) {
      if (this.#autoAdjustOrigo) {
        this.#x = newAxis;
        this.origo = this.#getSuitableOrigoForAxis();
      }
      else {
        throw new Error('The origo must be within the range of the axis, or autoAdjustOrigo must be set to true');
      }
    }
    else {
      this.#x = newAxis;
    }
  }

  get y() {
    return this.#y;
  }

  /**
   * @description Tries to set a new y-axis.
   * @memberof CoordinateSystem
   * @param {Axis} newAxis The new axis for y. 
   * @throws {Error} If the axis is not an Axis-object.
   * @throws {Error} If the origo is not within the range of the new axis and autoAdjustOrigo is disabled (i.e. is false).
   */
  set y(newAxis) {
    this.#validateAxis(newAxis);

    if (!newAxis.contains(this.origo.y)) {
      if (this.#autoAdjustOrigo) {
        this.#y = newAxis;
        this.origo = this.#getSuitableOrigoForAxis();
      }
      else {
        throw new Error('The origo must be within the range of the axis, or autoAdjustOrigo must be set to true');
      }
    }
    else {
      this.#y = newAxis;
    }
  }

  get origo() {
    return this.#origo;
  }

  set origo(point) {
    if (!(point instanceof Point)) {
      throw new Error('The origo must be a Point');
    }
    if (!this.contains(point)) {
      throw new Error('The origo must be within the range of the coordinate system');
    }
    this.#origo = point;
  }

  /**
   * Returns the center point of the coordinate system.
   *
   * @readonly
   * @memberof CoordinateSystem
   * @return {Point} The center point of the coordinate system.
   */
  get centerPoint() {
    return new Point(this.x.range.middle, this.y.range.middle);
  }

  /**
   * @description Makes the axes even. The scale of the axes will be adjusted so that the number of pixels per unit is the same for both axes.
   * If the axes are already even, nothing happens.
   * @memberof CoordinateSystem
   */
  makeAxesEven() {
    if ((this.x.range.intervalLength * this.x.scale) > (this.y.range.intervalLength * this.y.scale)) {
      this.y.scale = (this.x.range.intervalLength * this.x.scale) / this.y.range.intervalLength;
    }
    else {
      this.x.scale = (this.y.range.intervalLength * this.y.scale) / this.x.range.intervalLength;
    }
  }

  /**
   * @description If axes scales have been changed, this function restores the axes to their previous scale. If they have not been changed, nothing happens.
   */
  restoreAxisToPreviousScale() {
    this.x.undoScaleChange();
    this.y.undoScaleChange();
  }

  contains(point) {
    return this.#x.contains(point.x) && this.#y.contains(point.y);
  }
}