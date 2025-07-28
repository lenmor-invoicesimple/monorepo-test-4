import { subtract  } from "../lib/subtract"

test("subtract", () => {
  expect(subtract(1, 2)).toBe(-1);
  expect(subtract(2, 3)).toBe(-1);
  expect(subtract(3, 4)).toBe(-1);
});