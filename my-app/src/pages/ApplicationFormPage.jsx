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

  const validateForm = (isDraft = false) => {
    const newErrors = {};
    const requiredFields = {
      basic: {
        firstName: 'First name',
        lastName: 'Last name'
      },
      full: {
        dateOfBirth: 'Date of birth',
        sex: 'Sex',
        height: 'Height',
        streetNumber: 'Street number',
        streetName: 'Street name',
        city: 'City',
        province: 'Province',
        postalCode: 'Postal code'
      }
    };
  
    // Clear previous errors
    setErrors({});
  
    // Validate basic fields (required for both draft and submission)
    Object.entries(requiredFields.basic).forEach(([field, label]) => {
      if (!formData[field] || formData[field].trim() === '') {
        newErrors[field] = `${label} is required`;
      }
    });
  
    // If not a draft, validate all required fields
    if (!isDraft) {
      Object.entries(requiredFields.full).forEach(([field, label]) => {
        if (field === 'height') {
          if (!formData[field] || isNaN(formData[field]) || formData[field] <= 0) {
            newErrors[field] = `${label} must be a valid number`;
          }
        } else if (!formData[field] || formData[field].trim() === '') {
          newErrors[field] = `${label} is required`;
        }
      });
    }
  
    // Update errors state
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    try {
      // Clear previous errors
      setErrors({});
      
      // Only validate first name and last name
      const requiredFields = {
        firstName: 'First name',
        lastName: 'Last name'
      };
      
      const newErrors = {};
      Object.entries(requiredFields).forEach(([field, label]) => {
        if (!formData[field] || formData[field].trim() === '') {
          newErrors[field] = `${label} is required`;
        }
      });
  
      // Set errors and check if validation passed
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors); // Set validation errors
        const missingFields = Object.keys(newErrors)
          .map(field => requiredFields[field].toLowerCase())
          .join(' and ');
        toast.error(`Please fill in your ${missingFields} to save draft.`);
        return;
      }
  
      const fieldMapping = {
        lastName: 'last_name',
        firstName: 'first_name',
        middleName: 'middle_name',
        licenseNumber: 'license_number',
        dateOfBirth: 'date_of_birth',
        sex: 'sex',
        height: 'height_cm',
        streetNumber: 'street_number',
        unitNumber: 'unit_number',
        streetName: 'street_name',
        poBox: 'po_box',
        city: 'city',
        province: 'province',
        postalCode: 'postal_code'
      };
  
      const draftData = Object.entries(fieldMapping).reduce((acc, [clientKey, serverKey]) => ({
        ...acc,
        [serverKey]: formData[clientKey] || null
      }), { status: 'draft' });
  
      const response = isEdit
        ? await driverLicenseApi.editApplication(initialData.id, draftData)
        : await driverLicenseApi.createApplication(draftData);
  
      // Clear errors after successful save
      setErrors({});
      toast.success(`Draft ${isEdit ? 'updated' : 'saved'} successfully!`);
      onSubmitSuccess?.();
    } catch (error) {
      console.error('Save draft error:', error);
      toast.error(error.response?.data?.detail || 'Failed to save the draft. Please try again.');
    }
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the form errors before submitting');
      return;
    }

    setIsSubmitting(true);
    try {
      const formattedData = {
        last_name: formData.lastName.trim(),
        first_name: formData.firstName.trim(),
        middle_name: formData.middleName?.trim() || null,
        license_number: formData.licenseNumber?.trim() || null,
        date_of_birth: formData.dateOfBirth || null,
        sex: formData.sex.trim(),
        height_cm: Number(formData.height),
        street_number: formData.streetNumber.trim(),
        unit_number: formData.unitNumber.trim(),
        street_name: formData.streetName.trim(),
        po_box: formData.poBox.trim() || null,
        city: formData.city.trim(),
        province: formData.province.trim(),
        postal_code: formData.postalCode.trim(),
        status: 'submitted',
      };

      const response = isEdit
        ? await driverLicenseApi.editApplication(initialData.id, formattedData)
        : await driverLicenseApi.submitApplication(formattedData);

      toast.success(`Application ${isEdit ? 'updated' : 'submitted'} successfully!`);
      onSubmitSuccess?.();
      if (!isEdit) handleReset();
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
        <SaveBtn onClick={handleSave} disabled={isSubmitting} />
        <SubmitBtn type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : isEdit ? 'Update' : 'Submit'}
        </SubmitBtn>
        <ResetBtn onClick={handleReset} disabled={isSubmitting} />
      </div>
    </form>
  );
};

export default MainForm;