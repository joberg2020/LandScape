import { CoordinateSystem } from "./CoordinateSystem";
import { Point } from "./Point";
import { Axis } from "./Axis";
import { Polygon } from "./Polygon";
/**
 * Maps between coordinate systems. 
 */
export class Mapper {

  #sourceSystem;
  #targetSystem;
  #xMappingRatio;
  #yMappingRatio;
  #xTargetCenter;
  #yTargetCenter;
  #xSourceCenter;
  #ySourceCenter;

  /**
   * 
   * @param {CoordinateSystem} sourceSystem 
   * @param {CoordinateSystem} targetSystem 
   */
  constructor(sourceSystem, targetSystem) {
    this.#validateCoordinateSystem(sourceSystem)
    this.#validateCoordinateSystem(targetSystem)
    
    this.#sourceSystem = sourceSystem;
    this.#targetSystem = targetSystem;
    this.#initializeCenterPoints();
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
    console.log('target.x.range.length: ', this.#targetSystem.x.range.intervalLength, 'source.x.range.length: ', this.#sourceSystem.x.range.intervalLength,' sourceSystem.x.scale: ', this.targetSystem.x.scale);
    this.#yMappingRatio = 
    (this.targetSystem.y.range.intervalLength * this.sourceSystem.y.scale) / 
    (this.sourceSystem.y.range.intervalLength * this.targetSystem.y.scale);

    if (this.sourceSystem.y.isReversed !== this.targetSystem.y.isReversed) {
      this.#yMappingRatio *= -1;
    }
    
  }

  #initializeCenterPoints() {
    this.#xTargetCenter = this.#targetSystem.centerPoint.x;
    this.#yTargetCenter = this.#targetSystem.centerPoint.y;
    this.#xSourceCenter = this.#sourceSystem.centerPoint.x;
    this.#ySourceCenter = this.#sourceSystem.centerPoint.y;
  
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

  /**
   * @description Makes the axes of the target coordinate system even. If the axes are already even, nothing happens.
   */
  harmonizeTargetScales() {
    this.targetSystem.makeAxesEven();
    this.#initializeMappingRatios();
  }

  changeSourceAxesIntervals(minX, maxX, minY, maxY) {
    console.log('minX: ', minX, ' maxX: ', maxX, ' minY: ', minY, ' maxY: ', maxY);
    this.#sourceSystem.x.range.lowerBound = minX - 5;
    this.#sourceSystem.x.range.upperBound = maxX + 5;
    this.#sourceSystem.y.range.lowerBound = minY - 5;
    this.#sourceSystem.y.range.upperBound = maxY + 5;

    // update MappingRatios
    this.sourceSystem.normalizeScales();
    this.#initializeCenterPoints();
    this.#initializeMappingRatios();

  }

  /**
   * @description Undoes the last scale change of the target coordinate system. If no change has been made, nothing happens.
   */
  undoScaleChangeTarget() {
    this.targetSystem.undoScaleChange();
    this.#initializeMappingRatios();
  }
  
  /**
   * @description Makes the axes of the source coordinate system even. If the axes are already even, nothing happens.
   */
  harmonizeSourceScales() {
    this.sourceSystem.makeAxesEven();
    this.#initializeMappingRatios();
  }

  /**
   * @description Undoes the last scale change of the source coordinate system. If no change has been made, nothing happens.
   */
  undoScaleChangeSource() {
    this.sourceSystem.undoScaleChange();
    this.#initializeMappingRatios();
  }

  unMapPoint(point) {
    console.log('target.x: ', point.x, ' xTargetCenter: ', this.#xTargetCenter, 'XMP: ', this.mappingRatioX, 'xSC: ', this.#xSourceCenter)
    const sourceX = ((point.x - this.#xTargetCenter) / this.mappingRatioX) + this.#xSourceCenter;
    const sourceY = ((point.y - this.#yTargetCenter) / this.mappingRatioY) + this.#ySourceCenter;
    return new Point(sourceX, sourceY);
  }

  
}
