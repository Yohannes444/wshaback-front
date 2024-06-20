import React, { useState, useEffect } from 'react';
// import './homePage.css';
import DogRasing from './animeDogComponent';
import HorsRasingPage from './horsRasingPage';
import { Container, Row, Col, Alert } from 'react-bootstrap';

const Animation = () => {
  const [showHorseRacing, setShowHorseRacing] = useState(true);
  const [timer, setTimer] = useState(120); // 2 minutes for Horse Racing

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          if (showHorseRacing) {
            setShowHorseRacing(false);
            return 60; // 1 minute for Dog Racing
          } else {
            setShowHorseRacing(true);
            return 120; // 2 minutes for Horse Racing
          }
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showHorseRacing]);

  return (
    <div>
      <Row >
        <Col>
          <Alert variant="primary" className="text-center">
            {`Next switch in ${Math.floor(timer / 60)}:${timer % 60 < 10 ? `0${timer % 60}` : timer % 60} minutes`}
          </Alert>
        </Col>
      </Row>
      <Row>
        <Col  md={12}>
          {showHorseRacing ? <HorsRasingPage  md={12} /> : <DogRasing  md={12} />}
        </Col>
      </Row>
    </div>
   
  );
};

export default Animation;
