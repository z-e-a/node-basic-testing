import axios from 'axios';
import { THROTTLE_TIME, throttledGetDataFromApi } from './index';

beforeAll(async () => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
  jest.clearAllMocks();
});

beforeEach(() => {
  jest.advanceTimersByTime(THROTTLE_TIME);
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    const spyingAxiosCreate = jest.spyOn(axios, 'create');
    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValueOnce({ data: { someField: 'someValue' } });

    await throttledGetDataFromApi('/todos');

    expect(spyingAxiosCreate).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValueOnce({ data: { someField: 'someValue' } });

    await throttledGetDataFromApi('/todos');

    expect(axios.Axios.prototype.get).toBeCalledWith('/todos');
  });

  test('should return response data', async () => {
    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValueOnce({ data: { someField: 'someValue' } });
    expect(await throttledGetDataFromApi('/todos')).toEqual({
      someField: 'someValue',
    });
  });
});
