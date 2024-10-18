import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Multiply, expected: 4 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 4, b: 2, action: Action.Divide, expected: 2 },
  { a: 4, b: 2, action: Action.Exponentiate, expected: 16 },
  { a: 4, b: 2, action: null, expected: null },
  { a: 4, b: 'wrong argument', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('simpleCalculator table test', (rawInput) => {
    expect(simpleCalculator(rawInput)).toBe(rawInput.expected);
  });
});
