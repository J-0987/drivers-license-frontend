
import React, { useState } from 'react';
import { driverLicenseApi } from '../api/driverLicense';
import { toast } from 'react-toastify';
import PersonalDetails from '../components/form-sections/PersonalDetails';
import AddressDetails from '../components/form-sections/AddressDetails';
import SaveBtn from '../components/form-controls/SaveBtn';
import SubmitBtn from '../components/form-controls/SubmitBtn';
import ResetBtn from '../components/form-controls/ResetBtn';


const MainForm = () => {
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
  
  

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
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
  
  const handleSave = async () => {
    try {
      // Minimal validation for draft save
      if (!validateForm(true)) {
        toast.error('Please fill in your first and last name to save draft.');
        return;
      }

      // Set draft status explicitly
      const draftData = {
       
        last_name: formData.lastName,
        first_name: formData.firstName,
        middle_name: formData.middleName || null,
        license_number: formData.licenseNumber || null,
        date_of_birth: formData.dateOfBirth || null,
        sex: formData.sex || null,
        height_cm: formData.height || null,
        street_number: formData.streetNumber || null,
        unit_number: formData.unitNumber || null,
        street_name: formData.streetName || null,
        po_box: formData.poBox || null,
        city: formData.city || null,
        province: formData.province || null,
        postal_code: formData.postalCode || null,
        status: 'draft',
      };
  
      // API call to save the draft
      const response = await driverLicenseApi.createApplication(draftData);
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
      };
  
      const response = await driverLicenseApi.submitApplication(formattedData);
      console.log('Submission response:', response);
      toast.success('License application submitted successfully!');
      handleReset();
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Ontario Driver's License Application</h1>

      <PersonalDetails
        data={formData}
        onInputChange={(field, value) => onInputChange( field, value)}
        errors={errors}
      />

      <AddressDetails
        data={formData}
        onInputChange={(field, value) =>
          onInputChange(field, value)
        }
        errors={errors}
      />

      {errors.submit && <div className="text-red-600 mb-4">{errors.submit}</div>}

      <div className="flex space-x-4 mt-6">
        <SaveBtn onClick={handleSave} disabled={isSubmitting} />
        <SubmitBtn type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </SubmitBtn>
        <ResetBtn onClick={handleReset} disabled={isSubmitting} />
      </div>
    </form>
  );
};

export default MainForm;










