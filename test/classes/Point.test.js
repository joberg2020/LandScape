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
    describe('Testing equals function', () => {
      it('should return true on point with equal coordinates and false on unequal coordinates', () => {
        const point1 = new Point(1, -4);
        const point2 = new Point(1, -4);
        const point3 = new Point(1, 2);
        expect(point1.equals(point2)).toBe(true)
        expect (point1.equals(point3)).toBe(false);
      })
    })
  });
});