import React, { useState } from 'react';
import { Form, Row, Col, Spinner, Button, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResultModalPage = ({ lastRenderedComponent }) => {
  const [formData, setFormData] = useState({
    gameId: '',
    firstNumber: '',
    firstOdd: '',
    secondNumber: '',
    secondOdd: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    gameId: '',
    firstNumber: '',
    firstOdd: '',
    secondNumber: '',
    secondOdd: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (/^\d*\.?\d*$/.test(value)) {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.gameId) newErrors.gameId = 'GameId is required';
    if (!formData.firstNumber) newErrors.firstNumber = 'First winner number is required';
    if (!formData.firstOdd) newErrors.firstOdd = 'First odd number is required';
    if (!formData.secondNumber) newErrors.secondNumber = 'Second winner number is required';
    if (!formData.secondOdd) newErrors.secondOdd = 'Second odd number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const parsedFormData = {
      gameId: parseInt(formData.gameId),
      First: {
        DogPlaceNum: parseInt(formData.firstNumber),
        DogPlaceOdd: parseFloat(formData.firstOdd)
      },
      Second: {
        DogPlaceNum: parseInt(formData.secondNumber),
        DogPlaceOdd: parseFloat(formData.secondOdd)
      },
      type: 'Dog'
    };

    try {
      const response = await fetch(`http://localhost:5454/grayhorn-resulat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parsedFormData)
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
        setErrors({});
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
    <div style={{ margin: '60px auto', maxWidth: '800px' }}>
      <Card style={{ backgroundColor: '#e0e0e0', padding: '20px', height: '47  0px', overflowY: 'auto' }}>
        <h2>Insert Keno Result</h2>
        <Form>
          <Form.Group controlId="gameId">
            <Form.Label style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '15px' }}>GameId</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter GameId"
              value={formData.gameId}
              onChange={handleInputChange}
              isInvalid={!!errors.gameId}
            />
            <Form.Control.Feedback type="invalid">{errors.gameId}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="firstNumber">
            <Form.Label style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '15px' }}>First Winner</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  type="number"
                  placeholder="Enter Keno Winner number"
                  value={formData.firstNumber}
                  onChange={handleInputChange}
                  isInvalid={!!errors.firstNumber}
                />
                <Form.Control.Feedback type="invalid">{errors.firstNumber}</Form.Control.Feedback>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Enter Keno Odd number"
                  value={formData.firstOdd}
                  onChange={handleInputChange}
                  isInvalid={!!errors.firstOdd}
                />
                <Form.Control.Feedback type="invalid">{errors.firstOdd}</Form.Control.Feedback>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="secondNumber">
            <Form.Label style={{ fontSize: '20px', fontWeight: 'bold' }}>Second Winner</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  type="number"
                  placeholder="Enter Keno Second number"
                  value={formData.secondNumber}
                  onChange={handleInputChange}
                  isInvalid={!!errors.secondNumber}
                />
                <Form.Control.Feedback type="invalid">{errors.secondNumber}</Form.Control.Feedback>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Enter Keno Place Odd"
                  value={formData.secondOdd}
                  onChange={handleInputChange}
                  isInvalid={!!errors.secondOdd}
                />
                <Form.Control.Feedback type="invalid">{errors.secondOdd}</Form.Control.Feedback>
              </Col>
            </Row>
          </Form.Group>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={loading}
            style={{ width: '200px', marginTop: '40px', height: '45px' }}
          >
            {loading ? <Spinner animation="border" size="sm" /> : 'Save'}
          </Button>
        </Form>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default ResultModalPage;
