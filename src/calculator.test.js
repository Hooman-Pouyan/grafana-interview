import { Calculator } from "./calculator";
import moment from "moment";
import { test, expect } from "vitest";

test("Calculator can calculate fee", () => {
  const calc = new Calculator();
  const fee = calc.getFee({
    userType: 0,
    itemType: 0,
    price: 10,
    endDate: moment().format("YYYY-MM-DD"),
  });

  expect(fee).toBe(25);
});
