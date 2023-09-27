import { Point } from './Point.js';
import { Mapper } from './Mapper.js';
import { CoordinateSystem } from './CoordinateSystem.js';
import { Axis } from './Axis.js';
import { Interval } from './Interval.js';
import { GeometryObject } from './GeometryObject.js';
import { PointStrategy } from '../strategies/PointStrategy.js';


export class Renderer {

  /** 
  @type {CanvasRenderingContext2D} canvasContext 
  */
  #canvasContext;
  #mapper;
  #geometryObjects = [];
  #mappedGeometryObjects = [];
  #rotation = 0.0;

  /**
   * @param {CoordinateSystem} coordinateSystem The coordinatesystem to use as reference.
   * @param {HTMLCanvasElement} canvasElement The canvas element to render on.
   */
  constructor(coordinateSystem, canvasElement) {
    if (!(canvasElement instanceof HTMLCanvasElement)) {
      throw new Error('The argument has to be a HTMLCanvasElement');
    } else {
      this.#resizeCanvasIfNeeded(canvasElement, coordinateSystem);
      this.#canvasContext = canvasElement.getContext('2d');
      // Create the Mapper
      this.#initializeMapper(coordinateSystem, canvasElement);
    }
  }

  #initializeMapper(sourceSystem, canvas) {
    console.log('Mapper should be created');
    console.log('Canvas.width: ', canvas.width);
    // Create Mapper with the given source system and the target system based on the canvas coordinate system (y-axis is reversed, origin in top left corner).
    this.#mapper = new Mapper(sourceSystem,
      new CoordinateSystem({
        'xAxis': new Axis(new Interval(0, canvas.width), 1),
        'yAxis': new Axis(new Interval(0, canvas.height), 1, true)
      }));
  }

  /**
   * If source coordinate system has different width/height ratio compared to canvas, the canvas height will be adjusted to force the same ratio for canvas. 
   * Canvas width will be the same as before.
   * @param {HTMLCanvasElement} canvas This canvas will have its height resized to match the source coordinate system's aspect ratio.
   * @param {CoordinateSystem} sourceSystem 
   */
  #resizeCanvasIfNeeded(canvas, sourceSystem) {
    const ratioSource = (sourceSystem.x.range.intervalLength * sourceSystem.x.scale)/ (sourceSystem.y.range.intervalLength * sourceSystem.y.scale);
    const ratioTarget = canvas.width / canvas.height
    console.log('Sources at resize canvas: ', sourceSystem)
    if (ratioSource !== ratioTarget) {
      ratioSource == 1 ? canvas.setAttribute('height', canvas.width) :
        canvas.setAttribute('height', canvas.width * ratioSource);
    }
  }

  getSourcePointFromCanvasEvent(event) {
    const rect = event.target.getBoundingClientRect();
    const targetPoint = new Point(event.clientX - rect.left, event.clientY - rect.top, new PointStrategy(this.mapper));
    const unRotatedPoint = targetPoint.getRotatedObject(-this.#rotation);
    return this.#mapper.unMapPoint(unRotatedPoint);
  }

  get mapper() {
    return this.#mapper;
  }
  /**
   * Adds a geometryobject, defined in coordinates of the source coordinate system, to the collection of objects.
   * @param {GeometryObject} geometryObject 
   */
  add(geometryObject) {
    this.#geometryObjects.push(geometryObject)
  }

  mapObjects() {
    for (const obj of this.#geometryObjects) {
      this.#mappedGeometryObjects.push(obj.getMappedObject());
    }
  }

  clearMappedObjects() {
    this.#mappedGeometryObjects = [];
  }

  /**
 * Changes the coordinates for the mapped geometry objects by rotating them with the given angle
 * @param {number} degrees 
 */
  rotateObjects(degrees) {
    const radians = (Math.PI / 180) * degrees;
    this.#rotateObjectsInRadians(radians);
  }

  #rotateObjectsInRadians(radians) {
    this.#rotation += radians;
    const rotatedObjects = [];
    for (const obj of this.#mappedGeometryObjects) {
      rotatedObjects.push(obj.getRotatedObject(radians))
    }
    this.#mappedGeometryObjects = rotatedObjects;
    this.renderOnCanvas();
  }

  /**
   * If the mapped obbject have been recreated after change of mapping ratio, check if they were rotated. 
   * If they were, rotate the newly mapped objects again.
   */
  #addOldRotationOnChange() {
    if (this.#rotation !== 0) {
      const previousRotation = this.#rotation;
      this.#rotation = 0;
      this.#rotateObjectsInRadians(previousRotation);
    }
  }

  /**
   * Resizes the sourcesystems dimensions to a size that fits all the current Geometry-objects.
   */
  fitObjectsInCanvas() {
    this.#mapper.changeSourceAxesIntervals(
      this.#getMinXOfObjects(),
      this.#getMaxXOfObjects(),
      this.#getminYOfObjects(),
      this.#getMaxYOfObjects()
    );
    
    this.#resizeCanvasIfNeeded(this.#canvasContext.canvas, this.#mapper.sourceSystem);
    console.log(this.#canvasContext.canvas.width, this.#canvasContext.canvas.height)
    this.#mapper.updateMappingRatios();

    this.clearMappedObjects();
    
    this.mapObjects();
    this.#addOldRotationOnChange();
    this.renderOnCanvas()
  }

  /**
   * Renders all the mapped geometryobjects on the canvas. 
   */
  renderOnCanvas() {
    this.#canvasContext.reset();
    for (const obj of this.#mappedGeometryObjects) {
      obj.renderObject(this.#canvasContext);
    }
  }

  showCenter() {
    const center = this.mapper.sourceSystem.centerPoint;
    center.strategy = new PointStrategy(this.mapper);
    center.getMappedObject().renderObject(this.#canvasContext);
  }

  harmonizeScales() {
    this.#mapper.harmonizeSourceScales();
    this.#mapper.harmonizeTargetScales();

    
    this.clearMappedObjects();
    this.mapObjects();
    this.#addOldRotationOnChange();
    this.renderOnCanvas();
  }

  #getMinXOfObjects() {
    return Math.min(...this.#geometryObjects.map(obj => obj.minX));
  }

  #getMaxXOfObjects() {
    return Math.max(...this.#geometryObjects.map(obj => obj.maxX));
  }

  #getminYOfObjects() {
    return Math.min(...this.#geometryObjects.map(obj => obj.minY));
  }

  #getMaxYOfObjects() {
    return Math.max(...this.#geometryObjects.map(obj => obj.maxY));
  }
}