import { isOdd } from "@lenmor-invoicesimple/is-odd";

export function isEven(num: number): boolean {
  console.log("isEven called with 111:", num);
  return !isOdd(num);
}