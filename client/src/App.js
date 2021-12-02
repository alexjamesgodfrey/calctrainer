import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import AuthProvider from './Contexts/AuthContext'
import PrivateRoute from './PrivateRoute'
import Home from './Components/Home.js'
import Problems from './Components/Problems.js'
import Submit from './Components/Submit'
import Subsection from './Components/Subsection'
import Account from './Components/Account'
import Login from './Components/Authentication/Login'
import './App.scss';

function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/problems' element={<Problems/>} />
        <Route path="/subsection" element={<Subsection />} />
        <Route path="/submit" element={<Submit/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/account" element={<PrivateRoute/>}>
          <Route path="/account" element={<Account/>}/>
        </Route>
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
