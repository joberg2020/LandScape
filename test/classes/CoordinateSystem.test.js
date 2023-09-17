import { Point } from '../../src/classes/Point.js';
import { CoordinateSystem } from '../../src/classes/CoordinateSystem.js';
import { Axis } from '../../src/classes/Axis.js';
import { Interval } from '../../src/classes/Interval.js';

describe('Testing functions of the CoordinateSystem-class', () => {
  describe('Testing constructor', () => {
    it('should throw an error if the axes are not Axis-objects', () => {
      expect(() => new CoordinateSystem({ xAxis: '1', yAxis: '2' })).toThrowError('The axes must be Axis-objects');
    });
    it('should throw an error if the given origo is not within the range of the axes', () => {
      const xAxis = new Axis(new Interval(0, 10));
      const yAxis = new Axis(new Interval(0, 10));
      const origo = new Point(11, 11);
      expect(() => new CoordinateSystem({ xAxis, yAxis, origo })).toThrowError('The origo must be within the range of the coordinate system');
    });
    it('should set the origo to (0, 0) if origo is null and (0, 0) is within the range of the axes', () => {
      const xAxis = new Axis(new Interval(0, 10));
      const yAxis = new Axis(new Interval(0, 10));
      const expectedOrigo = new Point(0, 0);
      const coordinateSystem = new CoordinateSystem({ xAxis, yAxis });
      expect(coordinateSystem.origo.equals(expectedOrigo)).toBe(true);
    });
    it('should set the origo to the center of the ranges of the axes if origo is null and (0, 0) is not within the range of the axes', () => {
      const xAxis = new Axis(new Interval(2, 10));
      const yAxis = new Axis(new Interval(2, 10));
      const expectedOrigo = new Point(6, 6);
      const coordinateSystem = new CoordinateSystem({ xAxis, yAxis });
      expect(coordinateSystem.origo.equals(expectedOrigo)).toBe(true);
    });
    it('should return the correct autoAdjustOrigo', () => {
      const xAxis = new Axis(new Interval(0, 10));
      const yAxis = new Axis(new Interval(0, 10));
      const coordinateSystem = new CoordinateSystem({ xAxis, yAxis, autoAdjustOrigo: true });
      expect(coordinateSystem.autoAdjustOrigo).toBe(true);
    });
    it('should throw an error if the autoAdjustOrigo is not a boolean', () => {
      const xAxis = new Axis(new Interval(0, 10));
      const yAxis = new Axis(new Interval(0, 10));
      expect(() => new CoordinateSystem({ xAxis, yAxis, autoAdjustOrigo: 'true' })).toThrowError('The autoAdjustOrigo property must be a boolean');
    });
  });
  describe('Testing getters', () => {
    it('should return the correct axes', () => {
      const xAxis = new Axis(new Interval(0, 10));
      const yAxis = new Axis(new Interval(0, 10));
      const coordinateSystem = new CoordinateSystem({ xAxis, yAxis });
      expect(coordinateSystem.x).toBe(xAxis);
      expect(coordinateSystem.y).toBe(yAxis);
    });
    it('should return the correct origo', () => {
      const xAxis = new Axis(new Interval(0, 10));
      const yAxis = new Axis(new Interval(0, 10));
      const origo = new Point(5, 5);
      const coordinateSystem = new CoordinateSystem({ xAxis, yAxis, origo });
      expect(coordinateSystem.origo).toBe(origo);
    });
  });
  describe('Testing setters', () => {
    it('should set the correct axes', () => {
      const xAxis = new Axis(new Interval(0, 10));
      const yAxis = new Axis(new Interval(0, 10));
      const coordinateSystem = new CoordinateSystem({ xAxis, yAxis });
      const newXAxis = new Axis(new Interval(0, 20));
      const newYAxis = new Axis(new Interval(0, 20));
      coordinateSystem.x = newXAxis;
      coordinateSystem.y = newYAxis;
      expect(coordinateSystem.x).toBe(newXAxis);
      expect(coordinateSystem.y).toBe(newYAxis);
    });
    it('should throw an error if the axes are not Axis-objects', () => {
      const xAxis = new Axis(new Interval(0, 10));
      const yAxis = new Axis(new Interval(0, 10));
      const coordinateSystem = new CoordinateSystem({ xAxis, yAxis });
      expect(() => coordinateSystem.x = '1').toThrowError('The axes must be Axis-objects');
      expect(() => coordinateSystem.y = '2').toThrowError('The axes must be Axis-objects');
    });
  });
  describe('Testing functions', () => {
    it('should return true if the given point is within the coordinate system', () => {
      const xAxis = new Axis(new Interval(0, 10));
      const yAxis = new Axis(new Interval(0, 10));
      const coordinateSystem = new CoordinateSystem({ xAxis, yAxis });
      const point = new Point(5, 5);
      expect(coordinateSystem.contains(point)).toBe(true);
    });
    it('should return false if the given point is not within the coordinate system', () => {
      const xAxis = new Axis(new Interval(0, 10));
      const yAxis = new Axis(new Interval(0, 10));
      const coordinateSystem = new CoordinateSystem({ xAxis, yAxis });
      const point = new Point(11, 11);
      expect(coordinateSystem.contains(point)).toBe(false);
    });
  });
});
