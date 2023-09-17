/**
 * @class Interval
 * @description Represents an interval of numbers.
 */
export class Interval {
  #lowerBound;
  #upperBound;
  
  constructor(lowerBound, upperBound) {
    if (typeof lowerBound != 'number' || typeof upperBound != 'number') {
      throw new Error('The Interval must be defined by numbers');
    }
    if (lowerBound > upperBound) {
      throw new Error('The lower bound must be less than or equal to the upper bound');
    }
    this.#lowerBound = lowerBound;
    this.#upperBound = upperBound;
  }

  get lowerBound() {
    return this.#lowerBound;
  }

  get upperBound() {
    return this.#upperBound;
  }

  get middle() {
    return (this.#lowerBound + this.#upperBound) / 2;
  }

  contains(value) {
    return value >= this.#lowerBound && value <= this.#upperBound;
  }

  /**
   * @description Checks if the current interval is lower than the value.
   * @param {number} value The number to compare with this interval.
   * @throws {Error} If the value is not a number.
   * @returns True if the current interval is lower than the value, false otherwise.
   */
  isBelow(value) {
    if (typeof value != 'number') {
      throw new Error('The value must be a number');
    }
    return value > this.upperBound;
  }
}