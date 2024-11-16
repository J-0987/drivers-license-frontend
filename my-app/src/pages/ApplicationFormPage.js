import React, { useState } from 'react';
import PersonalDetails from '../components/form-sections/PersonalDetails';
import AddressDetails from '../components/form-sections/AddressDetails';

// import FormControls from './FormControls';

const MainForm = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    personalDetails: {
      lastName: '',
      firstName: '',
      middleName: '',
      licenseNumber: '',
      dateOfBirth: '',
      sex: '',
      height: '',
    },
    addressDetails: {
      residentialAddress: {
        unitNumber: '',
        streetNumber: '',
        streetName: '',
        poBox: '',
        city: '',
        province: '',
        postalCode: '',
      },
      mailingAddress: {
        unitNumber: '',
        streetNumber: '',
        streetName: '',
        poBox: '',
        city: '',
        province: '',
        postalCode: '',
      },
    },
  });

  const handleInputChange = (section, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  const handleNestedInputChange = (section, nestedSection, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [nestedSection]: {
          ...prevData[section][nestedSection],
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation and form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Ontario Driver's License Application</h1>

      <PersonalDetails
        data={formData.personalDetails}
        onInputChange={(field, value) => handleInputChange('personalDetails', field, value)}
      />

      <AddressDetails
        data={formData.addressDetails}
        onInputChange={(nestedSection, field, value) =>
          handleNestedInputChange('addressDetails', nestedSection, field, value)
        }
      />
    </form>
  );
};

export default MainForm;