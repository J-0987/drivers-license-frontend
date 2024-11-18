import React, { useState } from 'react';
import { driverLicenseApi } from '../api/driverLicense';
import { toast } from 'react-toastify';
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
  const onInputChange = (section, field, value) => {
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

  // TODO: Save handler with local storage? with database?
  const handleSave = () => {
    localStorage.setItem('driverLicenseForm', JSON.stringify(formData));

  };

  //  Reset handler
  const handleReset = () => {
    setFormData(initialFormState);
    setErrors({});
    localStorage.removeItem('driverLicenseForm');
  };

  // Submit handler with loading state
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
        toast.error('Please fix the form errors before submitting');
        return;
    }

    setIsSubmitting(true);

    try {
     
        const formattedData = {
            last_name: formData.personalDetails.lastName.trim(),
            first_name: formData.personalDetails.firstName.trim(),
            middle_name: formData.personalDetails.middleName?.trim() || null,
            license_number: formData.personalDetails.licenseNumber?.trim(),
            date_of_birth: formData.personalDetails.dateOfBirth,
            sex: formData.personalDetails.sex.trim(),
            height_cm: Number(formData.personalDetails.height),
            residential_address: formData.addressDetails.residentialAddress.streetNumber.trim() + ' ' + 
                               formData.addressDetails.residentialAddress.streetName.trim(),
            mailing_address: formData.addressDetails.mailingAddress ? 
                           (formData.addressDetails.mailingAddress.streetNumber.trim() + ' ' + 
                            formData.addressDetails.mailingAddress.streetName.trim()) : 
                           formData.addressDetails.residentialAddress.streetNumber.trim() + ' ' + 
                           formData.addressDetails.residentialAddress.streetName.trim(),
            province: formData.addressDetails.residentialAddress.province.trim(),
            postal_code: formData.addressDetails.residentialAddress.postalCode.trim()
        };

        // Validate data before sending
        if (!formattedData.last_name || !formattedData.first_name || !formattedData.license_number) {
            throw new Error('Required fields are missing');
        }

        // Log the formatted data to check its structure
        console.log('Sending data:', formattedData);

        const response = await driverLicenseApi.createLicense(formattedData);
        console.log('Submission response:', response);
        
        toast.success('License application submitted successfully!');
        handleReset();

    } catch (error) {
        console.error('Submission error:', error);
        
        if (error.response?.data?.detail) {
            // Show specific validation errors from FastAPI
            toast.error(`Validation error: ${error.response.data.detail}`);
        } else if (error.response?.status === 422) {
            // Show validation errors
            toast.error('Please check all required fields are filled correctly');
        } else {
            toast.error('An unexpected error occurred. Please try again.');
        }
    } finally {
        setIsSubmitting(false);
    }
};
  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Ontario Driver's License Application</h1>

      <PersonalDetails
        data={formData.personalDetails}
        onInputChange={(field, value) => onInputChange('personalDetails', field, value)}
        errors={errors}
      />

      <AddressDetails
        data={formData.addressDetails.residentialAddress}
        onInputChange={(field, value) =>
          onInputChange('addressDetails.residentialAddress', field, value)}
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