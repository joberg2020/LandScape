# LandScape 
A library for mapping points between different sized coordinates systems. Translates points from your specific coordinatesystem to a HTML canvas in desired dimension. 

# Note
The main use case for this is probably not difficult to do directly in canvas. But it is a nice excercise in math and programming.

## Usage
Let say that you have a piece of land and you only have coordinates for the corners of the land. You want to draw a map of your land. But the coordinates are in a coordinate system that is different from the coordinate system of the canvas you want to draw on. Then you can use this library to map the coordinates to the canvas.
```js
// Define your Intervals for the Axes in your source Coordinate System:
// Example: A coordinate system with axes x and y in range [400, 600] respectively. Both axes are normally scaled. Also the y-axis is in opposite direction of a standard cartesian system.



polygon = new Polygon([506.47, 


```
