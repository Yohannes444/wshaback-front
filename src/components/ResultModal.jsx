import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResultModal = ({ show, lastRenderedComponent }) => {
  console.log(lastRenderedComponent)
  const [formData, setFormData] = useState({
    gameId: '',
    firstNumber: '',
    firstOdd: '',
    secondNumber: '',
    secondOdd: ''
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSave = async () => {
    setLoading(true);

    const payload = {
      gameId: formData.gameId,
      First: {
        [`${lastRenderedComponent}PlaceNum`]: formData.firstNumber,
        [`${lastRenderedComponent}PlaceOdd`]: formData.firstOdd
      },
      Second: {
        [`${lastRenderedComponent}PlaceNum`]: formData.secondNumber,
        [`${lastRenderedComponent}PlaceOdd`]: formData.secondOdd
      }
    };

    try {
      const response = await fetch('http://localhost:4000/gameresult', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        toast.success('Data saved successfully!');
        setFormData({
          gameId: '',
          firstNumber: '',
          firstOdd: '',
          secondNumber: '',
          secondOdd: ''
        });
      } else {
        toast.error('Failed to save data!');
      }
    } catch (error) {
      toast.error('Error occurred while saving data!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal show={show} backdrop="static" keyboard={false} style={{ marginTop: "60px" }}>
        <Modal.Header>
          <Modal.Title>Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="gameId">
              <Form.Label style={{ fontWeight: 'bold', backgroundColor: '#d7a022' }}>GameId</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter GameId"
                value={formData.gameId}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="firstNumber">
              <Form.Label style={{ fontWeight: 'bold', backgroundColor: '#d7a022' }}>First Winner</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="Enter Winner number"
                    value={formData.firstNumber}
                    onChange={handleInputChange}
                    id="firstNumber"
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="Enter winner odd number"
                    value={formData.firstOdd}
                    onChange={handleInputChange}
                    id="firstOdd"
                  />
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="secondNumber">
              <Form.Label style={{ fontWeight: 'bold', backgroundColor: '#d7a022' }}>Second Winner</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="Enter second number"
                    value={formData.secondNumber}
                    onChange={handleInputChange}
                    id="secondNumber"
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    placeholder="Enter place odd number"
                    value={formData.secondOdd}
                    onChange={handleInputChange}
                    id="secondOdd"
                  />
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={loading}
            style={{ width: '100px' }}
          >
            {loading ? <Spinner animation="border" size="sm" /> : 'Save'}
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default ResultModal;
