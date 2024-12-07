import React, { useState, useEffect } from 'react';
import { driverLicenseApi } from '../api/driverLicense';
import { toast } from 'react-toastify';
import PersonalDetails from '../components/form-sections/PersonalDetails';
import AddressDetails from '../components/form-sections/AddressDetails';
import SaveBtn from '../components/form-controls/SaveBtn';
import SubmitBtn from '../components/form-controls/SubmitBtn';
import ResetBtn from '../components/form-controls/ResetBtn';

const MainForm = ({ initialData = null, isEdit = false, onSubmitSuccess, onFormChange }) => {
  const initialFormState = {
    lastName: '',
    firstName: '',
    middleName: '',
    licenseNumber: '',
    dateOfBirth: '',
    sex: '',
    height: '',
    unitNumber: '',
    streetNumber: '',
    streetName: '',
    poBox: '',
    city: '',
    province: '',
    postalCode: '',
  };

  const [formData, setFormData] = useState(initialData || initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        lastName: initialData.last_name,
        firstName: initialData.first_name,
        middleName: initialData.middle_name || '',
        licenseNumber: initialData.license_number || '',
        dateOfBirth: initialData.date_of_birth || '',
        sex: initialData.sex || '',
        height: initialData.height_cm || '',
        unitNumber: initialData.unit_number || '',
        streetNumber: initialData.street_number || '',
        streetName: initialData.street_name || '',
        poBox: initialData.po_box || '',
        city: initialData.city || '',
        province: initialData.province || '',
        postalCode: initialData.postal_code || ''
      });
    }
  }, [initialData]);

  const onInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    onFormChange?.();
  };

  const validateBasicFields = () => {
    const newErrors = {};
    const requiredFields = {
      firstName: 'First name',
      lastName: 'Last name'
    };
  
    Object.entries(requiredFields).forEach(([field, label]) => {
      if (!formData[field]?.trim()) {
        newErrors[field] = `${label} is required`;
      }
    });
  
    return newErrors;
  };

 

const handleSave = async (e) => {
  e?.preventDefault();
  try {
    const validationErrors = validateBasicFields();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const missingFields = Object.values(validationErrors).join(' and ');
      console.log('Basic V Missing fields:', missingFields);
      toast.error(missingFields);
      return;
    }

    const fieldMapping = {
      lastName: 'last_name',
      firstName: 'first_name',
      // ... rest of your mapping
    };

    const draftData = Object.entries(fieldMapping).reduce((acc, [clientKey, serverKey]) => ({
      ...acc,
      [serverKey]: formData[clientKey] || null
    }), { status: 'draft' });

    const response = isEdit
      ? await driverLicenseApi.editApplication(initialData.id, draftData)
      : await driverLicenseApi.createApplication(draftData);

    setErrors({});
    toast.success(`Draft ${isEdit ? 'updated' : 'saved'} successfully!`);
    onSubmitSuccess?.();
  } catch (error) {
    console.error('Save draft error:', error);
    toast.error(error.response?.data?.detail || 'Failed to save the draft. Please try again.');
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const validationErrors = validateFullForm();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    console.log('Full V Missing fields from handlesubmit:', validationErrors);
    toast.error('Please fix the form errors before submitting');
    return;
  }

  setIsSubmitting(true);
  try {
    // Rest of your submit logic
  } catch (error) {
    console.error('Submission error:', error);
    toast.error('Submission failed. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};

const validateFullForm = () => {
  const newErrors = {
    ...validateBasicFields(),
  };
  
  const additionalFields = {
    dateOfBirth: 'Date of birth',
    sex: 'Sex',
    height: 'Height',
    streetNumber: 'Street number',
    streetName: 'Street name',
    city: 'City',
    province: 'Province',
    postalCode: 'Postal code'
  };

  Object.entries(additionalFields).forEach(([field, label]) => {
    if (field === 'height') {
      if (!formData[field] || isNaN(formData[field]) || formData[field] <= 0) {
        newErrors[field] = `${label} must be a valid number`;
      }
    } else if (!formData[field]?.trim()) {
      newErrors[field] = `${label} is required`;
    }
  });

  return newErrors;
};


  const handleReset = () => {
    setFormData(initialFormState);
    setErrors({});
  };



  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        {isEdit ? 'Edit Driver\'s License Application' : 'Ontario Driver\'s License Application'}
      </h1>

      <PersonalDetails
        data={formData}
        onInputChange={onInputChange}
        errors={errors}
      />

      <AddressDetails
        data={formData}
        onInputChange={onInputChange}
        errors={errors}
      />

      {errors.submit && <div className="text-red-600 mb-4">{errors.submit}</div>}

      <div className="flex space-x-4 mt-6">
        <SaveBtn type="save" onClick={handleSave} disabled={isSubmitting} />
        <SubmitBtn type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : isEdit ? 'Update' : 'Submit'}
        </SubmitBtn>
        <ResetBtn type="button" onClick={handleReset} disabled={isSubmitting} />
      </div>
    </form>
  );
};

export default MainForm;