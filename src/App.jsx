// import './App.css';
// import Main from './components/MainComponent';
// import Master2 from './components/master2'
// import Spin from './components/spinComponent'
// import React,{ Component } from 'react';
//  import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
// import { Routes, Route } from "react-router-dom";
// import Animation from "./components/animation"
// import 'bootstrap/dist/css/bootstrap.min.css';
// // import './index.css'
// import AnimeDoge  from './components/animeDogComponent';
// import AnimeHourse from "./components/horsRasingPage";

//  function App() {
//     return (
//         <BrowserRouter>
//             <div className="App">
//               <Routes>
//                 <Route path="/" element={<Main/>} />
//                 <Route path="/keno" element={<Master2/>} />
//                 <Route path='/spin' element={<Spin/>}/>
//                 <Route path= '/animation' element={<Animation/>}/>
//                 <Route path= '/animedog' element= {<AnimeDoge/>}/>
//                 <Route path="/animehourse" element={<AnimeHourse/>}/>
//               </Routes>
              
//             </div>
//           </BrowserRouter>
//     ); 
// }

// export default App;



import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { initializeUser, selectUser } from "./redux/slice/userSlice";
import Login from "./pages/Login";
import Sidebar from "./layout/Sidebar";
import Topbar from "./layout/Topbar";
import OrderStatusCountDetail from "./pages/OrderDetailDisplay";
import ErrorPage  from "./pages/404";
import Main from './components/MainComponent';
import Animation from "./components/animation";
import Master2 from './components/master2';
import PostResultTry from "./components/PostResultTry";
import PostResultAnime from "./components/PostResultAnime";
import PostResultKeno from "./components/PostResultKeno";
import TicketHistroy from "./pages/OrderDetailDisplay";
import Dashboard from "./components/Dashboard";
import Pay from "./components/Pay";

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectUser);

   console.log(user)

  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(initializeUser());
      setLoading(false);
    };

    fetchUser();
  }, [dispatch]);

  if (loading) {
    return null; // Or a loading spinner
  }

  return (
    <div>
      {user && user.jwt && <Topbar userRole={user.role} />}
      <div style={{ padding: "0px" }}>
        {user && user.jwt && <Sidebar userRole={user.role} />}
        <div style={{ marginLeft: user && user.jwt ? 200 : 0 }}>
          <Routes>
            {user && user.jwt ? (
              user.role === "cashier" ? (
                <>
                  {/* <Route path="/" element={<Navigate to="/dashboard" />} /> */}
                  {/* <Route path="/dashboard" element={<Dashboard userRole={user.role} />} /> */}
                  <Route path="/tryfecta/Home" element={<Main />} />
                  <Route path="/tryfecta/TicketResult" element={<PostResultTry />} />
                  {/* <Route path="/tryfecta/TicketResult" element={<Dashboard userRole={user.role} />} /> */}
                  <Route path="/animation/Home" element={<Animation />} />
                  <Route path="/OrderStatusCounDetail" element={<OrderStatusCountDetail />} />
                  <Route path="/Keno/Home" element={<Master2 />} />
                  <Route path="/animation/TicketResult" element={<PostResultAnime />} />
                  <Route path="/Keno/TicketResult" element={<PostResultKeno />} />
                  <Route path="/animation/pay" element={<TicketHistroy />} />
                  <Route path="/animation/TicketHistroyDog" element={<TicketHistroy />} />
                  <Route path="/tryfecta/Dashboard" element={<Dashboard />} />
                  <Route path="/tryfecta/Dashboard" element={<Dashboard />} />
                </>
              ) : user.role === "Registral" ? (
                <>
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                  <Route path="/dashboard" element={<Dashboard userRole={user.role} />} />
                </>
              ) : null
            ) : (
              <Route path="/" element={<Login />} />
            )}
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
