import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, ListGroup, ListGroupItem, Button } from 'reactstrap';
import moment from 'moment';
import  { forwardRef } from "react";


const Tikete = forwardRef((props, ref) => {
  const { newBette } = props;
  const [betList, setBetList] = useState([]);

  useEffect(() => {
    if (newBette && Object.keys(newBette).length > 0) {
      // Update bet list when a new bet is received
      setBetList((prevList) => [...prevList, newBette]);
    }
  }, [newBette]);

  const calculateTotalAmount = () => {
    return betList.reduce((total, bet) => total + bet.betAmount, 0);
  };



  return (
    <div className="mt-5"  ref={ref}>
      <Card>
        <CardBody>
          <div className="text-center">
            <CardTitle tag="h5">3S Betting</CardTitle>
          </div>
          <CardSubtitle tag="h6" className="mb-2 text-muted text-center">Game ID: {props.gameID}</CardSubtitle>

          <ListGroup>
          {betList.map((bet, index) => {
  // Check if the length of selectedButtons array is 1
  if (bet.selectedButtons.length === 1) {
    const firstElement = bet.selectedButtons[0][0];

    let displayValue;
    let correspondingAmount;

    // Use a switch statement or if-else if statements for different cases
    switch (firstElement) {
      case 1:
        displayValue = "    WIN";
        correspondingAmount = bet.betAmount;
        break;
      case 2:
        displayValue = "    PLACE";
        correspondingAmount = bet.betAmount;
        break;
      case 3:
        displayValue = "    SHOW";
        correspondingAmount = bet.betAmount;
        break;
      // Add more cases if needed

      default:
        // Handle the default case
        displayValue = "UNKNOWN";
        correspondingAmount = bet.betAmount;
    }

    return (
      <ListGroupItem key={index} className="d-flex justify-content-between align-items-center">
        <div>
          <strong>{bet.selectedButtons[0][1]}</strong>
          {displayValue} 
        </div>
        <div>
        <strong>________</strong> {correspondingAmount}
      </div>
      </ListGroupItem>
    );
  }

  if (bet.isQuinellaActive === true) {

    let displayValue;
    let correspondingAmount;

    displayValue = "    QUINELLA";
    correspondingAmount = bet.betAmount;
    return (
      <ListGroupItem key={index} className="d-flex justify-content-between align-items-center">
        <div>
        <strong>{bet.selectedButtons[0][1]},{bet.selectedButtons[1][1]}</strong>
          {displayValue} 
        </div>
        <div>
        <strong>________</strong> {correspondingAmount}
      </div>
      </ListGroupItem>
    );
  }
  if (bet.isExactaActive === true) {

    let displayValue;
    let correspondingAmount;

    displayValue = "    EXACTA";
    correspondingAmount = bet.betAmount;
    return (
      <ListGroupItem key={index} className="d-flex justify-content-between align-items-center">
        <div>
          <strong>{bet.selectedButtons[0][1]},{bet.selectedButtons[1][1]}</strong>
          {displayValue} 
        </div>
        <div>
        <strong>________</strong> {correspondingAmount}
      </div>
      </ListGroupItem>
    );
  }
  // Default rendering if selectedButtons array length is not 1
  return (
    <ListGroupItem key={index} className="d-flex justify-content-between align-items-center">
      <div>
        <strong></strong>{' '}
        {bet.selectedButtons
          .sort((a, b) => a[0] - b[0])
          .map(selected => selected[1])
          .join(', ')}
      </div>
      <div>
        <strong>________</strong> {bet.betAmount}
      </div>
    </ListGroupItem>
  );
  })}




          </ListGroup>

          <div className="mt-3 d-flex justify-content-between">
            <div>
              <strong>Total :</strong> {calculateTotalAmount()}
            </div>
            <div>
              <strong>Date:</strong> {moment().format('MMMM Do YYYY, h:mm:ss a')}
            </div>
          </div>

        </CardBody>
      </Card>
    </div>
  );
});

export default Tikete;
