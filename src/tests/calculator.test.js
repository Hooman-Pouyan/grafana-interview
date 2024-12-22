// tests/calculator.test.js
import { Calculator } from '../src/utils/calculator.js';
import moment from 'moment';
import { describe, it, expect } from 'vitest';

describe('Calculator', () => {
      const calc = new Calculator();

      it('calculates fee for normal user, auction, end date today', () => {
            const fee = calc.getFee({
                  userType: 0,
                  itemType: 0,
                  price: 100,
                  endDate: moment().format('YYYY-MM-DD'),
            });
            expect(fee).toBe(115); // 100 + 25 - 10
      });

      it('calculates fee for normal user, buy it now, end date today', () => {
            const fee = calc.getFee({
                  userType: 0,
                  itemType: 1,
                  price: 200,
                  endDate: moment().format('YYYY-MM-DD'),
            });
            expect(fee).toBe(225); // 200 + 35 - 10
      });

      it('calculates fee for company user, auction, end date today', () => {
            const fee = calc.getFee({
                  userType: 1,
                  itemType: 0,
                  price: 150,
                  endDate: moment().format('YYYY-MM-DD'),
            });
            expect(fee).toBe(160); // 150 + 25 - 10 - 5
      });

      it('calculates fee for company user, buy it now, not end date today', () => {
            const fee = calc.getFee({
                  userType: 1,
                  itemType: 1,
                  price: 250,
                  endDate: '2099-12-31',
            });
            expect(fee).toBe(280); // 250 + 35 - 5
      });

      it('calculates fee for normal user, auction, not end date today', () => {
            const fee = calc.getFee({
                  userType: 0,
                  itemType: 0,
                  price: 100,
                  endDate: '2099-12-31',
            });
            expect(fee).toBe(125); // 100 + 25 - 0
      });

      it('throws error for unknown user type', () => {
            expect(() =>
                  calc.getFee({
                        userType: 2,
                        itemType: 0,
                        price: 100,
                        endDate: moment().format('YYYY-MM-DD'),
                  })
            ).toThrow('Unknown user type');
      });

      it('throws error for unknown item type', () => {
            expect(() =>
                  calc.getFee({
                        userType: 0,
                        itemType: 2,
                        price: 100,
                        endDate: moment().format('YYYY-MM-DD'),
                  })
            ).toThrow('Unknown item type');
      });
});
