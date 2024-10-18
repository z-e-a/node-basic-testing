import path from 'node:path';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const spyingSetTimeout = jest.spyOn(global, 'setTimeout');
    const mockedCallback = jest.fn();
    doStuffByTimeout(mockedCallback, 1000);
    expect(spyingSetTimeout).toHaveBeenLastCalledWith(mockedCallback, 1000);
    jest.runAllTimers();
    expect(mockedCallback).toHaveBeenCalled();
  });

  test('should call callback only after timeout', () => {
    const spyingSetTimeout = jest.spyOn(global, 'setTimeout');
    const mockedCallback = jest.fn();
    expect(mockedCallback).not.toHaveBeenCalled();
    doStuffByTimeout(mockedCallback, 1000);
    expect(spyingSetTimeout).toHaveBeenLastCalledWith(mockedCallback, 1000);
    jest.runAllTimers();
    expect(mockedCallback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const spyingSetInterval = jest.spyOn(global, 'setInterval');
    const mockedCallback = jest.fn();
    doStuffByInterval(mockedCallback, 1000);
    expect(spyingSetInterval).toHaveBeenLastCalledWith(mockedCallback, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mockedCallback = jest.fn();
    doStuffByInterval(mockedCallback, 1000);
    for (let i = 0; i < 3; i++) {
      jest.advanceTimersToNextTimer();
    }
    expect(mockedCallback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const spyingJoin = jest.spyOn(path, 'join');
    readFileAsynchronously('somePathToFile');
    expect(spyingJoin).toHaveBeenCalled();
    if (
      spyingJoin &&
      spyingJoin.mock &&
      spyingJoin.mock.calls &&
      spyingJoin.mock.calls[0]
    ) {
      expect(spyingJoin.mock.calls[0][1]).toBe('somePathToFile');
    }
  });

  test('should return null if file does not exist', async () => {
    const mockedExistsSync = jest.spyOn(fs, 'existsSync');
    mockedExistsSync.mockReturnValue(false);
    const result = await readFileAsynchronously('somePathToFile');
    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const mockedExistsSync = jest.spyOn(fs, 'existsSync');
    mockedExistsSync.mockReturnValue(true);
    const mockedReadFile = jest.spyOn(fsp, 'readFile');
    mockedReadFile.mockResolvedValue('some file content');
    const result = await readFileAsynchronously('somePathToFile');
    expect(result).not.toBeNull();
    expect(result).toEqual('some file content');
  });
});
