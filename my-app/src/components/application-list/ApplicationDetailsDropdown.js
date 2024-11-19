
import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const ApplicationDetailsDropdown = ({ application }) => {

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };


  const personalDetails = [
    { label: 'First Name', value: application.first_name },
    { label: 'Last Name', value: application.last_name },
    { label: 'Middle Name', value: application.middle_name },
    { label: 'Date of Birth', value: formatDate(application.date_of_birth) },
    { label: 'Sex', value: application.sex },
    { label: 'Height (cm)', value: application.height_cm },
    { label: 'License Number', value: application.license_number },
  ];

  const addressDetails = [
    { label: 'Residential Address', value: application.residential_address },
    { label: 'Mailing Address', value: application.mailing_address },
    { label: 'Province', value: application.province },
    { label: 'Postal Code', value: application.postal_code },
  ];

  const DetailSection = ({ title, items }) => (
    <div className="px-4 py-2">
      <h3 className="text-sm font-medium text-gray-900 mb-2">{title}</h3>
      <div className="space-y-1">
        {items.map(({ label, value }) => (
          value && (
            <div key={label} className="grid grid-cols-2 text-sm">
              <span className="text-gray-500">{label}:</span>
              <span className="text-gray-900">{value}</span>
            </div>
          )
        ))}
      </div>
    </div>
  );

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        Details
        <ChevronDownIcon className="ml-2 h-4 w-4" aria-hidden="true" />
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-2 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1 divide-y divide-gray-100">
          <DetailSection title="Personal Information" items={personalDetails} />
          <DetailSection title="Address Information" items={addressDetails} />
          
          <div className="px-4 py-2 text-xs text-gray-500">
            Application ID: {application.id}
          </div>
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default ApplicationDetailsDropdown;