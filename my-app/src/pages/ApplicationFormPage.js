import React, { useState } from 'react';
import PersonalDetails from '../components/form-sections/PersonalDetails';
import AddressDetails from '../components/form-sections/AddressDetails';
import SaveBtn from '../components/form-controls/SaveBtn';
import SubmitBtn from '../components/form-controls/SubmitBtn';
import ResetBtn from '../components/form-controls/ResetBtn';

const MainForm = () => {
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

  const [errors, setErrors] = useState({});

   
  const handleInputChange = (section, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };


  const handleSave = () => {
    // Add save logic here
    console.log('Form saved:', formData);
  };

  const handleReset = () => {
    // Add reset logic here
    setFormData({
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
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log('Form has errors');
      return;
    }
 
      try {
        const response = await fetch('http://127.0.0.1:8000/api/driver-license/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          console.log('Form submitted successfully');
        } else {
          console.error('Failed to submit form');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Ontario Driver's License Application</h1>

      <PersonalDetails
        data={formData.personalDetails}
        onInputChange={(field, value) => handleInputChange('personalDetails', field, value)}
        errors={errors}
      />

      <AddressDetails
        data={formData.addressDetails.residentialAddress}
        onInputChange={(field, value) => handleInputChange('addressDetails.residentialAddress', field, value)}
        errors={errors}
      />

      <div className="flex space-x-4">
        <SaveBtn onClick={handleSave} />
        <SubmitBtn onClick={handleSubmit} />
        <ResetBtn onClick={handleReset} />
      </div>
    </form>
  );
};

export default MainForm;