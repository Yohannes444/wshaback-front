import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import DogRasing from './animeDogComponent';
import HorsRasingPage from './horsRasingPage';

const Animation = () => {
  const navigate = useNavigate();
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

  const handleActionClick = () => {
    // Navigate to "/spin" route
    navigate("/spin");
  };

  const handleAnotherButtonClick = () => {
    // Navigate to "/Keno" route
    navigate("/Keno");
  };

  return (
    <div>
      <div className="fixed-top">
        <Alert variant="primary" style={{ zIndex: '1000' }}>
          <Container fluid>
            <Row className="align-items-center">
              <Col>
                <div className="d-flex justify-content-start">
                  <Button variant="dark" onClick={handleActionClick}>
                    SPIN
                  </Button>
                  <Button variant="dark" style={{ marginLeft: '10px' }} onClick={handleAnotherButtonClick}>
                    KENO
                  </Button>
                </div>
              </Col>
              <Col className="text-center">
                <span style={{ fontSize: '24px', color: 'green', fontWeight: 'bold' }}>
                  {`Next switch in ${Math.floor(timer / 60)}:${
                    timer % 60 < 10 ? `0${timer % 60}` : timer % 60
                  } minutes`}
                </span>
              </Col>
              <Col>
                {/* Empty column for spacing purposes */}
              </Col>
            </Row>
          </Container>
        </Alert>
      </div>
      <Container fluid>
        <Row>
          <Col md={12} style={{ marginTop: '72px' }}>
            {showHorseRacing ? <HorsRasingPage md={12} /> : <DogRasing md={12} />}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Animation;
