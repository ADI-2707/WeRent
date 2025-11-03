
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar'
import { useState } from 'react'
import Home from './pages/Home.jsx'
import Cars from './pages/Cars.jsx'
import CarDetails from './pages/CarDetails.jsx'
import MyBookings from './pages/MyBookings.jsx'
import Footer from './components/Footer.jsx';

const App = () => {

  const [showLogin, setShowLogin] = useState(false);
  const isOwnerPath = useLocation().pathname.startsWith('/owner');

  return (
    <>
      {!isOwnerPath && <Navbar setShowLogin={setShowLogin} />}

      <Routes>
        <Route path ='/' element ={<Home />} />
        <Route path ='/cars' element ={<Cars />} />
        <Route path ='/car-details/:id' element ={<CarDetails />} />
        <Route path ='/my-bookings' element ={<MyBookings />} />
      </Routes>
      {!isOwnerPath && <Footer />}
    </>
  )
}

export default App
