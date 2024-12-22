import moment from 'moment';

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

  getFee({ userType, itemType, price, endDate }) {
    const adType = itemType === 0 ? 'auction' : 'buyItNow';
    const user = userType === 0 ? 'normal' : 'company';

    if (!this.adTypes[adType]) {
      throw new Error('Unknown item type');
    }

    if (!this.userTypes[user]) {
      throw new Error('Unknown user type');
    }

    let fee = price + this.adTypes[adType].cost;

    // Apply end date discount if applicable
    const isToday = moment(endDate, 'YYYY-MM-DD').isSame(moment(), 'day');
    if (isToday) {
      fee -= this.discounts.endDateToday;
      // Additional discount for company users
      if (user === 'company') {
        fee -= this.userTypes[user].discount;
      }
    } else {
      fee -= this.userTypes[user].discount;
    }

    return fee;
  }
}
