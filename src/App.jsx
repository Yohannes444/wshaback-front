import './App.css';
import Main from './components/MainComponent';
import Master2 from './components/master2'
import Spin from './components/spinComponent'
import React,{ Component } from 'react';
 import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configurStore'
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import Animation from "./components/horsRasingPage"
import AnimeDoge from './components/animeDogComponent'

 const store = ConfigureStore(); 
class  App extends Component {
  render(){
    return (
        <Provider store={store}>
          <BrowserRouter>
            <div className="App">
              <Routes>
                <Route path="/" element={<Main/>} />
                <Route path="/keno" element={<Master2/>} />
                <Route path='/spin' element={<Spin/>}/>
                <Route path= '/animation' element={<Animation/>}/>
                <Route path='/animationDog' element= {<AnimeDoge/>}/>
              </Routes>
              
              
            </div>
          </BrowserRouter>
        </Provider>


      

    );
  }
  
}

export default App;
