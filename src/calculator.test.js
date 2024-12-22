import { test, expect } from "vitest";
import { Calculator } from "./utils/calculator";

test("Calculator calculates fee for a normal user auction ad ending today", () => {
  const fee = Calculator.calculateFee({
    userType: 0,
    itemType: 0,
    price: 100,
    endDate: new Date().toISOString().split("T")[0],
  });
  expect(fee).toBe(115);
});

test("Calculator calculates fee for a company user buy-it-now ad", () => {
  const fee = Calculator.calculateFee({
    userType: 1,
    itemType: 1,
    price: 100,
    endDate: "2024-12-25",
  });
  expect(fee).toBe(130);
});

test("Calculator calculates fee for invalid item type", () => {
  expect(() =>
    Calculator.calculateFee({
      userType: 0,
      itemType: 99,
      price: 100,
      endDate: "2024-12-25",
    })
  ).toThrow("Invalid item type");
});
