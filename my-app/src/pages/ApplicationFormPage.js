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
  const validateForm = () => {
    const newErrors = {};

    // Personal Details Validation
    if (!formData.personalDetails.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.personalDetails.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    if (!formData.personalDetails.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.personalDetails.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const dob = new Date(formData.personalDetails.dateOfBirth);
      const today = new Date();
      if (dob >= today) {
        newErrors.dateOfBirth = 'Invalid date of birth';
      }
    }

    if (!formData.personalDetails.sex) {
      newErrors.sex = 'Sex is required';
    }

    if (!formData.personalDetails.height) {
      newErrors.height = 'Height is required';
    } else if (isNaN(formData.personalDetails.height) || 
               formData.personalDetails.height < 0 || 
               formData.personalDetails.height > 300) {
      newErrors.height = 'Invalid height';
    }
    };
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
 
      try {
        const response = await fetch('https://your-backend-api.com/save', {
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