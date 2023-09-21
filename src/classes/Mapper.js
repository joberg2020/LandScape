import { CoordinateSystem } from "./CoordinateSystem";
import { Point } from "./Point";
import { Axis } from "./Axis";
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
    this.#initializeMappingRatios();
    this.#initializeCenterPoints();
  }

  #initializeMappingRatios() {
    this.#xMappingRatio = 
    (this.#targetSystem.x.range.intervalLength * this.sourceSystem.x.scale) /
    (this.#sourceSystem.x.range.intervalLength * this.targetSystem.x.scale);
    
    if (this.#sourceSystem.x.isReversed !== this.#targetSystem.x.isReversed) {
      this.#xMappingRatio *= -1;
    }

    this.#yMappingRatio = 
    (this.#targetSystem.y.range.intervalLength * this.#sourceSystem.y.scale) / 
    (this.#sourceSystem.y.range.intervalLength * this.#targetSystem.y.scale);

    if (this.#sourceSystem.y.isReversed !== this.#targetSystem.y.isReversed) {
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


  /**
   * @description Maps a point from the source coordinate system to the target coordinate system.
   * @param {Point} point The point to map.
   * @returns {Point} The mapped point.
   * @throws {Error} If the point is not a Point-object.
   */
  mapPoint(point) {
    if (!(point instanceof Point)) {
      throw new Error('The point must be a Point');
    }
    else {
      const newX = this.#xMappingRatio * (point.x - this.#xSourceCenter) + this.#xTargetCenter;
      const newY = this.#yMappingRatio * (point.y - this.#ySourceCenter) + this.#yTargetCenter;
      return new Point(newX, newY);
    }
  }
}
