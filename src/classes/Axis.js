import { Interval } from './Interval.js';
/**
 * Describes an axis of a coordinate system. Has scale and range properties.
 *
 * @export
 * @class Axis
 */
export class Axis {
  

  #range;
  #scale;
  #isReversed; 

  /**
   * Creates an instance of Axis. 
   * 
   * @param {Interval} range Must be an Interval.
   * @param {number} scale Must be a positive number. Indicates the scale of the axis. I.e. higher values means that the axis is more "zoomed in". Default value is 1.
   * @param {boolean} isReversed A boolean value indicating whether the axis is reversed or not. Defaults to false which means a typical axis.
   */
  constructor(range, scale = 1, isReversed = false) {
    if (!range instanceof Interval) {
      throw new Error('The range must be an Interval');
    }
    if (typeof scale != 'number') {
      throw new Error('The scale must be a number');
    }
    this.#range = range;
    this.#scale = scale;
    this.#isReversed = isReversed;
  }

  /**
   * Checks if the axis contains the given value.
   * @param {number} value The value to check.
   * @returns {boolean} True if the axis contains the value, false otherwise.
   */
  contains(value) {
    return this.#range.contains(value);
  }

  get range() {
    return this.#range;
  }

  set range(newRange) {
    if (!newRange instanceof Interval) {
      throw new Error('The range must be an Interval');
    }
    this.#range = newRange;
  }

  get scale() {
    return this.#scale;
  }

  set scale(newScale) {
    if (typeof newScale != 'number' || newScale <= 0) {
      throw new Error('The scale must be a positive number');
    }
    this.#scale = newScale;
  }

  get isReversed() {
    return this.#isReversed;
  }

  set isReversed(value) {
    if (typeof value != 'boolean') {
      throw new Error('The isReversed property must be a boolean');
    }
    this.#isReversed = value;
  }
}