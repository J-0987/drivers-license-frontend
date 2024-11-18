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
    const [sameAsResidential, setSameAsResidential] = useState(false);

    const handleCheckboxChange = (e) => {
        setSameAsResidential(prev => !prev);
        if (!sameAsResidential) {
            onInputChange('mailingUnitNumber', data.unitNumber);
            onInputChange('mailingStreetNumber', data.streetNumber);
            onInputChange('mailingStreetName', data.streetName);
            onInputChange('mailingPoBox', data.poBox);
            onInputChange('mailingCity', data.city);
            onInputChange('mailingProvince', data.province);
            onInputChange('mailingPostalCode', data.postalCode);
        }
    };



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

            <div className="mt-6">
                <div className="relative flex items-start">
                    <div className="flex h-6 items-center">
                        <input
                            id="same-address"
                            name="same-address"
                            type="checkbox"
                            checked={sameAsResidential}
                            onChange={handleCheckboxChange}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                        <label htmlFor="same-address" className="font-medium text-gray-900">
                            Mailing address same as residential address / Adresse postale identique à l'adresse résidentielle
                        </label>

                    </div>
                </div>
            </div>
     
            <h2 className="mt-10 text-base font-semibold text-gray-900">Mailing Address / Adresse postale</h2>
    
                    {/* Mailing Unit Number */}
                    <div className="sm:col-span-2">
                        <label htmlFor="mailing-unit-number" className="block text-sm/6 font-medium text-gray-900">
                            Unit Number / Numéro d'unité
                        </label>
                        <div className="mt-2">
                            <input
                                id="mailing-unit-number"
                                name="mailingUnitNumber"
                                autoComplete="off"
                                value={sameAsResidential ? data.unitNumber : data.mailingUnitNumber}
                                onChange={(e) => onInputChange('mailingUnitNumber', e.target.value)}
                                disabled={sameAsResidential}
                                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
          ${errors.mailingUnitNumber ? 'ring-red-500' : 'ring-gray-300'}
          ${sameAsResidential ? 'bg-gray-100' : ''}
          placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6`}
                            />
                            {errors.mailingUnitNumber && (
                                <span className="mt-2 text-sm text-red-600">{errors.mailingUnitNumber}</span>
                            )}
                        </div>
                    </div>

                    {/* Mailing Street Number */}
                    <div className="sm:col-span-2">
                        <label htmlFor="mailing-street-number" className="block text-sm/6 font-medium text-gray-900">
                            Street Number / Numéro de rue
                        </label>
                        <div className="mt-2">
                            <input
                                id="mailing-street-number"
                                name="mailingStreetNumber"
                                autoComplete="off"
                                value={sameAsResidential ? data.streetNumber : data.mailingStreetNumber}
                                onChange={(e) => onInputChange('mailingStreetNumber', e.target.value)}
                                disabled={sameAsResidential}
                                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
          ${errors.mailingStreetNumber ? 'ring-red-500' : 'ring-gray-300'}
          ${sameAsResidential ? 'bg-gray-100' : ''}
          placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6`}
                            />
                            {errors.mailingStreetNumber && (
                                <span className="mt-2 text-sm text-red-600">{errors.mailingStreetNumber}</span>
                            )}
                        </div>
                    </div>

                    {/* Mailing Street Name */}
                    <div className="sm:col-span-2">
                        <label htmlFor="mailing-street-name" className="block text-sm/6 font-medium text-gray-900">
                            Street Name / Nom de rue
                        </label>
                        <div className="mt-2">
                            <input
                                id="mailing-street-name"
                                name="mailingStreetName"
                                autoComplete="off"
                                value={sameAsResidential ? data.streetName : data.mailingStreetName}
                                onChange={(e) => onInputChange('mailingStreetName', e.target.value)}
                                disabled={sameAsResidential}
                                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
          ${errors.mailingStreetName ? 'ring-red-500' : 'ring-gray-300'}
          ${sameAsResidential ? 'bg-gray-100' : ''}
          placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6`}
                            />
                            {errors.mailingStreetName && (
                                <span className="mt-2 text-sm text-red-600">{errors.mailingStreetName}</span>
                            )}
                        </div>
                    </div>

                    {/* Mailing PO Box */}
                    <div className="sm:col-span-2">
                        <label htmlFor="mailing-po-box" className="block text-sm/6 font-medium text-gray-900">
                            PO Box / Boîte postale
                        </label>
                        <div className="mt-2">
                            <input
                                id="mailing-po-box"
                                name="mailingPoBox"
                                autoComplete="off"
                                value={sameAsResidential ? data.poBox : data.mailingPoBox}
                                onChange={(e) => onInputChange('mailingPoBox', e.target.value)}
                                disabled={sameAsResidential}
                                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
          ${errors.mailingPoBox ? 'ring-red-500' : 'ring-gray-300'}
          ${sameAsResidential ? 'bg-gray-100' : ''}
          placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6`}
                            />
                            {errors.mailingPoBox && (
                                <span className="mt-2 text-sm text-red-600">{errors.mailingPoBox}</span>
                            )}
                        </div>
                    </div>

                    {/* Mailing City */}
                    <div className="sm:col-span-2">
                        <label htmlFor="mailing-city" className="block text-sm/6 font-medium text-gray-900">
                            City / Ville
                        </label>
                        <div className="mt-2">
                            <input
                                id="mailing-city"
                                name="mailingCity"
                                autoComplete="off"
                                value={sameAsResidential ? data.city : data.mailingCity}
                                onChange={(e) => onInputChange('mailingCity', e.target.value)}
                                disabled={sameAsResidential}
                                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
          ${errors.mailingCity ? 'ring-red-500' : 'ring-gray-300'}
          ${sameAsResidential ? 'bg-gray-100' : ''}
          placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6`}
                            />
                            {errors.mailingCity && (
                                <span className="mt-2 text-sm text-red-600">{errors.mailingCity}</span>
                            )}
                        </div>
                    </div>

                    {/* Mailing Province */}
                    <div className="sm:col-span-2">
                        <label htmlFor="mailing-province" className="block text-sm/6 font-medium text-gray-900">
                            Province / Province
                        </label>
                        <div className="mt-2">
                            <select
                                id="mailing-province"
                                name="mailingProvince"
                                autoComplete="off"
                                value={sameAsResidential ? data.province : data.mailingProvince}
                                onChange={(e) => onInputChange('mailingProvince', e.target.value)}
                                disabled={sameAsResidential}
                                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
          ${errors.mailingProvince ? 'ring-red-500' : 'ring-gray-300'}
          ${sameAsResidential ? 'bg-gray-100' : ''}
          placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6`}
                            >
                                <option value="">Select a province</option>
                                {provinces.map((province) => (
                                    <option key={province} value={province}>
                                        {province}
                                    </option>
                                ))}
                            </select>
                            {errors.mailingProvince && (
                                <span className="mt-2 text-sm text-red-600">{errors.mailingProvince}</span>
                            )}
                        </div>
                    </div>

                    {/* Mailing Postal Code */}
                    <div className="sm:col-span-2">
                        <label htmlFor="mailing-postal-code" className="block text-sm/6 font-medium text-gray-900">
                            Postal Code / Code postal
                        </label>
                        <div className="mt-2">
                            <input
                                id="mailing-postal-code"
                                name="mailingPostalCode"
                                autoComplete="off"
                                value={sameAsResidential ? data.postalCode : data.mailingPostalCode}
                                onChange={(e) => onInputChange('mailingPostalCode', e.target.value)}
                                disabled={sameAsResidential}
                                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
          ${errors.mailingPostalCode ? 'ring-red-500' : 'ring-gray-300'}
          ${sameAsResidential ? 'bg-gray-100' : ''}
          placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6`}
                            />
                            {errors.mailingPostalCode && (
                                <span className="mt-2 text-sm text-red-600">{errors.mailingPostalCode}</span>
                            )}
                        </div>
                    </div>
               
         
        </div>
    );
};

export default AddressDetails;