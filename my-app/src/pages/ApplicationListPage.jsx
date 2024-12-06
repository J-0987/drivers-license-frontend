import { useState, useEffect } from 'react';
import { driverLicenseApi } from '../api/driverLicense';
import Card from '../components/Card/Card';
import Modal from '../components/Modal/Modal';
import MainForm from '../pages/ApplicationFormPage';
import { toast } from 'react-toastify';
import axios from 'axios';

function ApplicationList() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const fetchApplications = async () => {
    try {
      const response = await driverLicenseApi.getAllApplications();
      setApplications(response.data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      toast.error('Failed to fetch applications');
    }
  };

  const handleDelete = async (id) => {
    try {
      await driverLicenseApi.deleteApplication(id);
      toast.success('Application deleted successfully');
      await fetchApplications(); // Refresh the list after deletion
    } catch (error) {
      toast.error('Failed to delete application');
      console.error('Failed to delete application:', error);
    }
  };

  const handleView = (id) => {
    toast.info(`Viewing application ID: ${id}`);
    // Add any additional logic for viewing an application here
  };

  useEffect(() => {
    console.log("Applications", applications);
    fetchApplications();
  }, []);

  // const handleEdit = async (application) => {
  //   try {
  //     const response = await driverLicenseApi.getApplication(application.id);
  //     console.log("Fetched application details:", response.data);
  //     setSelectedApplication(response.data);
  //     setIsEditModalOpen(true);
  //   } catch (error) {
  //     toast.error('Failed to fetch application details');
  //     console.error('Error fetching application:', error);
  //   }
  // };


  const handleEdit = async (application) => {
    console.log("handleEdit triggered with application:", application);
    try {
      console.log("Attempting to fetch application details for ID:", application.id);
  
      const data = await driverLicenseApi.getApplication(application.id);
      console.log("Fetched application details:", data);
  
      setSelectedApplication(data); // Set the selected application
      setIsEditModalOpen(true);     // Open the edit modal
    } catch (error) {
      console.error("Error fetching application details:", error);
      toast.error("Failed to fetch application details");
    }
  };  
  
  
  const handleEditSuccess = async () => {
    setIsEditModalOpen(false);
    setSelectedApplication(null);
    await fetchApplications();
    toast.success('Application updated successfully');
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="applications-list">
      {applications.map(app => (
       <Card
       key={app.id}
       application={app}
       status={app.status}
       onEdit={(application) => handleEdit(application)} // Pass handleEdit from ApplicationList
       onDelete={(id) => handleDelete(id)} // Pass delete functionality
       onView={() => handleView(app.id)}
     >
       <h3>{`Full Name: ${app.last_name}, ${app.first_name}`}</h3>
       <p>{`Status: ${app.status}`}</p>
     </Card>
     
      ))}

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      >
        {selectedApplication && (
          <MainForm
            initialData={selectedApplication}
            isEdit={true}
            onSubmitSuccess={handleEditSuccess}
          />
        )}
      </Modal>
  
    </div>
  );
}

export default ApplicationList;