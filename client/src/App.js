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
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/user" element={<PrivateRoute/>}>
          <Route path="/user/account" element={<Account/>}/>
          <Route path='/user/home' element={<Home/>} />
          <Route path='/user/problems' element={<Problems/>} />
          <Route path="/user/subsection" element={<Subsection />} />
          <Route path="/user/submit" element={<Submit/>} />
        </Route>
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
