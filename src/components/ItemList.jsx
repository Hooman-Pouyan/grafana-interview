import React from 'react';
import PropTypes from 'prop-types';

const ItemList = ({ items }) => (
      <div className="ItemList">
            {items.length === 0 ? (
                  <p>No items added yet.</p>
            ) : (
                  items.map((item, index) => (
                        <div className="card mb-3" key={index}>
                              <div className="card-body">
                                    <h5 className="card-title">
                                          {item.itemType === '0' ? 'Auction' : 'Buy It Now'}
                                    </h5>
                                    <p className="card-text">
                                          <strong>User Type:</strong> {item.userType === '0' ? 'Person' : 'Company'}
                                    </p>
                                    <p className="card-text">
                                          <strong>Price:</strong> ${parseFloat(item.price).toFixed(2)}
                                    </p>
                                    <p className="card-text">
                                          <strong>End Date:</strong> {item.endDate}
                                    </p>
                                    <p className="card-text">
                                          <strong>Fee:</strong> ${item.fee.toFixed(2)}
                                    </p>
                              </div>
                        </div>
                  ))
            )}
      </div>
);

ItemList.propTypes = {
      items: PropTypes.arrayOf(
            PropTypes.shape({
                  userType: PropTypes.string.isRequired,
                  itemType: PropTypes.string.isRequired,
                  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                  endDate: PropTypes.string.isRequired,
                  fee: PropTypes.number.isRequired,
            })
      ).isRequired,
};

export default ItemList;
