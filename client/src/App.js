import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import './App.scss';
import Home from './Components/Home.js'
import Problems from './Components/Problems.js'
import Subsection from './Components/Subsection';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/problems' element={<Problems/>} />
        <Route path="/subsection" element={<Subsection/>} />
      </Routes>
    </Router>
  );
}

export default App;
