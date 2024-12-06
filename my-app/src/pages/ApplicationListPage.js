import { useState, useEffect } from 'react';
import axios from 'axios';
import { driverLicenseApi } from '../api/driverLicense';
import Card from '../components/Card/Card';


function ApplicationList() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);




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
      <div>
          <h2>Driver License Applications</h2>
          <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                  <tr>
                      <th className="border p-2">ID</th>
                      <th className="border p-2">First Name</th>
                      <th className="border p-2">Last Name</th>                  
                      <th className="border p-2">Status</th>
                  </tr>
              </thead>
              <tbody>
                  {applications.map((app) => (
                      <tr key={app.id}>
                          <td className="border p-2">{app.id}</td>
                          <td className="border p-2">{app.first_name}</td>
                          <td className="border p-2">{app.last_name}</td>
                          <td className="border p-2">{app.status}</td>
                      </tr>
                  ))}
              </tbody>
          </table>

          <div className="applications-list">
      {applications.map(app => (
        <Card 
          key={app.id}
          status={app.status}
          onEdit={() => handleEdit(app.id)}
        //   onDelete={() => handleDelete(app.id)}
        >
        <h3>{`Full Name: ${app.last_name}, ${app.first_name}`}</h3>
          <p>{`Status: ${app.status}`}</p>
        </Card>
      ))}
    </div>
 
      </div>
  );
}

export default ApplicationList;