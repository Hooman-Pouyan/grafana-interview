export const adTypes = {
      auction: { cost: 25 },
      buyItNow: { cost: 35 },
};

export const userTypes = {
      normal: { discount: 0 },
      company: { discount: 5 },
};

export const discountRules = [
      {
            name: 'endDateToday',
            condition: (endDate) => {
                  const today = new Date();
                  const formattedToday = today.toISOString().split('T')[0];
                  return endDate === formattedToday;
            },
            value: 10,
      },
];
