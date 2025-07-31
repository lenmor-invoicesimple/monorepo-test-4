import { isOdd } from "@lenmor-invoicesimple/is-odd";

export function isEven(num: number): boolean {
  console.log("isEven called with 11122");
  return !isOdd(num);
}