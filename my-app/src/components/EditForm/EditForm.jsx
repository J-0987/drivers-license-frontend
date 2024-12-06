import React, { useState, useEffect } from 'react';
import './EditForm.scss';
import { driverLicenseApi } from '../../api/driverLicense';
import { toast } from 'react-toastify';
import AddressDetails from '../form-sections/AddressDetails';
import PersonalDetails from '../form-sections/PersonalDetails';
import SaveBtn from '../form-controls/SaveBtn';
import SubmitBtn from '../form-controls/SubmitBtn';
import CancelBtn from '../buttons/CancelBtn';

const EditForm = ({ applicationData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    // Personal Details
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    // Address Details
    unitNumber: '',
    streetNumber: '',
    streetName: '',
    poBox: '',
    city: '',
    province: '',
    postalCode: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (applicationData) {
      setFormData({
        ...applicationData,
        height: applicationData.height_cm?.toString() || '',
      });
    }
  }, [applicationData]);

  const onInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = (isDraft = false) => {
    const newErrors = {};
  
    //Draft validation
    if (isDraft) {
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
      }
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      }
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }
    // Personal Details Validation - only enforce certain fields for submission
    if (!isDraft) {
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
      }
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.dateOfBirth) {
        newErrors.dateOfBirth = 'Date of birth is required';
      }
      if (!formData.sex) {
        newErrors.sex = 'Sex is required';
      }
      if (!formData.height) {
        newErrors.height = 'Height is required';
      }
  
      // Address Validation for Submission
      if (!formData.streetNumber) {
        newErrors.streetNumber = 'Street number is required';
      }
      if (!formData.streetName.trim()) {
        newErrors.streetName = 'Street name is required';
      }
      if (!formData.city.trim()) {
        newErrors.city = 'City is required';
      }
      if (!formData.province) {
        newErrors.province = 'Province is required';
      }
      if (!formData.postalCode.trim()) {
        newErrors.postalCode = 'Postal code is required';

      }
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatDataForSubmission = () => ({
    last_name: formData.lastName.trim(),
    first_name: formData.firstName.trim(),
    middle_name: formData.middleName?.trim() || null,
    license_number: formData.licenseNumber?.trim() || null,
    date_of_birth: formData.dateOfBirth || null,
    sex: formData.sex,
    height_cm: Number(formData.height),
    street_number: formData.streetNumber.trim(),
    unit_number: formData.unitNumber?.trim() || null,
    street_name: formData.streetName.trim(),
    po_box: formData.poBox?.trim() || null,
    city: formData.city.trim(),
    province: formData.province.trim(),
    postal_code: formData.postalCode.trim(),
    status: 'draft'
  });
  
  const handleSave = async () => {
    try {
      // Minimal validation for draft save
      if (!validateForm(true)) {
        toast.error('Please fill in your first and last name to save draft.');
        return;
      } 
  
      // API call to save the draft
      const response = await driverLicenseApi.editApplication(formatDataForSubmission());
      console.log('Draft saved:', response);
  
      // Show success message
      toast.success('Draft saved successfully!');
    } catch (error) {
      console.error('Save draft error:', error);
  
      if (error.response?.data?.detail) {
        toast.error(`Error saving draft: ${error.response.data.detail}`);
      } else {
        toast.error('Failed to save the draft. Please try again.');
      }
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      toast.error('Please fix the form errors before submitting');
      return;
    }
  
    setIsSubmitting(true);
    try {
    
    await driverLicenseApi.submitApplication(applicationData.id, formatDataForSubmission());
    toast.success('Application updated successfully!');
      onCancel();
    } catch (error) {
      toast.error('Update failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto max-w-4xl bg-white rounded-lg shadow-xl p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Edit Application</h1>
            <button 
              type="button" 
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>

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

          {errors.submit && (
            <div className="text-red-600 mb-4">{errors.submit}</div>
          )}

          <div className="flex space-x-4 mt-6">
            <SaveBtn onClick={handleSave} disabled={isSubmitting} />
            <SubmitBtn type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </SubmitBtn>
            <CancelBtn onClick={onCancel} disabled={isSubmitting} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;