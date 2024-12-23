import { calculateFee } from '../utils/calculator';
import { adTypes, userTypes } from '../utils/constants';
import moment from 'moment';
import { describe, it, expect } from 'vitest';

describe('calculateFee', () => {
      it('calculates fee for normal user, auction, end date today', () => {
            const fee = calculateFee({
                  userType: 'normal',
                  adType: 'auction',
                  price: 100,
                  endDate: moment().format('YYYY-MM-DD'),
            });
            expect(fee).toBe(115);
      });

      it('calculates fee for normal user, buy it now, end date today', () => {
            const fee = calculateFee({
                  userType: 'normal',
                  adType: 'buyItNow',
                  price: 200,
                  endDate: moment().format('YYYY-MM-DD'),
            });
            expect(fee).toBe(225);
      });

      it('calculates fee for company user, auction, end date today', () => {
            const fee = calculateFee({
                  userType: 'company',
                  adType: 'auction',
                  price: 150,
                  endDate: moment().format('YYYY-MM-DD'),
            });
            expect(fee).toBe(160);
      });

      it('calculates fee for company user, buy it now, not end date today', () => {
            const fee = calculateFee({
                  userType: 'company',
                  adType: 'buyItNow',
                  price: 250,
                  endDate: '2099-12-31',
            });
            expect(fee).toBe(280);
      });

      it('calculates fee for normal user, auction, not end date today', () => {
            const fee = calculateFee({
                  userType: 'normal',
                  adType: 'auction',
                  price: 100,
                  endDate: '2099-12-31',
            });
            expect(fee).toBe(125);
      });

      it('throws error for unknown user type', () => {
            expect(() =>
                  calculateFee({
                        userType: 'unknownUserType',
                        adType: 'auction',
                        price: 100,
                        endDate: moment().format('YYYY-MM-DD'),
                  })
            ).toThrow('Unknown user type');
      });

      it('throws error for unknown ad type', () => {
            expect(() =>
                  calculateFee({
                        userType: 'normal',
                        adType: 'unknownAdType',
                        price: 100,
                        endDate: moment().format('YYYY-MM-DD'),
                  })
            ).toThrow('Unknown ad type');
      });
});
