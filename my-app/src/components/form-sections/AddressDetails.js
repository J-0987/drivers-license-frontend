import React from 'react';

const AddressDetails = ({ data, onInputChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onInputChange(name, value);
  };

  return (
    <div>
      <h2>Address Details</h2>
      <div>
        <label htmlFor="unitNumber">Unit Number</label>
        <input
          type="text"
          id="unitNumber"
          name="unitNumber"
          value={data.unitNumber}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="streetNumber">Street Number</label>
        <input
          type="text"
          id="streetNumber"
          name="streetNumber"
          value={data.streetNumber}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="streetName">Street Name</label>
        <input
          type="text"
          id="streetName"
          name="streetName"
          value={data.streetName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="poBox">PO Box</label>
        <input
          type="text"
          id="poBox"
          name="poBox"
          value={data.poBox}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          value={data.city}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="province">Province</label>
        <input
          type="text"
          id="province"
          name="province"
          value={data.province}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="postalCode">Postal Code</label>
        <input
          type="text"
          id="postalCode"
          name="postalCode"
          value={data.postalCode}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default AddressDetails;