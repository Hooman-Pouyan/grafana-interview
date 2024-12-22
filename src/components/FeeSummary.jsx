import React from 'react';
import PropTypes from 'prop-types';

const FeeSummary = ({ total }) => (
      <div className="FeeSummary">
            <h2>Items</h2>
            <p>Total fees: ${total.toFixed(2)}</p>
      </div>
);

FeeSummary.propTypes = {
      total: PropTypes.number.isRequired,
};

export default FeeSummary;
