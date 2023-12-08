import React, { useState } from 'react';
import './homePage.css';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { Button, Container, Row, Col, Card, FormGroup, Label, Input, CardText } from 'reactstrap';
import  Ticket  from './BettingTicket'
import ReactToPrint from "react-to-print"; // Import the ReactToPrint component

const Home = (props) => {
    const [selectedButtons, setSelectedButtons] = useState([]);
    const [betAmount, setBetAmount] = useState(20);
    const [gameID, setGameID] = useState(1000); 
    const [newBette, setNewBette] = useState([])
    const [isQuinellaActive, setQuinellaActive] = useState(false);
    const [isExactaActive, setExactaActive] = useState(false);
    const [isTiketPrinted,setIsTiketPrinted]= useState(false)

  const handleAmountChange = (event) => {
    setBetAmount(event.target.value);
  };
  const handleQunelaClikd = () => {
    setQuinellaActive(true);
    setExactaActive(false)
  };
  const handleExactCliked = () => {
    setQuinellaActive(false);
    setExactaActive(true)
  };

  const handleButtonClick = (amount) => {
    setBetAmount(amount);
  };
  const sendToTicket = (bet) => {
    // Handle the bet data in the parent component
    console.log('Received bet data:', bet);
    setNewBette(bet)
  };

  const handlePrint= () =>{
    setIsTiketPrinted(!isTiketPrinted)
  }
  const handleAddClick = () => {
    // Create the bet object
    const bet = {
      selectedButtons,
      betAmount,
      isExactaActive,
      isQuinellaActive
    };
  
    // Send the bet object to the Ticket component
    sendToTicket(bet);
  
    // Clear selected buttons
    clearSelectedButtons();
    setExactaActive(false)
    setQuinellaActive(false)
    // Update styling of the button
    
  };
  
  // Function to clear selected buttons
  const clearSelectedButtons = () => {
    const radioColumns = document.querySelectorAll('.radio-col');
    radioColumns.forEach((column) => {
      const buttons = column.querySelectorAll('.radio-button');
      buttons.forEach((button) => {
        button.classList.remove('selected');
      });
    });
  
    // Clear selectedButtons state
    setSelectedButtons({});
  };
  
  const isSameIndexSelected = (newSelected, columnIndex, index) => {
    return newSelected.some(
      (selected) => selected.length > 0 && selected[0] !== columnIndex && selected[1] === index
    );
  };

  const selectRadioButton = (column, index) => {
    setSelectedButtons((prevSelected) => {
      const newSelected = [...prevSelected];

      const selectedButtonIndex = newSelected.findIndex(
        (selected) => selected.length > 0 && selected[0] === column
      );

      if (selectedButtonIndex !== -1 && newSelected[selectedButtonIndex][1] === index) {
        // Deselect the button if it's already selected
        const selectedButton = document.getElementById(`column${column}`).children[index - 1];
        selectedButton.classList.toggle('selected');
        newSelected.splice(selectedButtonIndex, 1);
      } else {
        // Deselect the previous button in the same column, if any
        const prevSelectedInColumn = newSelected.filter((selected) => selected[0] === column);
        prevSelectedInColumn.forEach((prevSelected) => {
          const prevIndex = prevSelected[1];
          const ss= document.getElementById(`column${column}`).children[prevIndex - 1].classList.remove('selected');
          newSelected.splice(ss,1);

        });

        // Check if the same index is selected in any column
        if (isSameIndexSelected(newSelected, column, index)) {
          console.log("Cannot select the same number in multiple columns.");
        } else {
          // Select the new button
          newSelected.push([column, index]);
          const selectedButton = document.getElementById(`column${column}`).children[index - 1];
          selectedButton.classList.add('selected');
        }
      }

      console.log(`Selected buttons: ${JSON.stringify(newSelected)}`);
      if (newSelected.length === 2) {
        setQuinellaActive(true);
      }else{
        setExactaActive(false)
        setQuinellaActive(false)
      }


      return newSelected;
    }
    );
  };
  console.log(selectedButtons);

    

const handleGameIDChange= (event)=>{
    setGameID(event.target.value)
}
const incrementGameID = () => {
    setGameID((prevGameID) => prevGameID + 4);
  };

  const decrementGameID = () => {
    setGameID((prevGameID) => Math.max(prevGameID - 4, 0));
  };


  
  return (
    <div>
      <Row>
          <Col md={8}>
      <div>

    <section id="list-group">
    <div className="container-lg" style={{backgroundImage: 'url("Top_Landing_Pge.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>

            <h1  className="text-white" style={{ textAlign: 'center' }}>3S BETTEING</h1>
            <div className="text-center mb-3">
            <div className=" text-center">
              <h5 htmlFor="gameID" className=" text-white p-3 ">
                Game ID
              </h5>
                <input
                  type="number"
                  id="gameID"
                  className=" mb-2"
                  value={gameID}
                  onChange={handleGameIDChange}
                />
                <FaPlus
                  className="text-warning me-2 "
                  style={{ cursor: 'pointer' }}
                  onClick={incrementGameID}
                />
                <FaMinus className="text-warning" style={{ cursor: 'pointer' }} onClick={decrementGameID} />
            </div>
              </div>
            <Row>
            <Col xs="8">
                <div className="radio-container d-flex">
                    <div className="me-4">
                        <div className="bg-success fs-3 text-white p-3">WIN</div>
                        <div className="radio-col" id="column1">
                    <button className="radio-button" onClick={() => selectRadioButton(1, 1)}>1</button>
                    <button className="radio-button" onClick={() => selectRadioButton(1, 2)}>2</button>
                    <button className="radio-button" onClick={() => selectRadioButton(1, 3)}>3</button>
                    <button className="radio-button" onClick={() => selectRadioButton(1, 4)}>4</button>
                    <button className="radio-button" onClick={() => selectRadioButton(1, 5)}>5</button>
                    <button className="radio-button" onClick={() => selectRadioButton(1, 6)}>6</button>
                </div>
                </div>
        
                <div>
                <div class="bg-primary fs-3 text-white p-3 me-4">PLACE</div>
                <div className="radio-col" id="column2">
                    <button className="radio-button" onClick={() => selectRadioButton(2, 1)}>1</button>
                    <button className="radio-button" onClick={() => selectRadioButton(2, 2)}>2</button>
                    <button className="radio-button" onClick={() => selectRadioButton(2, 3)}>3</button>
                    <button className="radio-button" onClick={() => selectRadioButton(2, 4)}>4</button>
                    <button className="radio-button" onClick={() => selectRadioButton(2, 5)}>5</button>
                    <button className="radio-button" onClick={() => selectRadioButton(2, 6)}>6</button>
                </div>
                </div>
                <div>
                <div class="bg-danger fs-3 text-white p-3 me-4">SHOW</div>
                    <div className="radio-col" id="column3">
                    <button className="radio-button" onClick={() => selectRadioButton(3, 1)}>1</button>
                    <button className="radio-button" onClick={() => selectRadioButton(3, 2)}>2</button>
                    <button className="radio-button" onClick={() => selectRadioButton(3, 3)}>3</button>
                    <button className="radio-button" onClick={() => selectRadioButton(3, 4)}>4</button>
                    <button className="radio-button" onClick={() => selectRadioButton(3, 5)}>5</button>
                    <button className="radio-button" onClick={() => selectRadioButton(3, 6)}>6</button>
                </div>
                    </div>
                </div>
            </Col>
            <Col xs="3.8" style={{backgroundImage: 'url("imag")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
            <div >
            <div className="text-center mt-4"  >

                  <Button
                    id="addButton"
                    color="dark"
                    onClick={handleAddClick}
                    className="text-white"
                  >
                    ADD
                  </Button>
                </div>
              <label htmlFor="betAmount" id="label" >
                Bet Amount
              </label>
              <input
                type="number"
                id="betAmount"
                className="form-control mb-2"
                value={betAmount}
                onChange={handleAmountChange}
              />
              <div className="d-flex">
                {[5, 10, 20, 30, 40, 50,100].map((amount) => (
                  <Button
                    key={amount}
                    color={betAmount === amount ? 'primary' : 'orange'}
                    className="me-2"
                    onClick={() => handleButtonClick(amount)}
                  >
                    {amount}
                  </Button>
                  
                ))}
          
              </div>
              <div>
        <Button
          color={isQuinellaActive ? 'primary' : 'secondary'}
          onClick={() => {
            handleQunelaClikd()
            console.log('QUINELLA bet placed');
          }}
        >
          QUINELLA
        </Button>
        <Button
          color={isExactaActive ? 'primary' : 'secondary'}
          onClick={() => {
            handleExactCliked()
            console.log('EXACTA bet placed');
          }}
        >
          EXACTA
        </Button>
      </div>
                
            </div>
          </Col>
        </Row>
    </div>
    </section>
    
                <style jsx>{`
                    .haveree:hover {
                      transform: scale(1.1);
                      transition: transform 0.2s ease-in-out;
                    }
                  `}</style>
      </div>
      </Col>
      <Col md={4} style={{background: 'linear-gradient(to top, rgb(226, 171, 126), rgb(126, 176, 226))'}} >
      
            <Ticket handlePrint={handlePrint} isTiketPrinted={isTiketPrinted} newBette={newBette} ref={el=>(this.tiket=el)} gameID={gameID} isQuinellaActive={isQuinellaActive} isExactaActive={isExactaActive} />
            <div onClick={() => handlePrint()}>
              <ReactToPrint
                trigger={() => <Button className="greenButton">Print</Button>}
                content={() => this.tiket} // Make sure this.tiket is a valid reference
              />
            </div>
            
          </Col>
         <img src=""/>
        </Row>
        <div style={{backgroundImage: 'url("HowtoWager_DogsAcross_1500x400.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
          <p> this system is provided by yohannes mulat</p>
          <p>phone number 0979458662 </p>
          <p>|</p>
          <p>|</p>
          <p>|</p>
          <p>|</p>
          <p>|</p>
          <p>|</p>       
        
        </div>
    </div>
  );
};

export default Home;
