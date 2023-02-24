import { 
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import './App.css';
import InputForm from './components/InputForm';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<InputForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
