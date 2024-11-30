import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainForm from './pages/ApplicationFormPage';
import  ApplicationList  from './pages/ApplicationListPage';
// import ConfirmationPage from './components/ConfirmationPage';
import { ApplicationProvider } from './context/ApplicationContext';

function App() {
  return (
<ApplicationProvider>


   <Router>
      <div>
        <Routes>
          {/* <Route path="/" element= {<ApplicationList />} />  */}
          <Route path ='/' element ={<ApplicationList/>} />
          <Route path="/application-form" element={<MainForm />} />
          {/* <Route path="/confirmation" element={<ConfirmationPage />} /> */}
        </Routes>
      </div>
      
    </Router>
    </ApplicationProvider>

  );
}

export default App;