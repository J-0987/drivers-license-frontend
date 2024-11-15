import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainForm from './pages/MainForm';
// import ConfirmationPage from './components/ConfirmationPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<MainForm />} />
          {/* <Route path="/confirmation" element={<ConfirmationPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;