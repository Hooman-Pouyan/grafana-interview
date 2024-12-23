import { adTypes, userTypes, discountRules } from './constants';

/**
 * Calculate the total fee for an advertisement.
 * @param {Object} params - The parameters for calculating the fee.
 * @param {string} params.userType - The user type (e.g., 'normal', 'company').
 * @param {string} params.adType - The ad type (e.g., 'auction', 'buyItNow').
 * @param {number} params.price - The base price of the item.
 * @param {string} params.endDate - The end date in 'YYYY-MM-DD' format.
 * @returns {number} - The calculated fee.
 */
export const calculateFee = ({ userType, adType, price, endDate }) => {
  const ad = getAdType(adType);
  const user = getUserType(userType);

  // Calculate base fee
  let fee = price + ad.cost;

  // Apply all applicable discounts
  const totalDiscount = discountRules.reduce(
    (acc, rule) => acc + (rule.condition(endDate) ? rule.value : 0),
    0
  );

  fee -= totalDiscount;

  // Apply user-specific discount
  fee -= user.discount;

  return Math.max(fee, 0); // Ensure the fee is non-negative
};

/**
 * Get advertisement type configuration.
 * @param {string} adType - The ad type key.
 * @returns {Object} - The advertisement type configuration.
 * @throws {Error} - If the ad type is unknown.
 */
const getAdType = (adType) => {
  if (!adTypes[adType]) {
    throw new Error(`Unknown ad type: ${adType}`);
  }
  return adTypes[adType];
};

/**
 * Get user type configuration.
 * @param {string} userType - The user type key.
 * @returns {Object} - The user type configuration.
 * @throws {Error} - If the user type is unknown.
 */
const getUserType = (userType) => {
  if (!userTypes[userType]) {
    throw new Error(`Unknown user type: ${userType}`);
  }
  return userTypes[userType];
};
