import React, { useState } from 'react';

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

const AddressDetails = ({ data, onInputChange, errors }) => {




    return (
        <div>
            <h2 className="text-base font-semibold text-gray-900">Residential Address / Adresse résidentielle</h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {/* Residential Address Fields */}
                <div className="sm:col-span-2">
                    <label htmlFor="unit-number" className="block text-sm/6 font-medium text-gray-900">
                        Unit Number / Numéro d'unité
                    </label>
                    <div className="mt-2">
                        <input
                            id="unit-number"
                            name="unitNumber"
                            autoComplete="off"
                            value={data.unitNumber}
                            onChange={(e) => onInputChange('unitNumber', e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                        {errors.unitNumber && (
                            <span className="mt-2 text-sm text-red-600">{errors.unitNumber}</span>
                        )}
                    </div>
                </div>

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
                            onChange={(e) => onInputChange('streetNumber', e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                        {errors.streetNumber && (
                            <span className="mt-2 text-sm text-red-600">{errors.streetNumber}</span>
                        )}
                    </div>
                </div>

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
                            onChange={(e) => onInputChange('streetName', e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                        {errors.streetName && (
                            <span className="mt-2 text-sm text-red-600">{errors.streetName}</span>
                        )}
                    </div>
                </div>

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
                            onChange={(e) => onInputChange('poBox', e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                        {errors.poBox && (
                            <span className="mt-2 text-sm text-red-600">{errors.poBox}</span>
                        )}
                    </div>
                </div>

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
                            onChange={(e) => onInputChange('city', e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                        {errors.city && (
                            <span className="mt-2 text-sm text-red-600">{errors.city}</span>
                        )}
                    </div>
                </div>

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
                            onChange={(e) => onInputChange('province', e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        >
                            <option value="">Sélectionnez une province</option>
                            {provinces.map((province) => (
                                <option key={province} value={province}>
                                    {province}
                                </option>
                            ))}
                        </select>
                        {errors.province && (
                            <span className="mt-2 text-sm text-red-600">{errors.province}</span>
                        )}
                    </div>
                </div>

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
                            onChange={(e) => onInputChange('postalCode', e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                        {errors.postalCode && (
                            <span className="mt-2 text-sm text-red-600">{errors.postalCode}</span>
                        )}
                    </div>
                </div>
            </div>


               
         
        </div>
    );
};

export default AddressDetails;