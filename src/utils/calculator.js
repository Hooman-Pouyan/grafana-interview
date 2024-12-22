export class Calculator {
  constructor() {
    this.adTypes = {
      auction: { cost: 25 },
      buyItNow: { cost: 35 },
    };

    this.userTypes = {
      normal: { discount: 0 },
      company: { discount: 5 },
    };

    this.discounts = {
      endDateToday: 10,
    };
  }

  /**
   * Calculate the total fee for an advertisement.
   * @param {Object} params - The parameters for calculating the fee.
   * @param {number} params.userType - The user type (0 = normal, 1 = company).
   * @param {number} params.itemType - The item type (0 = auction, 1 = buyItNow).
   * @param {number} params.price - The base price of the item.
   * @param {string} params.endDate - The end date in 'YYYY-MM-DD' format.
   * @returns {number} - The calculated fee.
   * @throws {Error} - If an unknown user or item type is provided.
   */
  getFee({ userType, itemType, price, endDate }) {
    const adType = this._getAdType(itemType);
    const user = this._getUserType(userType);

    let fee = price + this.adTypes[adType].cost;

    if (this._isToday(endDate)) {
      fee -= this.discounts.endDateToday;
    }

    fee -= this.userTypes[user].discount;

    return Math.max(fee, 0); // Ensure the fee is not negative.
  }

  /**
   * Get the advertisement type key.
   * @param {number} itemType - The item type (0 = auction, 1 = buyItNow).
   * @returns {string} - The advertisement type key.
   * @throws {Error} - If the item type is unknown.
   */
  _getAdType(itemType) {
    const adType = itemType === 0 ? 'auction' : 'buyItNow';
    if (!this.adTypes[adType]) {
      throw new Error('Unknown item type');
    }
    return adType;
  }

  /**
   * Get the user type key.
   * @param {number} userType - The user type (0 = normal, 1 = company).
   * @returns {string} - The user type key.
   * @throws {Error} - If the user type is unknown.
   */
  _getUserType(userType) {
    const user = userType === 0 ? 'normal' : 'company';
    if (!this.userTypes[user]) {
      throw new Error('Unknown user type');
    }
    return user;
  }

  /**
   * Check if a date is today.
   * @param {string} date - The date string in 'YYYY-MM-DD' format.
   * @returns {boolean} - True if the date is today, otherwise false.
   */
  _isToday(date) {
    const today = new Date();
    const formattedToday = this._formatDate(today);
    return date === formattedToday;
  }

  /**
   * Format a Date object as 'YYYY-MM-DD'.
   * @param {Date} date - The date object to format.
   * @returns {string} - The formatted date string.
   */
  _formatDate(date) {
    return date.toISOString().split('T')[0];
  }
}