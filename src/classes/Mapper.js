import { CoordinateSystem } from "./CoordinateSystem";
import { Point } from "./Point";

/**
 * Maps between coordinate systems. 
 */
export class Mapper {

  #sourceSystem;
  #targetSystem;
  #xMappingRatio;
  #yMappingRatio;

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
    this.#initializeMappingRatios();

  }

  initializeMappingRatios() {
    this.#initializeMappingRatios();
  }

  /**
   * Calculates and sets the mapping ratio properties, which is the translater between sourcesystem and target coordinate system. 
   * Mapping ratio depends on both systems axes´ intervals and scales and also if the scales are reversed. There is a ratio for each axis.
   */
  #initializeMappingRatios() {
    this.#xMappingRatio = 
    (this.targetSystem.x.range.intervalLength * this.sourceSystem.x.scale) /
    (this.sourceSystem.x.range.intervalLength * this.targetSystem.x.scale);
    
    if (this.sourceSystem.x.isReversed !== this.targetSystem.x.isReversed) {
      this.#xMappingRatio *= -1;
    }
    
    this.#yMappingRatio = 
    (this.targetSystem.y.range.intervalLength * this.sourceSystem.y.scale) / 
    (this.sourceSystem.y.range.intervalLength * this.targetSystem.y.scale);

    if (this.sourceSystem.y.isReversed !== this.targetSystem.y.isReversed) {
      this.#yMappingRatio *= -1;
    }
    console.log('target.x.range.length: ', this.#targetSystem.x.range.intervalLength, 'source.x.range.length: ',
     this.#sourceSystem.x.range.intervalLength,' SourceYLength: ', this.#sourceSystem.y.range.intervalLength,'  sourceSystem.x.scale: ', this.#sourceSystem.x.scale, 'targetSystem.x.scale: ',
     this.#sourceSystem.x.range.intervalLength,' sourceSystem.y.scale: ', this.#sourceSystem.y.scale, 'targetSystem.y.scale: ', this.#targetSystem.y.scale,
     'sourceSystemYScale: ', this.#sourceSystem.y.scale, 'targetSystemYScale: ', this.#targetSystem.y.scale);
    
  }

  get sourceSystem() {
    return this.#sourceSystem;
  }

  get targetSystem() {
    return this.#targetSystem;
  }

  get mappingRatioX() {
    return this.#xMappingRatio;
  }

  get mappingRatioY() {
    return this.#yMappingRatio;
  }

  #validateCoordinateSystem(system) {
    if(!(system instanceof CoordinateSystem)) {
      throw new Error('The sourceSystem must be a CoordinateSystem-object');
    }
  }

  changeSourceAxesIntervals(minX, maxX, minY, maxY) {
    console.log('minX: ', minX, ' maxX: ', maxX, ' minY: ', minY, ' maxY: ', maxY);
    this.#sourceSystem.x.range.lowerBound = minX - 5;
    this.#sourceSystem.x.range.upperBound = maxX + 5;
    this.#sourceSystem.y.range.lowerBound = minY - 5;
    this.#sourceSystem.y.range.upperBound = maxY + 5;

    // update MappingRatios
    this.sourceSystem.normalizeScales();
    this.#initializeMappingRatios();
  }

  unMapPoint(point) {
    const sourceX = ((point.x - this.#targetSystem.centerPoint.x) / this.mappingRatioX) + this.#sourceSystem.centerPoint.x;
    const sourceY = ((point.y - this.#targetSystem.centerPoint.y) / this.mappingRatioY) + this.#sourceSystem.centerPoint.y;
    return new Point(sourceX, sourceY);
  }

  
}
