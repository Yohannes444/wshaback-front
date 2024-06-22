import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import DogRasing from './animeDogComponent';
import HorsRasingPage from './horsRasingPage';
import ResultModal from './ResultModal';

const Animation = () => {
  const navigate = useNavigate();
  const [showHorseRacing, setShowHorseRacing] = useState(
    JSON.parse(localStorage.getItem('showHorseRacing')) ?? true
  );
  const [timer, setTimer] = useState(240); // 4 minutes
  const [modalTimer, setModalTimer] = useState(60); // 1 minute for modal
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const savedStartTime = localStorage.getItem('startTime');
    const currentTime = new Date().getTime();
    const savedTimer = savedStartTime ? 240 - Math.floor((currentTime - savedStartTime) / 1000) : 240;
    setTimer(savedTimer > 0 ? savedTimer : 240);

    if (!savedStartTime) {
      localStorage.setItem('startTime', currentTime);
    }

    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          setShowModal(true);
          clearInterval(interval);
          const modalInterval = setInterval(() => {
            setModalTimer((prevModalTimer) => {
              if (prevModalTimer <= 1) {
                clearInterval(modalInterval);
                const nextShowHorseRacing = !showHorseRacing;
                setShowHorseRacing(nextShowHorseRacing);
                localStorage.setItem('showHorseRacing', nextShowHorseRacing);
                const newStartTime = new Date().getTime();
                localStorage.setItem('startTime', newStartTime);
                setTimer(240); // reset to 4 minutes
                setModalTimer(60); // reset modal timer
                setShowModal(false);
                return prevModalTimer - 1;
              }
              return prevModalTimer - 1;
            });
          }, 1000);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showHorseRacing]);

  const handleActionClick = () => {
    navigate("/spin");
  };

  const handleAnotherButtonClick = () => {
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
                <span style={{ fontSize: '24px', color: showModal ? 'red' : 'green', fontWeight: 'bold' }}>
                  {showModal 
                    ? `Modal closes in 0:${modalTimer < 10 ? `0${modalTimer}` : modalTimer} minutes`
                    : `Next switch in ${Math.floor(timer / 60)}:${timer % 60 < 10 ? `0${timer % 60}` : timer % 60} minutes`}
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
      <ResultModal show={showModal} style={{ marginTop: '20px' }} />
    </div>
  );
};

export default Animation;
