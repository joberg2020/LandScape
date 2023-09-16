import { Point } from '../../src/classes/Point.js';

describe('Testing functions of the Point-class', () => {
  describe('Testing constructor', () => {
    it('should throw an error if the coordinates are not numbers', () => {
      expect(() => new Point('1', 2)).toThrowError('The coordinates must be numbers');
      expect(() => new Point(1, '2')).toThrowError('The coordinates must be numbers');
    });
  });
  describe('Testing getters', () => {
    it('should return the correct coordinates', () => {
      const point = new Point(1, 2);
      expect(point.x).toBe(1);
      expect(point.y).toBe(2);
    });
  });
}
);