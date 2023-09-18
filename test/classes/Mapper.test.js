import { Point } from '../../src/classes/Point.js';
import { CoordinateSystem } from '../../src/classes/CoordinateSystem.js';
import { Axis } from '../../src/classes/Axis.js';
import { Interval } from '../../src/classes/Interval.js';
import { Mapper } from '../../src/classes/Mapper.js';

describe('Testing functions of the Mapper-class', () => {
  const sourceSystem = new CoordinateSystem({ xAxis: new Axis(new Interval(0, 10)), yAxis: new Axis(new Interval(0, 20)) });
  const targetSystem = new CoordinateSystem({ xAxis: new Axis(new Interval(0, 20)), yAxis: new Axis(new Interval(0, 10)) });
  describe('Testing constructor', () => {
    it('should throw an error if the sourceSystem is not a CoordinateSystem-object', () => {
      expect(() => new Mapper('1', targetSystem)).toThrowError('The sourceSystem must be a CoordinateSystem-object');
    });
    describe('MappingRatioX should be correctly initialized', () => {
      it('should be positive (2) if the axes are not reversed', () => {
        const mapper = new Mapper(sourceSystem, targetSystem);
        expect(mapper.mappingRatioX).toBe(2);
      });
      it('should be negative (-0.5) if the axes are reversed', () => {
        const mapper = new Mapper(new CoordinateSystem({ xAxis: new Axis(new Interval(0, 10)), yAxis: new Axis(new Interval(0, 20), 1, true) }), targetSystem);
        expect(mapper.mappingRatioY).toBe(-0.5);
      });
    });
  });
  describe('Testing getters', () => {
    it('should return the correct sourceSystem', () => {
      const mapper = new Mapper(sourceSystem, targetSystem);
      expect(mapper.sourceSystem).toBe(sourceSystem);
    });
    it('should return the correct targetSystem', () => {
      const mapper = new Mapper(sourceSystem, targetSystem);
      expect(mapper.targetSystem).toBe(targetSystem);
    });
    it('should return the correct mappingRatioX', () => {
      const mapper = new Mapper(sourceSystem, targetSystem);
      expect(mapper.mappingRatioX).toBe(2);
    });
    it('should return the correct mappingRatioY', () => {
      const mapper = new Mapper(sourceSystem, targetSystem);
      expect(mapper.mappingRatioY).toBe(0.5);
    });
  });
  describe('Testing mapPoint', () => {
    it('should return the correct mapped point', () => {
      const targetSystem = new CoordinateSystem({ xAxis: new Axis(new Interval(0, 300), 1, false), yAxis: new Axis(new Interval(0, 150), 1, true) });
      const sourceSystem = new CoordinateSystem({ xAxis: new Axis(new Interval(-10, 10)), yAxis: new Axis(new Interval(100, 200)) });
      const mapper = new Mapper(sourceSystem, targetSystem);
      const point = new Point(10, 100);
      const mappedPoint = mapper.mapPoint(point);
      expect(mappedPoint.x).toBe(300);
      expect(mappedPoint.y).toBe(150);
    });
  });
});
