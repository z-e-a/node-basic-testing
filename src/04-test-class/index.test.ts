import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balance = 123;
    const acc = getBankAccount(balance);
    expect(acc).toBeInstanceOf(BankAccount);
    expect(acc.getBalance()).toEqual(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const acc = getBankAccount(100);
    expect(() => acc.withdraw(150)).toThrowError(
      new InsufficientFundsError(acc.getBalance()),
    );
  });

  test('should throw error when transferring more than balance', () => {
    const fromAcc = getBankAccount(100);
    const toAcc = getBankAccount(0);
    expect(() => fromAcc.transfer(150, toAcc)).toThrowError(
      new InsufficientFundsError(fromAcc.getBalance()),
    );
  });

  test('should throw error when transferring to the same account', () => {
    const acc = getBankAccount(100);
    expect(() => acc.transfer(50, acc)).toThrowError(new TransferFailedError());
  });

  test('should deposit money', () => {
    const acc = getBankAccount(100);
    acc.deposit(50);
    expect(acc.getBalance()).toEqual(150);
  });

  test('should withdraw money', () => {
    const acc = getBankAccount(100);
    acc.withdraw(50);
    expect(acc.getBalance()).toEqual(50);
  });

  test('should transfer money', () => {
    const fromAcc = getBankAccount(100);
    const toAcc = getBankAccount(0);
    fromAcc.transfer(50, toAcc);
    expect(fromAcc.getBalance()).toEqual(50);
    expect(toAcc.getBalance()).toEqual(50);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const acc = getBankAccount(0);
    let balance = null;
    while (!balance) {
      balance = await acc.fetchBalance();
    }
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const acc = getBankAccount(-1);
    let isSynchronized = false;
    while (!isSynchronized) {
      try {
        await acc.synchronizeBalance();
        expect(acc.getBalance()).not.toBe(-1);
        isSynchronized = true;
      } catch (_) {}
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const acc = getBankAccount(0);
    let isFailed = false;
    while (!isFailed) {
      try {
        await acc.synchronizeBalance();
      } catch (error) {
        expect(error).toBeInstanceOf(SynchronizationFailedError);
        isFailed = true;
      }
    }
  });
});
