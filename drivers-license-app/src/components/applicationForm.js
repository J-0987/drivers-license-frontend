import React, { useState } from 'react';

const ApplicationForm = () => {
    // State for form fields
    const [formData, setFormData] = useState({
        firstName: '',
        lastName:'',
        middleName: '',
        driversLicense: '',
        sex:'',
        height:'',
        birthDate: '',
       
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        // Add form submission logic here
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <h2 className="text-xl font-semibold">Driver's License Application</h2>

            <div>
                <label className="block">Last Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                />
            </div>

            <div>
                <label className="block">First Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                />
            </div>

            <div>
                <label className="block">Middle Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                />
            </div>

            <div>
                <label className="block">Date of Birth:</label>
                <input
                    type="date"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                />
            </div>

            <div>
                <label className="block">Physical Attributes:</label>
                <input
                    type="text"
                    name="physicalAttributes"
                    value={formData.physicalAttributes}
                    onChange={handleChange}
                    className="border p-2 w-full"
                
                    required
                />
            </div>

            <div>
                <label className="block">Residential Address:</label>
                <textarea
                    name="residentialAddress"
                    value={formData.residentialAddress}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                />
            </div>

            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Submit
            </button>
        </form>
    );
};

export default ApplicationForm;
