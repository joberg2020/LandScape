import { Point } from '../../src/classes/Point.js';
import { CoordinateSystem } from '../../src/classes/CoordinateSystem.js';
import { Axis } from '../../src/classes/Axis.js';
import { Interval } from '../../src/classes/Interval.js';

describe('Testing functions of the Axis-class', () => {
  describe('Testing constructor', () => {
    it('should throw an error if the range is not an Interval-object', () => {
      expect(() => new Axis('1')).toThrowError('The range must be an Interval.');
    });
    it('should set the correct range', () => {
      const range = new Interval(0, 10);
      const axis = new Axis(range);
      expect(axis.range).toBe(range);
    });
    it('should set the correct scale', () => {
      const axis = new Axis(new Interval(0, 10));
      expect(axis.scale).toBe(1);
    });
    it('should recieve scale as a parameter', () => {
      const axis = new Axis(new Interval(0, 10), 2);
      expect(axis.scale).toBe(2);
    });
    it('should throw an error if the scale is not a number', () => {
      expect(() => new Axis(new Interval(0, 10), '2')).toThrowError('The scale must be a positive number larger than 0');
    });
    it('should throw an error if the scale is not a positive number', () => {
      expect(() => new Axis(new Interval(0, 10), -2)).toThrowError('The scale must be a positive number larger than 0');
    });
    it('should set the correct isReversed', () => {
      const axis = new Axis(new Interval(0, 10));
      expect(axis.isReversed).toBe(false);
    });
    it('should recieve isReversed as a parameter', () => {
      const axis = new Axis(new Interval(0, 10), 1, true);
      expect(axis.isReversed).toBe(true);
    });
  });
  describe('Testing contains', () => {
    it('should return true if the value is within the range', () => {
      const axis = new Axis(new Interval(0, 10));
      expect(axis.contains(5)).toBe(true);
    });
    it('should return false if the value is not within the range', () => {
      const axis = new Axis(new Interval(0, 10));
      expect(axis.contains(11)).toBe(false);
    });
  });
  describe('Testing range', () => {
    it('should set the correct range', () => {
      const axis = new Axis(new Interval(0, 10));
      const newRange = new Interval(0, 20);
      axis.range = newRange;
      expect(axis.range).toBe(newRange);
    });
    it('should throw an error if the range is not an Interval-object', () => {
      const axis = new Axis(new Interval(0, 10));
      expect(() => axis.range = '1').toThrowError('The range must be an Interval.');
    });
  });
});