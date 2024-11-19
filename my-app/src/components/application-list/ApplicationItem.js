
import  StatusIndicator  from './StatusIndicator';
import  ApplicationDetailsDropdown  from './ApplicationDetailsDropdown';
import EditBtn from '../buttons/EditBtn';
import DeleteBtn from '../buttons/DeleteBtn';
import ViewBtn from '../buttons/ViewBtn';



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
        <ViewBtn applicationId={application.id} />
        {application.status === 'in_progress' && (
          <EditBtn applicationId={application.id} />
        )}
        <DeleteBtn 
          applicationId={application.id} 
          onDelete={() => {/* handle delete */}} 
        />
        <ApplicationDetailsDropdown application={application} />
      </div>
    </div>
  );
};
export default ApplicationItem;