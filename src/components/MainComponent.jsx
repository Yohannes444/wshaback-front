import React,{ Component } from 'react';
import Home from './HomeComponent'
import  {connect}  from 'react-redux';
import { Row, Col } from 'reactstrap'; // or import { Row, Col } from 'tailwindcss';


const mapStateToProps = state => {
  return {
    auth:state.auth,
    user:state.user,
  }
}

const mapDispatchToProps  = (dispatch) => ({
})
class  Main extends Component {
   

  
componentDidMount(){
  
}

  render(){
   

    
    return (
      <div>
        <Home />
      </div>
    );
  }
  
}

export default Main;
