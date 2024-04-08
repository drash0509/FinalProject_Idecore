// import React from 'react'

// import { useNavigate } from 'react-router-dom';

// const MainScreen = () => {
//   let navigate = useNavigate();

//   return (
//     <div>
//       <h1>Main Dashboard</h1>
//       <button onClick={() => navigate('/CustomerDashboard')}>Seller</button>
//       <button onClick={() => navigate('/CustomerDashboard')}>Buyer</button>
//     </div>
//   );

// }

// export default MainScreen


import React from 'react'
import MainRoute from './Routes/MainRoute'
// import HomeMain from './Screens/HomeMain'
import Navbar from './Components/NavBar'
const MainScreen = () => {
  return (
    <>
    <Navbar/>
      <MainRoute/>
    </>
  )
}

export default MainScreen
