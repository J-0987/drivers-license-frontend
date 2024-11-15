import React, { useState } from 'react';
import PersonalDetails from '../components/PersonalDetails';
// import AddressDetails from './AddressDetails';
// import MedicalConditions from './MedicalConditions';
// import DeclarationSection from './DeclarationSection';
// import FormControls from './FormControls';

const MainForm = () => {
  // State to manage form data
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
    // addressDetails: {
    //   residentialAddress: {
    //     unitNumber: '',
    //     streetNumber: '',
    //     streetName: '',
    //     poBox: '',
    //     city: '',
    //     province: '',
    //     postalCode: '',
    //   },
    //   mailingAddress: {
    //     unitNumber: '',
    //     streetNumber: '',
    //     streetName: '',
    //     poBox: '',
    //     city: '',
    //     province: '',
    //     postalCode: '',
    //   },
    //   isMailingDifferent: false,
    // },
    // medicalConditions: {
    //   hasMonocularVision: false,
    //   // Add additional medical condition fields here
    // },
    // declaration: {
    //   height: false,
    //   condition: false,
    //   endorsement: false,
    //   class: false,
    //   signature: '',
    //   date: '',
    // },
  });

  // Handler to update form data
  const handleInputChange = (section, field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [field]: value,
      },
    }));
  };

  // Handler for nested fields, e.g., residential and mailing addresses
  const handleNestedInputChange = (section, nestedSection, field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [nestedSection]: {
          ...prevState[section][nestedSection],
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleClear = () => {
    // Clear the form data by resetting state
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
    //   addressDetails: {
    //     residentialAddress: {
    //       unitNumber: '',
    //       streetNumber: '',
    //       streetName: '',
    //       poBox: '',
    //       city: '',
    //       province: '',
    //       postalCode: '',
    //     },
    //     mailingAddress: {
    //       unitNumber: '',
    //       streetNumber: '',
    //       streetName: '',
    //       poBox: '',
    //       city: '',
    //       province: '',
    //       postalCode: '',
    //     },
    //     isMailingDifferent: false,
    //   },
    //   medicalConditions: {
    //     hasMonocularVision: false,
    //     // Reset additional medical condition fields here
    //   },
    //   declaration: {
    //     height: false,
    //     condition: false,
    //     endorsement: false,
    //     class: false,
    //     signature: '',
    //     date: '',
    //   },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Ontario Driver's License Application</h1>
      
      <PersonalDetails
        data={formData.personalDetails}
        onInputChange={(field, value) => handleInputChange('personalDetails', field, value)}
      />
      
      {/* <AddressDetails
        data={formData.addressDetails}
        onInputChange={(nestedSection, field, value) =>
          handleNestedInputChange('addressDetails', nestedSection, field, value)
        }
      />
      
      <MedicalConditions
        data={formData.medicalConditions}
        onInputChange={(field, value) => handleInputChange('medicalConditions', field, value)}
      />
      
      <DeclarationSection
        data={formData.declaration}
        onInputChange={(field, value) => handleInputChange('declaration', field, value)}
      />
      
      <FormControls onClear={handleClear} /> */}
    </form>
  );
};

export default MainForm;
