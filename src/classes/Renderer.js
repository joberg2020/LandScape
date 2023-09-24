import { Point } from './Point.js';
import { Mapper } from './Mapper.js';
import { CoordinateSystem } from './CoordinateSystem.js';
import { Axis } from './Axis.js';
import { Interval } from './Interval.js';
import { Circle } from './Circle.js';
import { Polygon } from './Polygon.js';
import { Line } from './Line.js';


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
      this.#initializeMapper(coordinateSystem, canvasElement);
      this.#addEventListeners(canvasElement);
    }
  }

  /**
   * If source coordinate system has different width/height ratio compared to canvas, the canvas haight will be adjusted to force the same ratio for canvas. 
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
    const targetPoint = new Point(event.clientX - rect.left, event.clientY - rect.top);
    this.#mapper.rotatePoint(targetPoint, -this.#rotation)
    const sourcePoint = this.#mapper.unMapPoint(targetPoint);
    console.log('x: ', sourcePoint.x, '\ny: ', sourcePoint.y);
  }

  add(geometryObject) {
    this.#geometryObjects.push(geometryObject)
  }

  mapObjects() {
    for (const obj of this.#geometryObjects) {
      if (obj instanceof Point) {
        this.#mappedGeometryObjects.push(this.#mapper.mapPoint(obj));
      }
      else if (obj instanceof Circle) {
        this.#mappedGeometryObjects.push(this.#mapper.mapCircle(obj));
      }
      else if (obj instanceof Polygon) {
        this.#mappedGeometryObjects.push(this.#mapper.mapPolygon(obj));
      }
      else if (obj instanceof Line) {
        this.#mappedGeometryObjects.push(this.#mapper.mapLine(obj));
      }
      else if (obj instanceof Rectangle) {
        this.#mappedGeometryObjects.push(this.#mapper.mapRectangle(obj));
      }
      else throw new Error('The object is not a known geometric object');
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
      if (obj instanceof Point) {
        this.#renderPoint(obj);
      }
      else if (obj instanceof Circle) {
        this.#renderCircle(obj);
      }
      else if (obj instanceof Polygon) {
        this.#renderPolygon(obj);
      }
      else if (obj instanceof Line) {
        this.#renderLine(obj);
      }
      else if (obj instanceof Rectangle) {
        this.#renderRectangle(obj);
      }
      else throw new Error('The object is not a known geometric object');
    }
  }

  showCenter() {
    this.#renderPoint(this.#mapper.mapPoint(this.#mapper.sourceSystem.centerPoint));
    this.#renderPoint(this.#mapper.sourceSystem.centerPoint);
  }

  /**
   * Changes the coordinates for the mapped geometry objects by rotating them with the given angle
   * @param {number} degrees 
   */
  rotateObjects(degrees) {
    const radians = (Math.PI/180)* degrees;
    this.#rotation += radians;
    
    for (const obj of this.#mappedGeometryObjects) {
      if (obj instanceof Point) {
        this.#mapper.rotatePoint(obj, radians);
      }
      else if (obj instanceof Circle) {
        
      }
      else if (obj instanceof Polygon) {
        this.#mapper.rotatePolygon(obj, radians);
      }
      else if (obj instanceof Line) {
        
      }
      else if (obj instanceof Rectangle) {
        
      }
      else throw new Error('The object is not a known geometric object');
    }
    this.#canvasContext.reset();
    this.renderOnCanvas();
  }

  #renderPoint(point) {
    this.#canvasContext.fillRect(point.x - 1, point.y - 1, 2, 2);
  }

  #renderCircle(circle) {
    this.#canvasContext.beginPath();
    this.#canvasContext.arc(circle.center.x, circle.center.y, circle.radius, 2 * Math.PI);
  }

  #renderPolygon(polygon) {
    let isFirst = true;
    let firstPoint = null;
    for (const p of polygon.listOfPoints) {
      if (isFirst) {
        this.#canvasContext.beginPath;
        this.#canvasContext.moveTo(p.x, p.y);
        firstPoint = p;
        isFirst = false;
      }
      this.#canvasContext.lineTo(p.x, p.y);
    }
    this.#canvasContext.lineTo(firstPoint.x, firstPoint.y);
    this.#canvasContext.stroke();
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