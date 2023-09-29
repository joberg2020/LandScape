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

import { Line } from './classes/Line.js';
import { LineStrategy } from './strategies/LineStrategy.js';

// Demonstration of the complicated use of this stuff. You need to create the geometric objects and the coordinate system that you use. 
// And also a strategy-instance of the kinds of geometric objects you use. They can share the same, i.e. all circles can use the same 'CircleStrategy', you´ll see. 
// Most of the interaction are through the Renderer

let renderer;
const canvas = document.getElementById('targetCanvas');

// Demo of Use to show a map of a plot of land
// In this function I have created a replica of a plot of land. 
function showMap() {
  // Source-system data, it is good to start with the ranges of the x and y axes.
let xRange = new Interval(420, 510);
let yRange = new Interval(465, 560);

// The intervals are used as arguments to the Axis constructor.
let xAxis = new Axis(xRange, 1);
let yAxis = new Axis(yRange, 1, true);  // Y-axis is upside-down in my reference system (true)

// Create the source coordinate system.
const source = new CoordinateSystem({xAxis: xAxis, yAxis: yAxis});

// Now pass in the canvas you want to use as target-canvas to the Renderer constructor. 
renderer = new Renderer(source, targetCanvas);

// The renderer creates a mapper based on the two coordinate systems you just passed.
// Create the strategies for the geometric objects you intend to use. Pass the mapper-instance to the strategies
const pointStrat = new PointStrategy(renderer.mapper); 
const polygonStrat = new PolygonStrategy(renderer.mapper);
const circleStrat = new CircleStrategy(renderer.mapper);
// (Rectangles are not in order yet)

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

// Map all geometric objects from the source coordinate system to the canvas coordinate system
renderer.mapObjects();


// Render the mapped objects on the canvas
renderer.renderOnCanvas();
}

// Example for showing a graph (another use case)
function showGraph() {
  // Create coordinatesystem:
  const source = new CoordinateSystem({
    xAxis: new Axis(new Interval(-50, 50), 1),
    yAxis: new Axis(new Interval(-40, 40), 1)
  });
  
  // Create the renderer (variable already initialized)
  renderer = new Renderer(source, canvas);

  // Create Strategies and pass the mapper-object. 
  const pointStrat = new PointStrategy(renderer.mapper);
  const LineStrat = new LineStrategy(renderer.mapper);
  // Create the axes and lines for the axes
  const xAxis = new Line(new Point(-50, 0, pointStrat), new Point(50, 0, pointStrat), LineStrat);
  const yAxis = new Line(new Point(0, -50, pointStrat), new Point(0, 50, pointStrat), LineStrat);
  renderer.add(xAxis);
  renderer.add(yAxis);

  // Maybe create a function of some kind 
  const f = (x) => 5* Math.sin(x);//0.1*x*x - 30; //+2*Math.sqrt(x) - 10*x -3;

  // Creates points for your function and add to renderer
  for (let i = -50; i <= 50; i+= 0.001) {
    const p = new Point(i, f(i), pointStrat);
    renderer.add(p);
  }

  renderer.mapObjects();
  renderer.renderOnCanvas();
}

// Stuff used by both demo-functions
function getPointFromRenderer(event) {
  const clickedPoint = renderer.getSourcePointFromCanvasEvent(event)
  xOutput.textContent = 'x: ' + clickedPoint.x;
  yOutput.textContent = 'y: ' + clickedPoint.y
}
canvas.addEventListener('click', getPointFromRenderer);
// some functions for the buttons
function rotate() {
  renderer.rotateObjects(90);
}

function harmonize() {
  renderer.harmonizeScales();
}

function showCenter() {
  renderer.showCenter();
}

function zoom() {
  renderer.zoom(1.2);
}

const xOutput = document.getElementById('xValue');
const yOutput = document.getElementById('yValue');

const landMapButton = document.getElementById('landMap');
const graphButton = document.getElementById('graphButton');
const rotateButton = document.getElementById('rotateButton');
const showButton = document.getElementById('showCenter');
const harmonizeButton = document.getElementById('harmonizeButton');
const zoomButton = document.getElementById('zoom');

landMapButton.addEventListener('click', showMap);
graphButton.addEventListener('click', showGraph);
rotateButton.addEventListener('click', rotate);
showButton.addEventListener('click', showCenter);
harmonizeButton.addEventListener('click', harmonize);
zoomButton.addEventListener('click', zoom);