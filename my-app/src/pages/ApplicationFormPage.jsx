import React, { useState, useEffect } from 'react';
import { driverLicenseApi } from '../api/driverLicense';
import { toast } from 'react-toastify';
import PersonalDetails from '../components/form-sections/PersonalDetails';
import AddressDetails from '../components/form-sections/AddressDetails';
import SaveBtn from '../components/form-controls/SaveBtn';
import SubmitBtn from '../components/form-controls/SubmitBtn';
import ResetBtn from '../components/form-controls/ResetBtn';
import Success from '../components/Success/Success';
import './ApplicationFormPage.css';

const MainForm = ({ initialData = null, 
  isEdit = false, 
  onSubmitSuccess, 
  onFormChange,
  isDisabled = false,
  isViewMode = false  }) => {
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
  const [draftId, setDraftId] = useState(null);

  const [formData, setFormData] = useState(initialData || initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

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
      if (initialData.id) {
        setDraftId(initialData.id);
    }
  }
  }, [initialData]);
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
        const firstErrorField = Object.keys(errors)[0];
        const firstErrorElement = document.querySelector(`[name="${firstErrorField}"]`);
        if (firstErrorElement) {
            firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstErrorElement.focus();
        }
    }
}, [errors]);
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

    let response;
      
      // If we have a draftId, update the existing draft
      if (draftId) {
        response = await driverLicenseApi.editApplication(draftId, draftData);
      } else {
        // If no draftId exists, create a new draft and store its ID
        response = await driverLicenseApi.createApplication(draftData);
        setDraftId(response.id); // Assuming the API returns the created draft's ID
      }
    setErrors({});
    setModalMessage(`Draft ${draftId ? 'updated' : 'saved'} successfully!`);
    setIsModalOpen(true);
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
        // Focus on first error field
        const firstErrorField = Object.keys(validationErrors)[0];
        const firstErrorElement = document.querySelector(`[name="${firstErrorField}"]`);
        firstErrorElement?.focus();
        return;
    }

  setIsSubmitting(true);
  try {
    const fieldMapping = {
      lastName: 'last_name',
      firstName: 'first_name',
      middleName: 'middle_name',
      licenseNumber: 'license_number',
      dateOfBirth: 'date_of_birth',
      sex: 'sex',
      height: 'height_cm',
      unitNumber: 'unit_number',
      streetNumber: 'street_number',
      streetName: 'street_name',
      poBox: 'po_box',
      city: 'city',
      province: 'province',
      postalCode: 'postal_code'
    };

    const submissionData = {
      ...Object.entries(fieldMapping).reduce((acc, [clientKey, serverKey]) => ({
          ...acc,
          [serverKey]: formData[clientKey] || null
      }), {}),
      status: 'submitted'
  };

    const response = isEdit
      ? await driverLicenseApi.submitApplication(initialData.id, submissionData)
      : await driverLicenseApi.submitApplication(submissionData);

    setErrors({});
    setModalMessage(`Application ${draftId ? 'updated' : 'submitted'} successfully!`);
    setIsModalOpen(true);
    toast.success(`Application ${isEdit ? 'updated' : 'submitted'} successfully!`);
    onSubmitSuccess?.();
  } catch (error) {
    console.error('Submission error:', error);
    toast.error(error.response?.data?.detail || 'Submission failed. Please try again.');
  } finally {
    setIsSubmitting(false);
  }
};

const validateFullForm = () => {
  const newErrors = {
    ...validateBasicFields(),
  };
  
  const additionalFields = {
    dateOfBirth: 'Date of Birth',
    sex: 'Sex',
    height: 'Height',
    licenseNumber: 'License Number',
    unitNumber: 'Unit Number',
    streetName: 'Street Name',
    city: 'City',
    province: 'Province',
    postalCode: 'Postal Code'
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
  const handleModalClose = () => {
    setIsModalOpen(false);
    if (modalMessage.includes('submitted')) {
        onSubmitSuccess?.();
        setFormData(initialFormState);
        setErrors({});
        setDraftId(null);
    } else if (modalMessage.includes('saved')) {
        // Keep the form data if it was just saved
        onSubmitSuccess?.();
    }
};


  return (
    <form 
      onSubmit={handleSubmit} 
      className={`max-w-4xl mx-auto p-6 ${isViewMode ? 'view-mode' : ''}`}
    >
      <h1 className="text-2xl font-bold mb-6">
        {isEdit ? 'Edit Driver\'s License Application' : 
         isViewMode ? 'View Driver\'s License Application' :
         'Ontario Driver\'s License Application'}
      </h1>

      <PersonalDetails 
        data={formData} 
        onInputChange={onInputChange} 
        errors={errors}
        disabled={isDisabled || isViewMode}
      />

      <AddressDetails 
        data={formData} 
        onInputChange={onInputChange} 
        errors={errors}
        disabled={isDisabled || isViewMode}
      />

      {errors.submit && <div className="text-red-600 mb-4">{errors.submit}</div>}

      {!isViewMode && (
        <div className="flex space-x-4 mt-6">
          <SaveBtn 
            type="save" 
            onClick={handleSave} 
            disabled={isSubmitting || isDisabled}
          />
          <SubmitBtn 
            type="submit" 
            disabled={isSubmitting || isDisabled}
          >
            {isSubmitting ? 'Submitting...' : isEdit ? 'Update' : 'Submit'}
          </SubmitBtn>
          <ResetBtn 
            type="button" 
            onClick={handleReset} 
            disabled={isSubmitting || isDisabled}
          />
        </div>
      )}

      <Success 
        isOpen={isModalOpen} 
        onClose={handleModalClose} 
        message={modalMessage}
      >
        <div className="modal__actions">
          <button 
            className="modal__button" 
            onClick={handleModalClose}
          >
            Close
          </button>
        </div>
      </Success>
    </form>
  );
};

export default MainForm;