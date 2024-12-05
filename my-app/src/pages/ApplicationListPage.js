import { useState, useEffect } from 'react';
import axios from 'axios';

function ApplicationList() {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      const fetchApplications = async () => {
          try {
            const response = await axios.get('http://127.0.0.1:8000/api/applications');


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
    console.log('Height (cm):', app.height_cm);
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
                      <th className="border p-2">Email</th>
                      <th className="border p-2">Phone</th>
                      <th className="border p-2">Address</th>
                      <th className="border p-2">Date of Birth</th>
                      <th className="border p-2">License Type</th>
                      <th className="border p-2">Status</th>
                  </tr>
              </thead>
              <tbody>
                  {applications.map((app) => (
                      <tr key={app.id}>
                    
                          <td className="border p-2">{app.first_name}</td>
                          <td className="border p-2">{app.middle_name}</td>
                          <td className="border p-2">{app.last_name}</td>
                          <td className="border p-2">{app.license_number}</td>
                          <td className="border p-2">{app.province}</td>
                          <td className="border p-2">{app.postal_code}</td>
                          <td className="border p-2">{app.residential_address}</td>
                          <td className="border p-2">{app.date_of_birth}</td>
                          <td className="border p-2">{app.sex}</td>
                          <td className="border p-2">{app.height_cm}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
  );
}

export default ApplicationList;