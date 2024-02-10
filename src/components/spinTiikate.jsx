import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, ListGroup, ListGroupItem ,Modal, ModalHeader, ModalBody, ModalFooter, Button, Label, Input } from 'reactstrap';
import moment from 'moment';
import  { forwardRef } from "react";
import { FaTrash,FaEdit } from 'react-icons/fa';

const SpinTikate = forwardRef((props, ref) => {
  const { newBette } = props;
  const [betList, setBetList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [newBetAmount, setNewBetAmount] = useState(0);
  const [totalBetAmount, setTotalBetAmount] = useState(0); // New state for total bet amount
  const [totalPossibleWin, setTotalPossibleWin] = useState(0)

  const openModal = (index) => {
    setSelectedItemIndex(index);
    setModalIsOpen(true);
    setNewBetAmount(betList[index].betAmount);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const saveChanges = () => {
    if (selectedItemIndex !== null) {
      setBetList((prevItems) => {
        const newItems = [...prevItems];
        newItems[selectedItemIndex].betAmount = newBetAmount;
        return newItems;
      });
      closeModal();
    }
  };

 
  useEffect(() => {
    if (newBette && Object.keys(newBette).length > 0) {
      // Update bet list when a new bet is received
      setBetList((prevList) => [...prevList, newBette]);
      calculateTotalPossibleWin()
    }
  }, [newBette]);
  useEffect(() => {
    if (props.isTiketPrinted ==true) {
      setBetList([])
      props.handlePrint()
    }
  }, [props.isTiketPrinted, props.handelPrint]);

  useEffect(() => {
    // Recalculate total bet amount whenever items or newBetAmount change
    var calculateTotalAmount = () => {
      const total = betList.reduce((acc, item) => acc + item.betAmount, 0);
      setTotalBetAmount(total);
    };
    calculateTotalPossibleWin()
    calculateTotalAmount()
  }, [betList, newBetAmount]);
  

  const deleteItem = (index) => {
    setBetList((prevItems) => {
      // Create a new array without the item at the specified index
      const newItems = [...prevItems.slice(0, index), ...prevItems.slice(index + 1)];
      return newItems;
    });
  };

const calculateTotalPossibleWin = () => {
  let totalPossibleWin = 0;

  // Iterate through each bet in the array
  betList.forEach((bet) => {
    // Ensure the bet object has the 'possibleWin' property
    if (bet.hasOwnProperty('possibleWin')) {
      totalPossibleWin += bet.possibleWin;
    }
  });
  setTotalPossibleWin(totalPossibleWin)
};

  return (
    <div className="mt-5"  ref={ref} >
      <Card className="font-ticketing text-lg" id="ticket" >
        <CardBody>
          <div >
            <CardTitle tag="h5">3S  Betting</CardTitle>
          </div>
          <CardSubtitle tag="h6" className="mb-2 text-muted ">Game ID: {props.gameID}</CardSubtitle>

          <ListGroup>
          {betList.map((bet, index) => {
            console.log(bet)
            return (
                  <ListGroupItem key={index} className="d-flex  align-items-center">
                    <div>
                      <strong>{' '}[
                      {bet.selectedButtonsS
                        .map(selected => selected)
                        .join(', ')}]</strong>
                    </div>
                    <div>
                      <strong>________</strong> {bet.betAmount}_____<FaTrash onClick={() => deleteItem(index)} /><FaEdit onClick={() => openModal(index)} />

                    </div>
                  </ListGroupItem>
                );
  })}

          </ListGroup>

          <div className="mt-3  ">
            <div>
              <strong>Total Mony Bet :</strong> {totalBetAmount}
              
            </div>
            <div><strong>Total Possible Win :</strong>{totalPossibleWin}</div>
            <div>
              <strong>Date:</strong> {moment().format('MMMM Do YYYY, h:mm:ss a')}
            </div>
          </div>

        </CardBody>
      </Card>
      <Modal isOpen={modalIsOpen} toggle={closeModal}>
        <ModalHeader toggle={closeModal}>Edit Bet</ModalHeader>
        <ModalBody>
        <Label>
            Bet Amount:
            <Input
              type="number"
              value={newBetAmount}
              onChange={(e) => setNewBetAmount(parseInt(e.target.value, 10))}
            />
          </Label>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={saveChanges}>
            Save Changes
          </Button>
          <Button color="secondary" onClick={closeModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      
    </div>
  );
});

export default SpinTikate;
