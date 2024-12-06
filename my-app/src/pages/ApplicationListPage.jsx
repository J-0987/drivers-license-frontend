import { useState, useEffect } from "react";
import { driverLicenseApi } from "../api/driverLicense";
import Card from "../components/Card/Card";
import Modal from "../components/Modal/Modal";
import MainForm from "./ApplicationFormPage";
import { toast } from "react-toastify";

function ApplicationListPage() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchApplications = async () => {
    try {
      const response = await driverLicenseApi.getAllApplications();
      setApplications(response.data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      toast.error("Failed to fetch applications");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleEdit = async (application) => {
    try {
      const data = await driverLicenseApi.getApplication(application.id);
      setSelectedApplication(data);
      setIsModalOpen(true);
    } catch (error) {
      toast.error("Failed to fetch application details");
    }
  };

  const handleDelete = async (id) => {
    try {
      await driverLicenseApi.deleteApplication(id);
      toast.success("Application deleted successfully");
      await fetchApplications();
    } catch (error) {
      toast.error("Failed to delete application");
    }
  };

  const handleSubmit = async (formData, isEdit) => {
    // Validate form before submission
    if (!validateForm(formData)) {
      toast.error("Please fix the form errors before submitting");
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
        unit_number: formData.unitNumber?.trim() || null,
        street_name: formData.streetName.trim(),
        po_box: formData.poBox?.trim() || null,
        city: formData.city.trim(),
        province: formData.province.trim(),
        postal_code: formData.postalCode.trim(),
        status: "submitted",
      };

      const response = isEdit
        ? await driverLicenseApi.editApplication(selectedApplication.id, formattedData)
        : await driverLicenseApi.submitApplication(formattedData);
        console.log("Payload being sent:", formattedData);

      toast.success(`Application ${isEdit ? "updated" : "submitted"} successfully!`);
      await fetchApplications();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = (formData) => {
    const requiredFields = [
      formData.lastName,
      formData.firstName,
      formData.sex,
      formData.height,
      formData.streetNumber,
      formData.streetName,
      formData.city,
      formData.province,
      formData.postalCode,
    ];

    const hasEmptyField = requiredFields.some((field) => !field || field.trim() === "");
    if (hasEmptyField) {
      console.error("Validation error: Missing required fields");
      return false;
    }

    const postalCodeRegex = /^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/;
    if (!postalCodeRegex.test(formData.postalCode)) {
      console.error("Validation error: Invalid postal code format");
      return false;
    }

    return true;
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="applications-list">
      {applications.map((app) => (
        <Card
          key={app.id}
          application={app}
          onEdit={() => handleEdit(app)}
          onDelete={() => handleDelete(app.id)}
        >
          <h3>{`Full Name: ${app.last_name}, ${app.first_name}`}</h3>
          <p>{`Status: ${app.status}`}</p>
        </Card>
      ))}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedApplication && (
          <MainForm
            initialData={selectedApplication}
            isEdit={true}
            onSubmit={(formData) => handleSubmit(formData, true)}
            onSubmitSuccess={() => fetchApplications()}
          />
        )}
      </Modal>
    </div>
  );
}

export default ApplicationListPage;
