import React, { useState } from 'react';
import { calculateFee } from '../utils/calculator';
import { adTypes, userTypes } from '../utils/constants';
import moment from 'moment';
import PropTypes from 'prop-types';

const ItemForm = ({ onAddItem }) => {
  const [form, setForm] = useState({
    userType: '',
    adType: '',
    price: 100,
    endDate: moment().format('YYYY-MM-DD'),
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.userType) newErrors.userType = 'User type is required.';
    if (!form.adType) newErrors.adType = 'Ad type is required.';
    if (form.price <= 0) newErrors.price = 'Price must be greater than zero.';
    if (!moment(form.endDate, 'YYYY-MM-DD', true).isValid())
      newErrors.endDate = 'End date must be in YYYY-MM-DD format.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const fee = calculateFee({
      userType: form.userType,
      adType: form.adType,
      price: parseFloat(form.price),
      endDate: form.endDate,
    });

    onAddItem({ ...form, fee });
    setForm({
      userType: '',
      adType: '',
      price: 100,
      endDate: moment().format('YYYY-MM-DD'),
    });
    setErrors({});
  };

  return (
    <form className="ItemForm" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>You are</label>
        <select
          className="form-control"
          name="userType"
          value={form.userType}
          onChange={handleChange}
        >
          <option value="">Select</option>
          {Object.keys(userTypes).map((key) => (
            <option key={key} value={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </option>
          ))}
        </select>
        {errors.userType && <span className="text-danger">{errors.userType}</span>}
      </div>

      <div className="form-group">
        <label>Ad Type</label>
        <select
          className="form-control"
          name="adType"
          value={form.adType}
          onChange={handleChange}
        >
          <option value="">Select</option>
          {Object.keys(adTypes).map((key) => (
            <option key={key} value={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </option>
          ))}
        </select>
        {errors.adType && <span className="text-danger">{errors.adType}</span>}
      </div>

      <div className="form-group">
        <label>Price</label>
        <input
          className="form-control"
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
        />
        {errors.price && <span className="text-danger">{errors.price}</span>}
      </div>

      <div className="form-group">
        <label>End Date</label>
        <input
          className="form-control"
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
        />
        {errors.endDate && <span className="text-danger">{errors.endDate}</span>}
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

ItemForm.propTypes = {
  onAddItem: PropTypes.func.isRequired,
};

export default ItemForm;
