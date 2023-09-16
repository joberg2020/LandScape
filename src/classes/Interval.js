export class Interval {
  #lowerBound;
  #upperBound;
  
  constructor(lowerBound, upperBound) {
    this.#lowerBound = lowerBound;
    this.#upperBound = upperBound;
  }

  get lowerBound() {
    return this.#lowerBound;
  }

  get upperBound() {
    return this.#upperBound;
  }

  contains(value) {
    return value >= this.#lowerBound && value <= this.#upperBound;
  }
}