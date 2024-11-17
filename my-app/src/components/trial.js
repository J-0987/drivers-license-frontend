import React, { useState } from "react";

// MainForm Component
const MainForm = () => {
  // Centralized form state
  const [formData, setFormData] = useState({
    personalDetails: {
      firstName: "",
      lastName: "",
      email: "",
    },
    addressDetails: {
      street: "",
      city: "",
      postalCode: "",
    },
  });

  // Validation errors
  const [errors, setErrors] = useState({});

  // Handle changes
  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((section) => {
      Object.keys(formData[section]).forEach((field) => {
        if (!formData[section][field]) {
          newErrors[`${section}.${field}`] = `${field} is required`;
        }
      });
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Form submitted successfully!", formData);
    } else {
      console.log("Validation failed!", errors);
    }
  };

  // Reset handler
  const handleReset = () => {
    setFormData({
      personalDetails: {
        firstName: "",
        lastName: "",
        email: "",
      },
      addressDetails: {
        street: "",
        city: "",
        postalCode: "",
      },
    });
    setErrors({});
  };

  return (
    <div>
      <h1>Main Form</h1>
      <PersonalDetails
        data={formData.personalDetails}
        onChange={(field, value) => handleInputChange("personalDetails", field, value)}
        errors={errors}
      />
      <AddressDetails
        data={formData.addressDetails}
        onChange={(field, value) => handleInputChange("addressDetails", field, value)}
        errors={errors}
      />
      <Buttons onSubmit={handleSubmit} onReset={handleReset} />
    </div>
  );
};

// PersonalDetails Component
const PersonalDetails = ({ data, onChange, errors }) => (
  <div>
    <h2>Personal Details</h2>
    <input
      type="text"
      placeholder="First Name"
      value={data.firstName}
      onChange={(e) => onChange("firstName", e.target.value)}
    />
    {errors["personalDetails.firstName"] && <p>{errors["personalDetails.firstName"]}</p>}
    <input
      type="text"
      placeholder="Last Name"
      value={data.lastName}
      onChange={(e) => onChange("lastName", e.target.value)}
    />
    {errors["personalDetails.lastName"] && <p>{errors["personalDetails.lastName"]}</p>}
    <input
      type="email"
      placeholder="Email"
      value={data.email}
      onChange={(e) => onChange("email", e.target.value)}
    />
    {errors["personalDetails.email"] && <p>{errors["personalDetails.email"]}</p>}
  </div>
);

// AddressDetails Component
const AddressDetails = ({ data, onChange, errors }) => (
  <div>
    <h2>Address Details</h2>
    <input
      type="text"
      placeholder="Street"
      value={data.street}
      onChange={(e) => onChange("street", e.target.value)}
    />
    {errors["addressDetails.street"] && <p>{errors["addressDetails.street"]}</p>}
    <input
      type="text"
      placeholder="City"
      value={data.city}
      onChange={(e) => onChange("city", e.target.value)}
    />
    {errors["addressDetails.city"] && <p>{errors["addressDetails.city"]}</p>}
    <input
      type="text"
      placeholder="Postal Code"
      value={data.postalCode}
      onChange={(e) => onChange("postalCode", e.target.value)}
    />
    {errors["addressDetails.postalCode"] && <p>{errors["addressDetails.postalCode"]}</p>}
  </div>
);

// Buttons Component
const Buttons = ({ onSubmit, onReset }) => (
  <div>
    <button type="button" onClick={onSubmit}>
      Submit
    </button>
    <button type="button" onClick={onReset}>
      Reset
    </button>
  </div>
);

export default MainForm;
