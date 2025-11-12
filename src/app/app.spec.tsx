export function sum(a: number, b: number): number {
  return a + b;
}

describe("sum function", () => {
  it("should correctly add two numbers", () => {
    expect(sum(2, 3)).toBe(5);
  });

  it("should incorrectly add two numbers", () => {
    expect(sum(2, 2)).toBe(4);
  });
});
