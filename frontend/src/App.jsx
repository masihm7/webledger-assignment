import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Landing } from './Pages/LandingPage';
import { Dashboard } from './Pages/Dashboard';
import { Login } from './Pages/Login';
import { Signup } from './Pages/Signup';
import { DetailsPage } from './Pages/DetailsPage';
import AuthProvider from './context/AuthContext';
import { SavedRecipe } from './Pages/SavedRecipe';
import { Private } from './context/Private';

//skeletons flowbite ,debouncing on search, react tostify toster, ui from internet,  

function App() {
  return (
      <Router>
          <AuthProvider>
              <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/dash" element={<Private><Dashboard /></Private>} />
                  <Route path="/Saved" element={<Private><SavedRecipe /></Private>} />
                  <Route path="/recipe/:id" element={<Private><DetailsPage /></Private>} />
              </Routes>
          </AuthProvider>
      </Router>
  );
}



export default App;
