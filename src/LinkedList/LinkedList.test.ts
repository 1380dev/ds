import { LinkedList } from './index';

describe('LinkedList', () => {
  describe('new LinkedList()', () => {
    let list: LinkedList<number>;

    beforeEach(() => {
      list = new LinkedList();
    });

    test('addAfter(2, 1) must throw an error', () => {
      expect(() => list.addAfter(2, 1)).toThrowErrorMatchingSnapshot();
      expect(list.length).toBe(0);
    });

    test('addAfter(0, 1) must add 1', () => {
      list.push(2);
      list.addAfter(0, 1);
      expect(list.at(1)).toBe(1);
      expect(list.fist()).toBe(2);
      expect(list.length).toBe(2);
    });

    test('ushift() must add 1 at start', () => {
      list.unshift(1);
      expect(list.at(0)).toBe(1);
    });

    test('length must be 0', () => {
      expect(list.length).toBe(0);
    });

    test('head must be null', () => {
      expect(list.fist()).toBe(null);
    });

    test('tail must be null', () => {
      expect(list.last()).toBe(null);
    });

    test('pop must throw an error', () => {
      expect(() => list.pop()).toThrowErrorMatchingSnapshot();
    });

    test('shift must throw an error', () => {
      expect(() => list.shift()).toThrowErrorMatchingSnapshot();
    });

    test('at(0) must throw an error', () => {
      expect(() => list.at(0)).toThrowErrorMatchingSnapshot();
    });

    test('isEmty() must return true', () => {
      expect(list.isEmpy()).toBe(true);
    });

    test('toArray() must return an empty array', () => {
      expect(list.toArray().length).toBe(0);
    });
  });
  describe('new LinkedList([1, 2, 3, 4])', () => {
    let list: LinkedList<number>;

    beforeEach(() => {
      list = new LinkedList([1, 2, 3, 4]);
    });

    test('removeAt(2) must delete third element', () => {
      list.removeAt(2);
      expect(list.at(2)).toBe(4);
      expect(list.length).toBe(3);
    });

    test('removeAt(6) must throw an error', () => {
      expect(() => list.removeAt(6)).toThrowErrorMatchingSnapshot();
    });

    test('removeAt(-6) must throw an error', () => {
      expect(() => list.removeAt(-6)).toThrowErrorMatchingSnapshot();
    });

    test('for of must work', () => {
      const arr: number[] = [];

      for (const num of list) {
        arr.push(num);
      }

      expect(arr[0]).toBe(1);
      expect(arr[3]).toBe(4);
    });

    test('reduce() must return correct sum', () => {
      const sum = list.reduce((acc, el) => acc + el, 0);

      expect(sum).toBe(10);
    });

    test('map() must return new LinkedList with correct values', () => {
      const newList = list.map((el) => el * 2);

      expect(newList.at(0)).toBe(2);
      expect(newList.at(3)).toBe(8);
    });

    test('forEach()', () => {
      const array: number[] = [];

      list.forEach((el) => array.push(el));

      expect(array[0]).toBe(1);
    });

    test('length must be 4', () => {
      expect(list.length).toBe(4);
    });

    test('head must be 1', () => {
      expect(list.fist()).toBe(1);
    });

    test('tail must be 4', () => {
      expect(list.last()).toBe(4);
    });

    test('pop must return 4', () => {
      expect(list.pop()).toBe(4);
      expect(list.length).toBe(3);
    });

    test('shift must return 1', () => {
      expect(list.shift()).toBe(1);
      expect(list.length).toBe(3);
    });

    test('at(0) must return 2', () => {
      expect(list.at(0)).toBe(1);
    });

    test('isEmty() must return false', () => {
      expect(list.isEmpy()).toBe(false);
    });

    test('toArray() must return [2, 3]]', () => {
      expect(list.toArray().at(1)).toBe(2);
      expect(list.toArray().at(3)).toBe(4);
    });
  });
  describe("new LinkedList('string')", () => {
    let list: LinkedList<string>;

    beforeEach(() => {
      list = new LinkedList('string');
    });

    test('length must be 1', () => {
      expect(list.length).toBe(1);
    });

    test("head must be 'string'", () => {
      expect(list.fist()).toBe('string');
    });

    test("tail must be 'string'", () => {
      expect(list.last()).toBe('string');
    });

    test("pop must return 'string'", () => {
      expect(list.pop()).toBe('string');
      expect(list.length).toBe(0);
    });

    test("shift must return 'string'", () => {
      expect(list.shift()).toBe('string');
      expect(list.length).toBe(0);
    });

    test('length must be 1', () => {
      expect(list.length).toBe(1);
    });

    test("at(0) must return 'string'", () => {
      expect(list.at(0)).toBe('string');
    });

    test('isEmty() must return false', () => {
      expect(list.isEmpy()).toBe(false);
    });

    test("toArray() must return ['string']]", () => {
      expect(list.toArray().at(0)).toBe('string');
      expect(list.toArray().at(3)).toBe(undefined);
    });
  });
  describe('LinkedList.from([[1,2] [2,3], [3,4]])', () => {
    let list: LinkedList<number[]>;

    beforeEach(() => {
      list = LinkedList.from([
        [1, 2],
        [2, 3],
        [3, 4],
      ]);
    });

    test('length must be 3', () => {
      expect(list.length).toBe(3);
    });

    test('must add [0, 1] at start', () => {
      list.unshift([0, 1]);
      expect(list.fist()?.at(0)).toBe(0);
      expect(list.fist()?.at(1)).toBe(1);
      expect(list.length).toBe(4);
    });

    test('search() must retrun 0', () => {
      const a = [0, 0];
      list.unshift(a);

      expect(list.search(a)).toBe(0);
    });

    test('search() must retrun 4', () => {
      const a = [0, 0];
      list.push(a);

      expect(list.search(a)).toBe(3);
    });

    test('at 2 must be [3,4]', () => {
      expect(list.at(2).at(0)).toBe(3);
      expect(list.at(2).at(1)).toBe(4);
    });

    test('clear must remove all elements', () => {
      list.clear();
      expect(list.length).toBe(0);
      expect(list.fist()).toBe(null);
      expect(list.last()).toBe(null);
    });
  });
});
