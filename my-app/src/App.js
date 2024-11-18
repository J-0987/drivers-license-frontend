import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainForm from './pages/ApplicationFormPage';
import { ApplicationList } from './pages/ApplicationListPage';
// import ConfirmationPage from './components/ConfirmationPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainForm />} />
          <Route path ='/list' element ={<ApplicationList />} />
          {/* <Route path="/confirmation" element={<ConfirmationPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;