import { CoordinateSystem } from "./CoordinateSystem";
import { Point } from "./Point";

/**
 * Maps between coordinate systems. 
 */
export class Mapper {

  #sourceSystem;
  #targetSystem;
  #MappingRatioX;
  #MappingRatioY;

  /**
   * 
   * @param {CoordinateSystem} sourceSystem The coordinate system that you 
   * @param {CoordinateSystem} targetSystem 
   */
  constructor(sourceSystem, targetSystem) {
    this.#validateCoordinateSystem(sourceSystem)
    this.#validateCoordinateSystem(targetSystem)

    this.#sourceSystem = sourceSystem;
    this.#targetSystem = targetSystem;
    this.updateMappingRatios();
  }

  /**
   * Calculates and sets the mapping ratio properties, which is the translater between sourcesystem and target coordinate system. 
   * Mapping ratio depends on both systems axes´ intervals and scales and also if the scales are reversed. There is a ratio for each axis.
   */
  updateMappingRatios() {
    this.#MappingRatioX =
      ((this.targetSystem.x.range.intervalLength / this.sourceSystem.x.scale)) /
      ((this.sourceSystem.x.range.intervalLength / this.targetSystem.x.scale));

    if (this.sourceSystem.x.isReversed !== this.targetSystem.x.isReversed) {
      this.#MappingRatioX *= -1;
    }

    this.#MappingRatioY =
      ((this.targetSystem.y.range.intervalLength / this.sourceSystem.y.scale)) /
      ((this.sourceSystem.y.range.intervalLength / this.targetSystem.y.scale));

    if (this.sourceSystem.y.isReversed !== this.targetSystem.y.isReversed) {
      this.#MappingRatioY *= -1;
    }
  }

  #validateCoordinateSystem(system) {
    if (!(system instanceof CoordinateSystem)) {
      throw new Error('The sourceSystem must be a CoordinateSystem-object');
    }
  }

  /** Changes the source systems x and y axis ranges according to the outer edges of the current objects added.  
   * 
   */
  changeSourceAxesIntervals(minX, maxX, minY, maxY) {
    this.#sourceSystem.x.range.lowerBound = minX;
    this.#sourceSystem.x.range.upperBound = maxX;
    this.#sourceSystem.y.range.lowerBound = minY;
    this.#sourceSystem.y.range.upperBound = maxY;
  }

  /**
 * @description Makes the axes of the source coordinate system even. If the axes are already even, nothing happens.
 */
  harmonizeSourceScales() {
    this.sourceSystem.makeAxesEven();
    this.updateMappingRatios();

  }

  harmonizeTargetScales() {
    this.targetSystem.makeAxesEven();
    this.updateMappingRatios();

  }

  get sourceSystem() {
    return this.#sourceSystem;
  }

  get targetSystem() {
    return this.#targetSystem;
  }

  get mappingRatioX() {
    return this.#MappingRatioX;
  }

  get mappingRatioY() {
    return this.#MappingRatioY;
  }

}
