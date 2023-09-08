/// <reference types="cypress" />

// context() can be used as an alias for describe()
describe('Our first test suite', () => {
  describe('Our first test suite section', () => {
    beforeEach('code before each test', () => {
      // repetitive code before each test
    });
    it('some test name', () => {
      // test code
    });
    it('some test name', () => {
      // test code
    });
    it('some test name', () => {
      // test code
    });
  });

  it('first test', () => {});
  it('second test', () => {});
  it('third test', () => {});
});

describe('Our Second test suite', () => {
  it('first test', () => {});
  it('second test', () => {});
  it('third test', () => {});
});
