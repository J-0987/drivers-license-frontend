import React, { useState } from 'react';
import PersonalDetails from '../components/form-sections/PersonalDetails';
import AddressDetails from '../components/form-sections/AddressDetails';
import SaveBtn from '../components/form-controls/SaveBtn';
import SubmitBtn from '../components/form-controls/SubmitBtn';
import ResetBtn from '../components/form-controls/ResetBtn';

const MainForm = () => {
  // Initial form state - move to separate constant
  const initialFormState = {
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
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Improved input handler for nested objects
  const handleInputChange = (section, field, value) => {
    setFormData((prevData) => {
      const newData = { ...prevData };
      if (section.includes('.')) {
        const [parentSection, childSection] = section.split('.');
        newData[parentSection] = {
          ...prevData[parentSection],
          [childSection]: {
            ...prevData[parentSection][childSection],
            [field]: value,
          },
        };
      } else {
        newData[section] = {
          ...prevData[section],
          [field]: value,
        };
      }
      return newData;
    });
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // Personal Details Validation
    const { personalDetails } = formData;
    if (!personalDetails.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!personalDetails.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!personalDetails.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }
    if (!personalDetails.sex) {
      newErrors.sex = 'Sex is required';
    }
    if (!personalDetails.height) {
      newErrors.height = 'Height is required';
    }

    // Address Validation
    const { residentialAddress } = formData.addressDetails;
    if (!residentialAddress.streetNumber) {
      newErrors.streetNumber = 'Street number is required';
    }
    if (!residentialAddress.streetName.trim()) {
      newErrors.streetName = 'Street name is required';
    }
    if (!residentialAddress.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!residentialAddress.province) {
      newErrors.province = 'Province is required';
    }
    if (!residentialAddress.postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required';
    } else if (!/^[A-Z]\d[A-Z]\d[A-Z]\d$/.test(residentialAddress.postalCode.trim())) {
      newErrors.postalCode = 'Invalid postal code format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save handler with local storage
  const handleSave = () => {
    localStorage.setItem('driverLicenseForm', JSON.stringify(formData));
    // You could add a success toast/notification here
  };

  // Reset handler
  const handleReset = () => {
    setFormData(initialFormState);
    setErrors({});
    localStorage.removeItem('driverLicenseForm');
  };

  // Submit handler with loading state
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/driver-license/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Form submitted successfully');
        handleReset(); // Reset form after successful submission
        // Add success notification here
      } else {
        setErrors(data.errors || { submit: 'Failed to submit form' });
        // Add error notification here
      }
    } catch (error) {
      setErrors({ submit: 'Network error occurred' });
      // Add error notification here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Ontario Driver's License Application</h1>

      <PersonalDetails
        data={formData.personalDetails}
        onInputChange={(field, value) => handleInputChange('personalDetails', field, value)}
        errors={errors}
      />

      <AddressDetails
        data={formData.addressDetails.residentialAddress}
        onInputChange={(field, value) => 
          handleInputChange('addressDetails.residentialAddress', field, value)}
        errors={errors}
      />

      {errors.submit && (
        <div className="text-red-600 mb-4">{errors.submit}</div>
      )}

      <div className="flex space-x-4 mt-6">
        <SaveBtn 
          onClick={handleSave}
          disabled={isSubmitting}
        />
        <SubmitBtn 
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </SubmitBtn>
        <ResetBtn 
          onClick={handleReset}
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
};

export default MainForm;