import './App.css';
import Main from './components/MainComponent';
import Master2 from './components/master2'
import Spin from './components/spinComponent'
import React,{ Component } from 'react';
 import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import Animation from "./components/animation"
import 'bootstrap/dist/css/bootstrap.min.css';
// import './index.css'
import AnimeDoge  from './components/animeDogComponent'

 function App() {
    return (
        <BrowserRouter>
            <div className="App">
              <Routes>
                <Route path="/" element={<Main/>} />
                <Route path="/keno" element={<Master2/>} />
                <Route path='/spin' element={<Spin/>}/>
                <Route path= '/animation' element={<Animation/>}/>
                <Route path= '/animedog' element= {<AnimeDoge/>}/>
              </Routes>
              
              
            </div>
          </BrowserRouter>

          
    );
  
}

export default App;




// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App


