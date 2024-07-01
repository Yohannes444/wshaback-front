import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import DogRasing from './animeDogComponent';
import HorsRasingPage from './horsRasingPage';
import ResultModal from './ResultModal';
import {getBaseURLLogin} from "../api/baseURL"


const SERVER_TIME_INTERVAL = 60000; // Fetch server time every 1 minute

const Animation = () => {
  const navigate = useNavigate();
  const [showHorseRacing, setShowHorseRacing] = useState(true);
  const [timer, setTimer] = useState(0);
  const [modalTimer, setModalTimer] = useState(60); // 1 minute for modal
  const [showModal, setShowModal] = useState(false);

  const fetchServerTime = async () => {
    try {
      const baseURL = await getBaseURLLogin(); // Fetch the base URL dynamically
      const response = await fetch(`${baseURL}/`); // Use the fetched baseURL to construct the API route
      const data = await response.json();
      console.log(data)
      const serverTime = new Date(data.time);
      // console.log(serverTime)
      return serverTime;
    } catch (error) {
      console.error('Failed to fetch server time:', error);
      // return new Date(); // Fallback to local time if server time fetch fails
    }
  };

  const calculateTimers = async (initial = false) => {
    const now = await fetchServerTime();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const currentMinute = minutes % 10; // Current position within the 10-minute cycle
    const currentSecond = currentMinute * 60 + seconds;

    let newTimer = 0;
    let isModal = false;

    if (currentMinute >= 0 && currentMinute < 4) {
      // First 4 minutes: showHorseRacing
      newTimer = (4 * 60) - currentSecond;
      setShowHorseRacing(true);
    } else if (currentMinute === 4) {
      // 5th minute: showModal
      newTimer = 60 - seconds;
      isModal = true;
    } else if (currentMinute >= 5 && currentMinute < 9) {
      // Next 4 minutes: showDogRasing
      newTimer = (9 * 60) - currentSecond;
      setShowHorseRacing(false);
    } else {
      // 10th minute: showModal
      newTimer = 60 - seconds;
      isModal = true;
    }

    setShowModal(isModal);
    setTimer(newTimer);
    if (isModal) {
      setModalTimer(newTimer);
    }

    if (initial) {
      setInterval(() => {
        calculateTimers();
      }, SERVER_TIME_INTERVAL);
    }
  };

  useEffect(() => {
    calculateTimers(true); // Initial calculation and start periodic server time fetch

    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          calculateTimers();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showModal) {
      const modalInterval = setInterval(() => {
        setModalTimer((prevModalTimer) => {
          if (prevModalTimer <= 1) {
            clearInterval(modalInterval);
            calculateTimers();
            return 60;
          }
          return prevModalTimer - 1;
        });
      }, 1000);

      return () => clearInterval(modalInterval);
    }
  }, [showModal]);

  const handleActionClick = () => {
    navigate("/spin");
  };

  const handleAnotherButtonClick = () => {
    navigate("/Keno");
  };

  const lastComponentType = showHorseRacing ? 'Horse' : 'Dog';

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
          <Col md={12} style={{ marginTop: '15px', paddingLeft: '0px', paddingRight: '0px' }}>
            {showHorseRacing ? <HorsRasingPage /> : <DogRasing />}
          </Col>
        </Row>
      </Container>
      <ResultModal show={showModal} lastRenderedComponent={lastComponentType} />
    </div>
  );
};

export default Animation;
