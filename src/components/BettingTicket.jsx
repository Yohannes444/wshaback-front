import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, ListGroup, ListGroupItem, Modal, ModalHeader, ModalBody, ModalFooter, Button, Label, Input } from 'reactstrap';
import moment from 'moment';
import { forwardRef } from "react";
import { FaTrash, FaEdit } from 'react-icons/fa';

const Tikete = forwardRef((props, ref) => {
  const { newBette } = props;
  const [betList, setBetList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [newBetAmount, setNewBetAmount] = useState(0);
  const [totalBetAmount, setTotalBetAmount] = useState(0);

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
      setBetList((prevList) => [...prevList, newBette]);
    }
  }, [newBette]);

  useEffect(() => {
    const saveTicket = async () => {
      try {
        if (props.isTiketPrinted) {
          const url = 'http://localhost:5454/grayhorn';
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              bets: betList,
              gameId: props.gameID,
              win: false,
            })
          });
          const data = await response.json();
          console.log('Ticket saved:', data);

          setBetList([]);
          props.handlePrint();
        }
      } catch (error) {
        console.error('Error saving ticket:', error);
      }
    };

    saveTicket();
  }, [props.isTiketPrinted, props.handlePrint, betList, props.gameID]);

  useEffect(() => {
    const calculateTotalAmount = () => {
      const total = betList.reduce((acc, item) => acc + item.betAmount, 0);
      setTotalBetAmount(total);
    };

    calculateTotalAmount();
  }, [betList]);

  const deleteItem = (index) => {
    setBetList((prevItems) => {
      const newItems = [...prevItems.slice(0, index), ...prevItems.slice(index + 1)];
      return newItems;
    });
  };

  return (
    <div className="mt-5" ref={ref}>
      <Card className="font-ticketing text-lg" id="ticket">
        <CardBody>
          <div>
            <CardTitle tag="h5">3S Betting</CardTitle>
          </div>
          <CardSubtitle tag="h6" className="mb-2 text-muted">Game ID: {props.gameID}</CardSubtitle>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h3>DOG</h3>
          </div>
          <ListGroup>
            {betList.map((bet, index) => {
              let displayValue;
              let correspondingAmount;

              if (bet.selectedButtons.length === 1) {
                const firstElement = bet.selectedButtons[0][0];

                switch (firstElement) {
                  case 1:
                    displayValue = "WIN";
                    break;
                  case 2:
                    displayValue = "PLACE";
                    break;
                  case 3:
                    displayValue = "SHOW";
                    break;
                  default:
                    displayValue = "UNKNOWN";
                }
                correspondingAmount = bet.betAmount;
              } else if (bet.isQuinellaActive) {
                displayValue = "QUINELLA";
                correspondingAmount = bet.betAmount;
              } else if (bet.isExactaActive) {
                displayValue = "EXACTA";
                correspondingAmount = bet.betAmount;
              } else {
                displayValue = `[${
                  bet.selectedButtons
                    .sort((a, b) => a[0] - b[0])
                    .map(selected => selected[1])
                    .join(', ')
                }]`;
                correspondingAmount = bet.betAmount;
              }

              return (
                <ListGroupItem key={index} className="d-flex align-items-center">
                  <div>
                    <strong>{displayValue}</strong>
                  </div>
                  <div>
                    <strong>________</strong> {correspondingAmount} _____
                    <FaTrash onClick={() => deleteItem(index)} /><FaEdit onClick={() => openModal(index)} />
                  </div>
                </ListGroupItem>
              );
            })}
          </ListGroup>

          <div className="mt-3">
            <div>
              <strong>Total:</strong> {totalBetAmount}
            </div>
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
          <Button color="primary" onClick={saveChanges}>Save Changes</Button>
          <Button color="secondary" onClick={closeModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
});

export default Tikete;
