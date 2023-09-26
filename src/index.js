import { Point } from './classes/Point.js';
import { Interval } from './classes/Interval.js';
import { CoordinateSystem } from './classes/CoordinateSystem.js';
import { Axis } from './classes/Axis.js';
import { Renderer } from './classes/Renderer.js';
import { Circle } from './classes/Circle.js';
import { Polygon } from './classes/Polygon.js';
import { PointStrategy } from './strategies/PointStrategy.js';
import { PolygonStrategy } from './strategies/PolygonStrategy.js';
import { CircleStrategy } from './strategies/CircleStrategy.js';
import { RectangleStrategy } from './strategies/RectangleStrategy.js';
import { Rectangle } from './classes/Rectangle.js';
import { Line } from './classes/Line.js';
import { LineStrategy } from './strategies/LineStrategy.js';

// Demonstration of the complicated use of this stuff. You need to create the geometric objects and the coordinate system that you use. 
// And also a strategy-instance of the kinds of geometric objects you use. They can share the same, i.e. circles can use the same 'CircleStrategy', you´ll see. 
// Most of the interaction are through the Renderer

let renderer;

// In this function I have created a replica of a plot of land. 
function showMap() {
  // Source-system data, it is good to start with the ranges of the x and y axes.
let xRange = new Interval(420, 510);
let yRange = new Interval(475, 560);

// The intervals are used as arguments to the Axis constructor.
let xAxis = new Axis(xRange, 1);
let yAxis = new Axis(yRange, 1, true);

// Create the source coordinate system.
const source = new CoordinateSystem({xAxis: xAxis, yAxis: yAxis});

// Now pass in the canvas you want to use as target-canvas to the Renderer constructor. 
renderer = new Renderer(source, targetCanvas);

// The renderer creates a mapper based on the two coordinate systems you just passed.
// Create the strategies for the geometric objects you intend to use. Pass the mapper-instance to the strategies
const pointStrat = new PointStrategy(renderer.mapper); 
const polygonStrat = new PolygonStrategy(renderer.mapper);
const circleStrat = new CircleStrategy(renderer.mapper);
// const rectangleStrat = new RectangleStrategy(renderer.mapper); // Rectangles are not in order yet

// Create and input your points and other geometry objects in the source system. 
let point1 = new Point(500, 500, pointStrat);
renderer.add(point1);
let point2 = new Point(451.21, 501.46, pointStrat);
renderer.add(point2);
renderer.add(new Circle(point2,5,circleStrat));
// renderer.add(new Rectangle(point2,10,5,rectangleStrat));

// The polygon strategy-constructor is not perfect. It needs to have a strategi first because of the rest-parameter for points. 
let polygon = new Polygon(
  polygonStrat, 
  new Point(506.47, 487.6, pointStrat), 
  new Point(502.61, 515.51, pointStrat), 
  new Point(487.95, 549.69, pointStrat), 
  new Point(439.05, 528.87, pointStrat), 
  new Point(429.90, 484.37, pointStrat));
renderer.add(polygon);

// Map all geometric objects from the source coordinate system to the canvas coordinate system
renderer.mapObjects();

// Pass a callback for the clickOnCoordinate-event:
renderer.on('clickOnCoordinate', (event) => {
  xOutput.textContent = 'x: ' + event.x;
  yOutput.textContent = 'y: ' + event.y;
});

// Render the mapped objects on the canvas
renderer.renderOnCanvas();
}

// Example for showing a graph (another use case)
function showGraph() {

  // Create coordinatesystem:
  const source = new CoordinateSystem({
    xAxis: new Axis(new Interval(-50, 50), 1),
    yAxis: new Axis(new Interval(-50, 50), 1)
  });
  
  // Create the renderer (variable already initialized)
  renderer = new Renderer(source, canvas);

  // Create Strategies and pass the mapper-object. 
  const pointStrat = new PointStrategy(renderer.mapper);
  const LineStrat = new LineStrategy(renderer.mapper);
  // Create the lines for the axes
  const xAxis = new Line(new Point(-50, 0, pointStrat), new Point(50, 0, pointStrat), LineStrat);
  const yAxis = new Line(new Point(0, -50, pointStrat), new Point(0, 50, pointStrat), LineStrat);
  renderer.add(xAxis);
  renderer.add(yAxis);

  // Maybe create a function of some kind 
  const f = (x) => 0.1*x*x - 30; //+2*Math.sqrt(x) - 10*x -3;

  // Creates points and lines for your function and add to renderer
  for (let i = -50; i <= 50; i+= 0.1) {
    const p = new Point(i, f(i), pointStrat);
    const middleP = new Point(i + 0.05, f(i+0.05), pointStrat);
    renderer.add(new Line(p, middleP, LineStrat))
  }

  // The event
  renderer.on('clickOnCoordinate', (event) => {
    xOutput.textContent = 'x: ' + event.x;
    yOutput.textContent = 'y: ' + event.y;
  });

  renderer.mapObjects();
  renderer.renderOnCanvas();
}
// some functions for the buttons
function rotate() {
  renderer.rotateObjects(90);
}

function fitToCanvas() {
  renderer.fitObjectsInCanvas();
}
const showCenter = () => renderer.showCenter();

const xOutput = document.getElementById('xValue');
const yOutput = document.getElementById('yValue');
const canvas = document.getElementById('targetCanvas');
const landMapButton = document.getElementById('landMap');
const graphButton = document.getElementById('graphButton');
const rotateButton = document.getElementById('rotateButton');
const fitButton = document.getElementById('fitToCanvas');
const showButton = document.getElementById('showCenter');

landMapButton.addEventListener('click', showMap);
graphButton.addEventListener('click', showGraph);
rotateButton.addEventListener('click', rotate);
fitButton.addEventListener('click', fitToCanvas);
showButton.addEventListener('click', showCenter);