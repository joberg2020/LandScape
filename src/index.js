import { Point } from './classes/Point.js';
import { Interval } from './classes/Interval.js';
import { CoordinateSystem } from './classes/CoordinateSystem.js';
import { Axis } from './classes/Axis.js';
import { Renderer } from './classes/Renderer.js';
import { Mapper } from './classes/Mapper.js';
import { Circle } from './classes/Circle.js';
import { Polygon } from './classes/Polygon.js';

function rotate() {
  renderer.rotateObjects(90);
  console.log('The current centerPoint: ', source.centerPoint);
}

function fitToCanvas() {
  renderer.fitObjectsInCanvas();
}
const canvas = document.getElementById('targetCanvas');
const rotateButton = document.getElementById('rotateButton');
const fitButton = document.getElementById('fitToCanvas');
rotateButton.addEventListener('click', rotate);
fitButton.addEventListener('click', fitToCanvas);

// let xRange = new Interval(420, 510);
// let yRange = new Interval(480, 555);
let xRange = new Interval(300, 510);
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
console.log('Renderer: ', renderer);
// Create and input your points and other geometry objects in the source system. 
let point1 = new Point(500, 500);
renderer.add(point1);
let point2 = new Point(451.21, 501.46);
renderer.add(point2);

let polygon = new Polygon(new Point(506.47, 487.6), new Point(502.61, 515.51), new Point(487.95, 549,69), new Point(439.05, 528.87), new Point(429.90, 484.37));
renderer.add(polygon);
renderer.mapObjects();
//renderer.harmonizeScales();
renderer.renderOnCanvas();

//renderer.rotateObjects(-90);
renderer.showCenter();
// console.log(renderer);