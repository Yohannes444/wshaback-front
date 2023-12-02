import React,{ Component } from 'react';
import Home from './HomeComponent'
import { Switch, Route,withRouter } from "react-router-dom";
import  {connect}  from 'react-redux';
import { Row, Col } from 'reactstrap'; // or import { Row, Col } from 'tailwindcss';
import  Ticket  from './BettingTicket'


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

            <div className="App">
        <Row>
          <Col md={8}>
            <Home />
          </Col>
          <Col md={4}>
            <Ticket />
          </Col>
        </Row>
      </div>

    );
  }
  
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
