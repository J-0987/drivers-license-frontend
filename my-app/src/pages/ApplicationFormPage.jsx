import React, { useState, useEffect } from 'react';
import { driverLicenseApi } from '../api/driverLicense';
import { toast } from 'react-toastify';
import PersonalDetails from '../components/form-sections/PersonalDetails';
import AddressDetails from '../components/form-sections/AddressDetails';
import SaveBtn from '../components/form-controls/SaveBtn';
import SubmitBtn from '../components/form-controls/SubmitBtn';
import ResetBtn from '../components/form-controls/ResetBtn';

const MainForm = ({ initialData = null, isEdit = false, onSubmitSuccess }) => {
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
  };

  const validateForm = (isDraft = false) => {
    const newErrors = {};

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

    // Full validation for submission
    if (!isDraft) {
      // Personal Details
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.sex) newErrors.sex = 'Sex is required';
      if (!formData.height) newErrors.height = 'Height is required';

      // Address Details
      if (!formData.streetNumber) newErrors.streetNumber = 'Street number is required';
      if (!formData.streetName.trim()) newErrors.streetName = 'Street name is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.province) newErrors.province = 'Province is required';
      if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    try {
      if (!validateForm(true)) {
        toast.error('Please fill in your first and last name to save draft.');
        return;
      }

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

      const response = isEdit
        ? await driverLicenseApi.editApplication(initialData.id, draftData)
        : await driverLicenseApi.createApplication(draftData);

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
      };

      const response = isEdit
        ? await driverLicenseApi.updateApplication(initialData.id, formattedData)
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