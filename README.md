# LandScape 
A library for mapping points between different sized coordinates systems. Translates points from your specific coordinatesystem to a HTML canvas in desired dimension. The use case in my mind was to be able to draw a map of a piece of land on a canvas. The coordinates of the corners of the land are known. But the canvas is in a different coordinate system. By define the Coordinate system and pass in a canvas, and add geometric objects like Point and Polygon (polygon is good for land borders), the library will map the coordinates to the canvas and show the geometric objects. 
As it is possible to add points and lines in a coordinate system, it is also possible to use it to draw graphs. (also shown in demo when you try the library). It is maybe not the easiest way to draw graphs, and definitely not the best way, but it is possible. I intende to implement some ways to measure distance between points and lines but it is not a thing you can do right now.

## Note
The main use case for this is probably not difficult to do directly in canvas. So basically it is a strange way to do normal simple things. 
Be aware of the 'interfaces' in the src/strategy folder. It is my way of keeping the geometric objects as free from knowledge of their use as possible and also heavily reduce the number of switch statements. It might be more challenging to immidiately understand the code anyway.

## Installation
clone the repo: https://github.com/joberg2020/LandScape.git
run `npm install` in the root folder.
run 'npm run dev' to try it out.

## Usage
Let say that you have a piece of land and you only have coordinates for the corners of the land. You want to draw a map of your land. But the coordinates are in a coordinate system that is different from the coordinate system of the canvas you want to draw on. Then you can use this library to map the coordinates to the canvas.

### Example (also shown in demo, index.js, index.html)
```js
// Define your Intervals for the Axes in your source Coordinate System. Lets say you have a map of an odd system.
// Example: A coordinate system with axes x and y in range [400, 600] respectively. Both axes are normally scaled. Also the y-axis is in opposite direction of a standard cartesian system.

const xRange = new Interval(400, 600);
const yRange = new Interval(400, 600);

// The intervals are used as arguments to the Axis constructor.
let xAxis = new Axis(xRange, 1);
let yAxis = new Axis(yRange, 1, true);  // Y-axis is upside-down in this system.

// Create the source coordinate system.
const source = new CoordinateSystem({xAxis: xAxis, yAxis: yAxis});

// Now pass in the source coordinate system and the canvas you want to use to the Renderer constructor. 
renderer = new Renderer(source, targetCanvas);

// The renderer constructor will create a Mapper-instance that keeps track of the mapping between the source and target coordinate systems.
const mapper = renderer.mapper;

// Because of some design reasons you will also have to create instances of the strategy classes for the geometric objects you want to draw.
// The mapper-instance will need to be passed in to the strategy constructors.
const pointStrat = new PointStrategy(mapper); 
const polygonStrat = new PolygonStrategy(mapper);
const circleStrat = new CircleStrategy(mapper);

// Create and input your points and other geometry objects in the source system. 
let point1 = new Point(500, 500, pointStrat);
renderer.add(point1);
let point2 = new Point(451.21, 501.46, pointStrat);
renderer.add(point2);
renderer.add(new Circle(point2,5,circleStrat));

// The polygon strategy-constructor is not perfect. It needs to have a strategi as first argument because of the rest-parameter for points. 
let polygon = new Polygon(
  polygonStrat, 
  new Point(506.47, 487.6, pointStrat), 
  new Point(502.61, 515.51, pointStrat), 
  new Point(487.95, 549.69, pointStrat), 
  new Point(439.05, 528.87, pointStrat), 
  new Point(429.90, 484.37, pointStrat));
renderer.add(polygon);

// When you have added all geometric objects you want to draw, you need to map them to the canvas coordinate system.
// Map all geometric objects from the source coordinate system to the canvas coordinate system
renderer.mapObjects();


// Render the mapped objects on the canvas
renderer.renderOnCanvas();

```
