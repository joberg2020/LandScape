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
    console.log('target.x.range.length: ', this.#targetSystem.x.range.intervalLength, 'target.y.range.length: ', this.#targetSystem.y.range.intervalLength,'source.x.range.length: ',
     this.#sourceSystem.x.range.intervalLength,' SourceYLength: ', this.#sourceSystem.y.range.intervalLength,'  sourceSystem.x.scale: ', this.#sourceSystem.x.scale, 'targetSystem.x.scale: ',
     this.#targetSystem.x.scale,' sourceSystem.y.scale: ', this.#sourceSystem.y.scale, 'targetSystem.y.scale: ', this.#targetSystem.y.scale,
     'sourceSystemYScale: ', this.#sourceSystem.y.scale, 'targetSystemYScale: ', this.#targetSystem.y.scale);
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

  #validateCoordinateSystem(system) {
    if(!(system instanceof CoordinateSystem)) {
      throw new Error('The sourceSystem must be a CoordinateSystem-object');
    }
  }

  changeSourceAxesIntervals(minX, maxX, minY, maxY) {
    console.log('minX: ', minX, ' maxX: ', maxX, ' minY: ', minY, ' maxY: ', maxY);
    this.#sourceSystem.x.range.lowerBound = minX ;
    this.#sourceSystem.x.range.upperBound = maxX ;
    this.#sourceSystem.y.range.lowerBound = minY ;
    this.#sourceSystem.y.range.upperBound = maxY ;

    // update MappingRatios
   // this.sourceSystem.normalizeScales();
    this.updateMappingRatios();
  }

  unMapPoint(point) {
    const sourceX = ((point.x - this.#targetSystem.centerPoint.x) / this.mappingRatioX) + this.#sourceSystem.centerPoint.x;
    const sourceY = ((point.y - this.#targetSystem.centerPoint.y) / this.mappingRatioY) + this.#sourceSystem.centerPoint.y;
    return new Point(sourceX, sourceY);
  }

    /**
   * @description Makes the axes of the source coordinate system even. If the axes are already even, nothing happens.
   */
    harmonizeSourceScales() {
      this.sourceSystem.makeAxesEven();
      this.updateMappingRatios();
    }

      /**
   * @description Makes the axes of the target coordinate system even. If the axes are already even, nothing happens.
   */
  harmonizeTargetScales() {
    this.targetSystem.makeAxesEven();
    this.updateMappingRatios();
  }

}
