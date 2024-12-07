// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar'
import ApplicationListPage from './pages/ApplicationListPage';
import MainForm from './pages/ApplicationFormPage';

const NotFound = () => (
  <div className="not-found">
    <h1>404 - Page Not Found</h1>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<ApplicationListPage />} />
        <Route path="/applications" element={<ApplicationListPage />} />
        <Route path="/application-form" element={<MainForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;