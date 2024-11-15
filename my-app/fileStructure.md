src/
├── components/
│   ├── ApplicationList/             // Components for the Application List feature
│   │   ├── ApplicationItem.js       // Displays an application with actions (View/Edit/Delete)
│   │   ├── ApplicationDetailsDropdown.js // Dropdown for viewing submitted applications (read-only)
│   │   └── StatusIndicator.js       // Shows status (e.g., "In Progress", "Submitted")
│   ├── FormSections/                // Components for sections of the form
│   │   ├── PersonalDetails.js       // Handles personal details fields
│   │   └── AddressDetails.js        // Handles address fields
│   ├── Navigation/                  // Navigation-related components
│   │   └── NavBar.js                // The main navigation bar

├── pages/                           // High-level page components
│   ├── MainPage.js                  // The main landing page
│   ├── ApplicationListPage.js       // Page for listing applications
│   ├── ApplicationFormPage.js       // Page for creating/editing applications
│   └── ConfirmationPage.js          // Optional page for confirming form submission
├── App.js                           // Main app component with routing
└── index.js                         // Entry point of the app
