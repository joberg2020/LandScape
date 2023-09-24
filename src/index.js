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

function rotate() {
  renderer.rotateObjects(90);
  console.log('The current centerPoint: ', source.centerPoint);
}

function fitToCanvas() {
  renderer.fitObjectsInCanvas();
}

const showCenter = () => renderer.showCenter();

const canvas = document.getElementById('targetCanvas');
const rotateButton = document.getElementById('rotateButton');
const fitButton = document.getElementById('fitToCanvas');
const showButton = document.getElementById('showCenter');
rotateButton.addEventListener('click', rotate);
fitButton.addEventListener('click', fitToCanvas);
showButton.addEventListener('click', showCenter);

// let xRange = new Interval(420, 510);
// let yRange = new Interval(480, 555);
let xRange = new Interval(420, 510);
let yRange = new Interval(475, 560);
// The intervals are used as arguments to the Axis constructor.
const axesRatio = xRange.intervalLength / yRange.intervalLength;
let xAxis = new Axis(xRange, 1);
let yAxis = new Axis(yRange, 1, true);
// Create the source coordinate system.
const source = new CoordinateSystem({xAxis: xAxis, yAxis: yAxis});
console.log('Origin: ', source.origo);
console.log('CenterPoint: ', source.centerPoint);

// Now pass in the canvas you want to use as target-canvas to the Renderer constructor. 
console.log('Source to renderer: ', source);
console.log('TargetCanvas to Renderer: ', targetCanvas);
const renderer = new Renderer(source, targetCanvas);
const pointStrat = new PointStrategy(renderer.mapper); // Pass the mapper to strategy
const polygonStrat = new PolygonStrategy(renderer.mapper);
const circleStrat = new CircleStrategy(renderer.mapper);
const rectangleStrat = new RectangleStrategy(renderer.mapper);


// Create and input your points and other geometry objects in the source system. 
let point1 = new Point(500, 500, pointStrat);
renderer.add(point1);
let point2 = new Point(451.21, 501.46, pointStrat);
renderer.add(point2);
renderer.add(new Circle(point2,25,circleStrat));
renderer.add(new Rectangle(point2,10,5,rectangleStrat));

let polygon = new Polygon(
  polygonStrat, 
  new Point(506.47, 487.6, pointStrat), 
  new Point(502.61, 515.51, pointStrat), 
  new Point(487.95, 549.69, pointStrat), 
  new Point(439.05, 528.87, pointStrat), 
  new Point(429.90, 484.37, pointStrat));
renderer.add(polygon);
renderer.mapObjects();
//renderer.harmonizeScales();
renderer.renderOnCanvas();

//renderer.rotateObjects(-90);
renderer.showCenter();
// console.log(renderer);