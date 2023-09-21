# LandScape 
A library for mapping points between different sized coordinates systems. Translates points from your specific coordinatesystem to a HTML canvas in desired dimension.  

## Usage
```js
// Define your Intervals for the Axes in your source Coordinate System:
// Example: A coordinate system with x and y in range [400, 600] respectively. Both axes are normallyc scaled. Also the y-axis is in opposite direction of a standard cartesian system.
xRange = new Interval(400, 600);
yRange = new Interval(400, 600);
// The intervals are used as arguments to the Axis constructor.
xAxis = new Axis(xRange);
yAxis = new Axis(yRange, 1, true);
// Create the source coordinate system.
source = new CoordinateSystem({x: xAxis, y: yAxis});

// Now pass in the canvas you want to use as target-canvas to the Renderer constructor. 
canvas = document.getElementById('myCanvas');
renderer = new Renderer(canvas);

// Create and input your points and other geometry objects in the source system. 
point1 = new Point(500, 500);
renderer.add(point1);

polygon = new Polygon([506.47, 


```
