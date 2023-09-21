export class Renderer {

  /** 
  @type {CanvasRenderingContext2D} canvasContext 
  */
  #canvasContext;
  #mapper;
  #geometryObjects = [];
  #mappedGeometryObjects = [];

  /**
   * 
   * @param {HTMLCanvasElement} canvaseElement 
   */
  contructor(coordinateSystem, canvaseElement) {
    if (!(canvaseElement instanceof HTMLCanvasElement)) {
      throw new Error('The argument has to be a HTMLCanvasElement');
    } else {
      this.#canvasContext = canvaseElement.getContext(contextId = '2d');
      this.#initializeMapper(coordinateSystem, canvaseElement);
    }
  }

  #initializeMapper(sourceSystem, canvas) {
    this.#mapper = new Mapper(sourceSystem, 
      new CoordinateSystem(
        new Axis(range = new Interval(0, canvas.width), 
        new Axis(range = new Interval(0, canvas.height, isReversed = true))
        )));
  }

  add(geometryObject) {
    this.#geometryObjects.push(geometryObject)
  }

  mapObjects() {
    for (obj of this.#geometryObjects) {
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

  

}