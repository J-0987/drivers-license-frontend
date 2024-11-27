import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainForm from './pages/ApplicationFormPage';
import { ApplicationList } from './pages/ApplicationListPage';
import { ApplicationProvider } from './context/ApplicationContext';
// import ConfirmationPage from './components/ConfirmationPage';

function App() {
  return (
   < ApplicationProvider>
   <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainForm />} /> 
          <Route path ='/applications' element ={<ApplicationList/>} />
          {/* <Route path="/confirmation" element={<ConfirmationPage />} /> */}
        </Routes>
      </div>
    </Router>
   </ApplicationProvider>
    
  );
}

export default App;