
import { StatusIndicator } from '../StatusIndicator';
import { ApplicationDetailsDropdown } from '../ApplicationDetailsDropdown';
import { EditButton, DeleteButton, ViewButton } from '../buttons';

const ApplicationItem = ({ application }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-4">
        <StatusIndicator status={application.status} />
        <div>
          <p className="font-medium">Application ID: {application.id}</p>
          <p className="text-sm text-gray-500">
            {new Date(application.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <ViewButton applicationId={application.id} />
        {application.status === 'in_progress' && (
          <EditButton applicationId={application.id} />
        )}
        <DeleteButton 
          applicationId={application.id} 
          onDelete={() => {/* handle delete */}} 
        />
        <ApplicationDetailsDropdown application={application} />
      </div>
    </div>
  );
};
export default ApplicationItem;