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
  #scaleHistory = [];

  /**
   * Creates an instance of Axis. 
   * 
   * @param {Interval} range Must be an Interval.
   * @param {number} scale Must be a positive number. Indicates the scale of the axis. I.e. higher values means that the axis is more "zoomed in". Default value is 1.
   * @param {boolean} isReversed A boolean value indicating whether the axis is reversed or not. Defaults to false which means a typical axis.
   * @throws {Error} If the range is not an Interval.
   * @throws {Error} If the scale is not a positive number.
   */
  constructor(range, scale = 1, isReversed = false) {
    this.#validateRange(range);
    this.#validateScale(scale);
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
    this.#validateRange(newRange);
    this.#range = newRange;
  }

  get scale() {
    return this.#scale;
  }

  /**
   * @description Sets the scale of the axis. The new scale must be a positive number. Saves the old scale in the scaleHistory.
   * @param {number} newScale The new scale of the axis.
   *
   * @memberof Axis
   */
  set scale(newScale) {
    this.#validateScale(newScale);
    this.#scaleHistory.push(this.#scale);
    this.#scale = newScale;
  }

  /**
   * @description Undoes the last scale change. If no change has been made, nothing happens.
   */
  undoScaleChange() {
    if (this.#scaleHistory.length > 0) {
      this.#scale = this.#scaleHistory.pop();
    }
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

  #validateRange(interval) {
    if (!(interval instanceof Interval)) {
      throw new Error('The range must be an Interval.');
    }
  }

  #validateScale(scale) {
    if (typeof scale != 'number' || scale < 0) {
      throw new Error('The scale must be a positive number larger than 0');
    }
  }
}
