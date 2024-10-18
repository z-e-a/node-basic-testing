import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const rawInput = {
      a: 4,
      b: 2,
      action: Action.Add,
    };
    const result = simpleCalculator(rawInput);
    expect(result).toBe(6);
  });

  test('should subtract two numbers', () => {
    const rawInput = {
      a: 4,
      b: 2,
      action: Action.Subtract,
    };
    const result = simpleCalculator(rawInput);
    expect(result).toBe(2);
  });

  test('should multiply two numbers', () => {
    const rawInput = {
      a: 4,
      b: 2,
      action: Action.Multiply,
    };
    const result = simpleCalculator(rawInput);
    expect(result).toBe(8);
  });

  test('should divide two numbers', () => {
    const rawInput = {
      a: 4,
      b: 2,
      action: Action.Divide,
    };
    const result = simpleCalculator(rawInput);
    expect(result).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const rawInput = {
      a: 4,
      b: 2,
      action: Action.Exponentiate,
    };
    const result = simpleCalculator(rawInput);
    expect(result).toBe(16);
  });

  test('should return null for invalid action', () => {
    const rawInput = {
      a: 4,
      b: 2,
      action: null,
    };
    const result = simpleCalculator(rawInput);
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const rawInput = {
      a: 4,
      b: 'wrong argument',
      action: Action.Add,
    };
    const result = simpleCalculator(rawInput);
    expect(result).toBeNull();
  });
});
