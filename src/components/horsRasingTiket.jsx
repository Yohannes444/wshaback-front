import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  ListGroup,
  ListGroupItem,

} from "reactstrap";
import moment from "moment";
import { forwardRef } from "react";
import { FaTrash } from "react-icons/fa";
import Barcode from "react-barcode";

const HorsRasingTiket = forwardRef((props, ref) => {
  const { newBette } = props;
  const [betList, setBetList] = useState([]);
  const [newBetAmount, setNewBetAmount] = useState(0);
  const [totalBetAmount, setTotalBetAmount] = useState(0); // New state for total bet amount
  const [ticketID, setTicketID] = useState('');

  console.log(props.newBette.selectedButtons);

  console.log(betList);



  useEffect(() => {
    const generateTicketID = () => {
      return Math.floor(100000 + Math.random() * 900000).toString();
    };
    setTicketID(generateTicketID());
  }, []);

 

  useEffect(() => {
    if (newBette && Object.keys(newBette).length > 0) {
      // Update bet list when a new bet is received
      setBetList((prevList) => [...prevList, newBette]);
    }
  }, [newBette]);

  useEffect(() => {
    const saveTicket = async () => {
      try {
        if (props.isTiketPrinted === true) {
          const url = "https://localhost:5454/tickets";
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              bets: betList,
              gameId: props.gameID,
              win: false, // Assuming the initial value of win is false
            }),
          });
          const data = await response.json();
          console.log("Ticket saved:", data);

          setBetList([]);
          props.handlePrint();
        }
      } catch (error) {
        console.error("Error saving ticket:", error);
      }
    };

    saveTicket();
  }, [props.isTiketPrinted, props.handlePrint, betList, props.gameID]);

  useEffect(() => {
    // Recalculate total bet amount whenever items or newBetAmount change
    var calculateTotalAmount = () => {
      const total = betList.reduce((acc, item) => acc + item.betAmount, 0);
      setTotalBetAmount(total);
    };

    calculateTotalAmount();
  }, [betList, newBetAmount]);

  const deleteItem = (index) => {
    setBetList((prevItems) => {
      // Create a new array without the item at the specified index
      const newItems = [
        ...prevItems.slice(0, index),
        ...prevItems.slice(index + 1),
      ];
      return newItems;
    });
  };

  return (
    <div className="mt-5" ref={ref}>
      <Card className="font-ticketing text-lg" id="ticket">
        <CardBody>
        <div>
            <CardTitle tag="h3" style={{ marginLeft: '10px' , fontSize:"25px" }}>3S-Betting</CardTitle>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <CardTitle tag="p" style={{ marginLeft: '10px', fontSize:"18px" }}>Ticket-Number: {ticketID}</CardTitle>
            </div>
          </div>
          <CardSubtitle tag="h6" className="mb-2 text-muted ">
            Game ID: {props.gameID}
          </CardSubtitle>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h5>Hourse Racing</h5>
          </div>
          <ListGroup>
            {betList.map((bet, index) => {
              console.log(bet);

              if (bet.selectedButtons.length >= 1) {
                return (
                  <ListGroupItem
                    key={index}
                    className="d-flex flex-column align-items-start"
                  >
                    {bet.selectedButtons.map((selectedBtn, btnIndex) => {
                      const [rank, dogNumber] = selectedBtn;
                      let displayValue;

                      switch (rank) {
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

                      return (
                        <div
                          key={btnIndex}
                          className="d-flex align-items-center mb-2 w-100"
                        >
                          <div className="flex-grow-1">
                            <strong>[{dogNumber}]</strong> {displayValue}
                            <span className="ml-2">
                              <strong>________</strong> {bet.betAmount}_____
                            </span>
                          </div>
                          <div className="ml-2">
                            <FaTrash
                              onClick={() => deleteItem(index, btnIndex)}
                              style={{ cursor: "pointer", marginRight: "10px", color: "red" }}
                            />
                            {/* <FaEdit onClick={() => openModal(index, btnIndex)} style={{ cursor: 'pointer' }} /> */}
                          </div>
                        </div>
                      );
                    })}
                  </ListGroupItem>
                );
              }
            })}
          </ListGroup>

          <div className="mt-3  ">
            <div>
              <strong>Total :</strong> {totalBetAmount} Birr
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                 <Barcode value={ticketID} width={2} height={30} displayValue={false} />
              </div>
            </div>
            <div>
              <strong>Date:</strong>{" "}
              {moment().format("MMMM Do YYYY, h:mm:ss a")}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
});

export default HorsRasingTiket;
