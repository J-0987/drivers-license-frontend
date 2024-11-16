import React from 'react';

const provinces = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Nova Scotia",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
];

const AddressDetails = ({ data, onInputChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onInputChange(name, value);
  };

  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900">Residential Address</h2>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        {/* Unit Number */}
        <div className="sm:col-span-2">
          <label htmlFor="unit-number" className="block text-sm/6 font-medium text-gray-900">
            Unit Number / Numéro d’unité
          </label>
          <div className="mt-2">
            <input
              id="unit-number"
              name="unitNumber"
              autoComplete="off"
              value={data.unitNumber}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        {/* Street Number */}
        <div className="sm:col-span-2">
          <label htmlFor="street-number" className="block text-sm/6 font-medium text-gray-900">
            Street Number / Numéro de rue
          </label>
          <div className="mt-2">
            <input
              id="street-number"
              name="streetNumber"
              autoComplete="off"
              value={data.streetNumber}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        {/* Street Name */}
        <div className="sm:col-span-2">
          <label htmlFor="street-name" className="block text-sm/6 font-medium text-gray-900">
            Street Name / Nom de rue
          </label>
          <div className="mt-2">
            <input
              id="street-name"
              name="streetName"
              autoComplete="off"
              value={data.streetName}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        {/* PO Box */}
        <div className="sm:col-span-2">
          <label htmlFor="po-box" className="block text-sm/6 font-medium text-gray-900">
            PO Box / Boîte postale
          </label>
          <div className="mt-2">
            <input
              id="po-box"
              name="poBox"
              autoComplete="off"
              value={data.poBox}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        {/* City */}
        <div className="sm:col-span-2">
          <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
            City / Ville
          </label>
          <div className="mt-2">
            <input
              id="city"
              name="city"
              autoComplete="off"
              value={data.city}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        {/* Province */}
        <div className="sm:col-span-2">
          <label htmlFor="province" className="block text-sm/6 font-medium text-gray-900">
            Province / Province
          </label>
          <div className="mt-2">
            <select
              id="province"
              name="province"
              autoComplete="off"
              value={data.province}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            >
              <option value="">Select a province</option>
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Postal Code */}
        <div className="sm:col-span-2">
          <label htmlFor="postal-code" className="block text-sm/6 font-medium text-gray-900">
            Postal Code / Code postal
          </label>
          <div className="mt-2">
            <input
              id="postal-code"
              name="postalCode"
              autoComplete="off"
              value={data.postalCode}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>
      </div>

      <h2 className="text-base font-semibold text-gray-900">Mailing Address Address</h2>

<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
  {/* Unit Number */}
  <div className="sm:col-span-2">
    <label htmlFor="unit-number" className="block text-sm/6 font-medium text-gray-900">
      Unit Number / Numéro d’unité
    </label>
    <div className="mt-2">
      <input
        id="unit-number"
        name="unitNumber"
        autoComplete="off"
        value={data.unitNumber}
        onChange={handleChange}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
      />
    </div>
  </div>

  {/* Street Number */}
  <div className="sm:col-span-2">
    <label htmlFor="street-number" className="block text-sm/6 font-medium text-gray-900">
      Street Number / Numéro de rue
    </label>
    <div className="mt-2">
      <input
        id="street-number"
        name="streetNumber"
        autoComplete="off"
        value={data.streetNumber}
        onChange={handleChange}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
      />
    </div>
  </div>

  {/* Street Name */}
  <div className="sm:col-span-2">
    <label htmlFor="street-name" className="block text-sm/6 font-medium text-gray-900">
      Street Name / Nom de rue
    </label>
    <div className="mt-2">
      <input
        id="street-name"
        name="streetName"
        autoComplete="off"
        value={data.streetName}
        onChange={handleChange}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
      />
    </div>
  </div>

  {/* PO Box */}
  <div className="sm:col-span-2">
    <label htmlFor="po-box" className="block text-sm/6 font-medium text-gray-900">
      PO Box / Boîte postale
    </label>
    <div className="mt-2">
      <input
        id="po-box"
        name="poBox"
        autoComplete="off"
        value={data.poBox}
        onChange={handleChange}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
      />
    </div>
  </div>

  {/* City */}
  <div className="sm:col-span-2">
    <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
      City / Ville
    </label>
    <div className="mt-2">
      <input
        id="city"
        name="city"
        autoComplete="off"
        value={data.city}
        onChange={handleChange}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
      />
    </div>
  </div>

  {/* Province */}
  <div className="sm:col-span-2">
    <label htmlFor="province" className="block text-sm/6 font-medium text-gray-900">
      Province / Province
    </label>
    <div className="mt-2">
      <select
        id="province"
        name="province"
        autoComplete="off"
        value={data.province}
        onChange={handleChange}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
      >
        <option value="">Select a province</option>
        {provinces.map((province) => (
          <option key={province} value={province}>
            {province}
          </option>
        ))}
      </select>
    </div>
  </div>

  {/* Postal Code */}
  <div className="sm:col-span-2">
    <label htmlFor="postal-code" className="block text-sm/6 font-medium text-gray-900">
      Postal Code / Code postal
    </label>
    <div className="mt-2">
      <input
        id="postal-code"
        name="postalCode"
        autoComplete="off"
        value={data.postalCode}
        onChange={handleChange}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
      />
    </div>
  </div>
</div>
    </div>
  );
};

export default AddressDetails;