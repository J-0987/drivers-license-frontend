import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PersonalDetails = () => {
  const [dob, setDob] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [sex, setSex] = useState('');
  const [height, setHeight] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!firstName) newErrors.firstName = 'First name is required';
    if (!middleName) newErrors.middleName = 'Middle name is required';
    if (!lastName) newErrors.lastName = 'Last name is required';
    if (!dob) newErrors.dob = 'Date of birth is required';
    if (!sex) newErrors.sex = 'Sex is required';
    if (!height) newErrors.height = 'Height is required';
    console.log('Validation errors:', newErrors); 
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      alert('Please fix the highlighted errors before submitting.');
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {

    if (validate()) {
      // Submit the form
      console.log('Form submitted successfully');
    }
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="border-b border-gray-900/10 pb-12">
        <h2 className="text-base font-semibold text-gray-900">Personal Information</h2>
        <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>


        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          {/* first name */}
          <div className="sm:col-span-2">
            <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">First name</label>
            <div className="mt-2">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>
          </div>
          {/* middle name */}
          <div className="sm:col-span-2">
            <label htmlFor="middle-name" className="block text-sm/6 font-medium text-gray-900">Middle name</label>
            <div className="mt-2">
              <input
                type="text"
                name="middle-name"
                id="middle-name"
                autoComplete="additional-name"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
              {errors.middleName && <p className="text-red-500 text-xs mt-1">{errors.middleName}</p>}
            </div>
          </div>
          {/* last name */}
          <div className="sm:col-span-2">
            <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">Last name</label>
            <div className="mt-2">
              <input
                type="text"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>
          </div>
          {/* DOB */}
          <div className="sm:col-span-4">
            <label htmlFor="dob" className="block text-sm font-medium text-gray-900">
              Date of Birth / Date de naissance
            </label>
            <div className="text-sm text-gray-600">dd/mm/yyyy / jj/mm/aaaa</div>
            <div className="mt-2">
              <DatePicker
                selected={dob}
                onChange={(date) => setDob(date)}
                dateFormat="dd/MM/yyyy"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
              {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
            </div>
          </div>
          {/* sex */}
          <div className="sm:col-span-2">
            <label htmlFor="sex" className="block text-sm/6 font-medium text-gray-900">Sex/Sexe</label>
            <div className="mt-2">
            <select
  name="sex"
  id="sex"
  value={sex}
  onChange={(e) => setSex(e.target.value)}
  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
>
  <option value="">Select...</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Other">Other</option>
</select>
{errors.sex && <p className="text-red-500 text-xs mt-1">{errors.sex}</p>}

            </div>
          </div>
          {/* height*/}
          <div className="sm:col-span-2">
            <label htmlFor="height" className="block text-sm/6 font-medium text-gray-900">Height/Taille (cm)</label>
            <div className="mt-2">
              <input
                type="number"
                name="height"
                id="height"
                autoComplete="off"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />

              {errors.height && <p className="text-red-500 text-xs mt-1">{errors.height}</p>}
            </div>
          </div>
        </div>
      </div>
      <button type="submit" className="mt-6 bg-indigo-600 text-white py-2 px-4 rounded-md">Submit</button>
    </form>
  );
};

export default PersonalDetails;