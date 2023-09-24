import { Point } from './Point.js';
import { Mapper } from './Mapper.js';
import { CoordinateSystem } from './CoordinateSystem.js';
import { Axis } from './Axis.js';
import { Interval } from './Interval.js';
import { Circle } from './Circle.js';
import { Polygon } from './Polygon.js';
import { Line } from './Line.js';
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
   * 
   * @param {HTMLCanvasElement} canvasElement 
   */
  constructor(coordinateSystem, canvasElement) {
    if (!(canvasElement instanceof HTMLCanvasElement)) {
      throw new Error('The argument has to be a HTMLCanvasElement');
    } else {
      this.#resizeCanvasIfNeeded(canvasElement, coordinateSystem);
      this.#canvasContext = canvasElement.getContext('2d');
      coordinateSystem.normalizeScales();
      // Create the Mapper
      this.#initializeMapper(coordinateSystem, canvasElement);
      this.#addEventListeners(canvasElement);
    }
  }

  /**
   * If source coordinate system has different width/height ratio compared to canvas, the canvas height will be adjusted to force the same ratio for canvas. 
   * Canvas width will be the same as before.
   * @param {HTMLCanvasElement} canvas 
   * @param {CoordinateSystem} sourceSystem 
   */
  #resizeCanvasIfNeeded(canvas, sourceSystem) {
    const ratioSource = sourceSystem.x.range.intervalLength / sourceSystem.y.range.intervalLength
    const ratioTarget = canvas.width / canvas.height
    console.log('ratioSOurce: ', ratioSource, ' ratioTarget: ', ratioTarget)
    if (ratioSource !== ratioTarget) {
      ratioSource == 1 ? canvas.setAttribute('height', canvas.width) : 
        canvas.setAttribute('height', canvas.width*ratioSource);
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

  #addEventListeners(canvas) {
    canvas.addEventListener('click', this.printSourceCoordinate.bind(this));
  }

  printSourceCoordinate(event) {
    const rect = event.target.getBoundingClientRect();
    const targetPoint = new Point(event.clientX - rect.left, event.clientY - rect.top, new PointStrategy(this.mapper));
    const unRotatedPoint = targetPoint.getRotatedObject(-this.#rotation);
    const sourcePoint = this.#mapper.unMapPoint(unRotatedPoint);
    console.log('x: ', sourcePoint.x, '\ny: ', sourcePoint.y);
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

  /**
   * Resizes the sourcesystems dimensions to suitable size for the current GEometry-objects.
   */
  fitObjectsInCanvas() {
    this.#mapper.changeSourceAxesIntervals(
      this.#getMinXOfObjects(),
      this.#getMaxXOfObjects(),
      this.#getminYOfObjects(),
      this.#getMaxYOfObjects()
    );
    this.#canvasContext.reset();
    this.#resizeCanvasIfNeeded(this.#canvasContext.canvas, this.#mapper.sourceSystem);
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

  renderOnCanvas() {
    for (const obj of this.#mappedGeometryObjects) {
      obj.renderObject(this.#canvasContext);
    }
  }

  showCenter() {
    const center = this.mapper.sourceSystem.centerPoint;
    const thatPoint = new Point(center.x, center.y, new PointStrategy(this.mapper));
    // render mapped point
    thatPoint
    .getMappedObject()
    .renderObject(this.#canvasContext);
    // render unmapped point
    thatPoint.renderObject(this.#canvasContext);
    console.log("Center point:", thatPoint);
  }

  /**
   * Changes the coordinates for the mapped geometry objects by rotating them with the given angle
   * @param {number} degrees 
   */
  rotateObjects(degrees) {
    const radians = (Math.PI/180)* degrees;
    this.#rotation += radians;
    const rotatedObjects = [];
    for (const obj of this.#mappedGeometryObjects) {
      rotatedObjects.push(obj.getRotatedObject(radians)) 
    }
    this.#mappedGeometryObjects = rotatedObjects;
    this.#canvasContext.reset();
    this.renderOnCanvas();
  }

  #renderLine(line) {
    this.#canvasContext.moveTo(line.startPoint.x, line.startPoint.y);
    this.#canvasContext.lineTo(line.endPoint.x, line.endPoint.y);
    this.#canvasContext.stroke();
  }

  #renderRectangle(rectangle) {
    this.#canvasContext.beginPath;
    this.#canvasContext.rect(rectangle.startingPoint.x, rectangle.startingPoint.y, rectangle.width, rectangle.height);
    this.#canvasContext.stroke();
  }

  harmonizeScales() {
    this.#mapper.harmonizeSourceScales();
    this.#mapper.harmonizeTargetScales();

  }

}