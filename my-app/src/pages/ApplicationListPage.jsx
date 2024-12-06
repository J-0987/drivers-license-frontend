import { useState, useEffect } from 'react';
import axios from 'axios';
import { driverLicenseApi } from '../api/driverLicense';
import Card from '../components/Card/Card';
import Modal from '../components/Modal/Modal';
import AddresDetails from '../components/form-sections/AddressDetails';
import PersonalDetails from '../components/form-sections/PersonalDetails';
import MainForm from'../pages/ApplicationFormPage'; 


function ApplicationList() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // const handleEditClick = (application) => {
  //   setSelectedApplication(application);
  //   setModalOpen(true);
  // };

  // const handleEditSuccess = async () => {
  //   // Refresh the applications list
  //   const updatedApplications = await fetchApplications();
  //   setApplications(updatedApplications);
  //   setModalOpen(false);
  // };


const handleEdit = (id) => {
    console.log('Edit:', id);
};

  useEffect(() => {
      const fetchApplications = async () => {
          try {
            // const response = await axios.get('http://127.0.0.1:8000/api/applications');
            const response = await driverLicenseApi.getAllApplications();


              setApplications(response.data);
              console.log(response.data);
              setIsLoading(false);
          } catch (err) {
              setError(err.message);
              setIsLoading(false);
          }
      };

      fetchApplications();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  applications.forEach(app => {
    console.log('App:', app);
    console.log('ID:', app.id);
    console.log('First Name:', app.first_name);
    console.log('First Name:', app.last_name);
});

  if (error) return <div>Error: {error}</div>;

  return (
          <div className="applications-list">
      {applications.map(app => (
        <Card 
          key={app.id}
          status={app.status}
          onEdit={() => handleEdit(app)}
        //   onDelete={() => handleDelete(app.id)}
        >
        <h3>{`Full Name: ${app.last_name}, ${app.first_name}`}</h3>
          <p>{`Status: ${app.status}`}</p>
        </Card>
      ))}
      {/* {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <MainForm 
            initialData={selectedApplication}
            isEdit={true}
            onSubmitSuccess={handleEditSuccess}
          />
        </Modal>
      )} */}
    </div>
  );
}

export default ApplicationList;