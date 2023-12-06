import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, ListGroup, ListGroupItem, Button } from 'reactstrap';
import moment from 'moment';

const Ticket = (props) => {
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

  const handlePrintClick = () => {
    // Assume you want to print the ticket here
    // You can add your logic to trigger printing
    console.log('Printing ticket...');
    // You may want to implement logic to print using a POS machine
  };

  return (
    <div className="mt-5">
      <Card>
        <CardBody>
          <div className="text-center">
            <CardTitle tag="h5">3S Betting</CardTitle>
          </div>
          <CardSubtitle tag="h6" className="mb-2 text-muted text-center">Betting Company Name</CardSubtitle>

          <ListGroup>
            {betList.map((bet, index) => (
              <ListGroupItem key={index} className="d-flex justify-content-between align-items-center">
                <div>
                   {JSON.stringify(bet.selectedButtons)}
                </div>
                <div>
                  <strong>________</strong> {bet.betAmount}
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>

          <div className="mt-3 d-flex justify-content-between">
            <div>
              <strong>Total :</strong> {calculateTotalAmount()}
            </div>
            <div>
              <strong>Date:</strong> {moment().format('MMMM Do YYYY, h:mm:ss a')}
            </div>
          </div>

          {/* Print Button */}
          <div className="text-center mt-3">
            <Button
              color="primary"
              onClick={handlePrintClick}
            >
              Print
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Ticket;
