import { add  } from "../lib/add"

test("add", () => {
  expect(add(1, 2)).toBe(3);
  expect(add(2, 3)).toBe(5);
  expect(add(3, 4)).toBe(7);
});