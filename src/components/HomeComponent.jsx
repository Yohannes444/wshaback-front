import React, { useState } from 'react';
import './homePage.css';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { Button, Container, Row, Col, Card, FormGroup, Label, Input, CardText } from 'reactstrap';

const Home = (props) => {
    const [selectedButtons, setSelectedButtons] = useState({});
    const [betAmount, setBetAmount] = useState(20);
    const [gameID, setGameID] = useState(1000);

  const handleAmountChange = (event) => {
    setBetAmount(event.target.value);
  };

  const handleButtonClick = (amount) => {
    setBetAmount(amount);
  };

  const selectRadioButton = (column, index) => {
    setSelectedButtons((prevSelected) => {
      // Create a new object to avoid mutating state directly
      const newSelected = { ...prevSelected };
  
      // Initialize the array for the column if it doesn't exist
      newSelected[column] = newSelected[column] || [];
  
      // Check if the same button is clicked again, then toggle the selection
      if (newSelected[column].length > 0 && newSelected[column][1] === index) {
        // Toggle the selected state
        const selectedButton = document.getElementById(`column${column}`).children[index - 1];
        selectedButton.classList.toggle('selected');
  
        // Clear the selection for the column
        newSelected[column] = [];
      } else {
        // Deselect previously selected button in the same column
        if (newSelected[column].length > 0) {
          const prevIndex = newSelected[column][1]; // Use [1] to get the previous index
          document.getElementById(`column${column}`).children[prevIndex - 1].classList.remove('selected');
        }
  
        // Update the selected button for the column
        newSelected[column] = [column, index];
  
        // Add 'selected' class to the newly selected button
        document.getElementById(`column${column}`).children[index - 1].classList.add('selected');
      }
  
      // Save the selected column and index or perform other actions as needed
      console.log(`Selected button in column ${column}: ${index}`);
  
      return newSelected;
    });
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
      
      <div>
          
     



    <section id="list-group">
        <div className="container-lg "style={{backgroundColor:'rgb(0,0, 0)'}}>
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
                        <div className="bg-success fs-3 text-white p-3">win</div>
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
                <div class="bg-primary fs-3 text-white p-3 me-4">pleas</div>
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
                <div class="bg-danger fs-3 text-white p-3 me-4">show</div>
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
            <Col xs="3.8"style={{backgroundColor:'rgb(25,65, 70)'}}>
            <div >
              <label htmlFor="betAmount" className="form-label text-white p-3 me-4">
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
    </div>
  );
};

export default Home;
