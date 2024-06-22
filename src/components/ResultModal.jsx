import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ResultModal = ({ show }) => {
  return (
    <Modal show={show} backdrop="static" keyboard={false} style={{ marginTop: "40px" }}>
      <Modal.Header>
        <Modal.Title>Result</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="gameId">
            <Form.Label>GameId</Form.Label>
            <Form.Control type="text" placeholder="Enter GameId" />
          </Form.Group>
          <Form.Group controlId="first">
            <Form.Label>First</Form.Label>
            <Form.Control type="number" placeholder="Enter first number" />
          </Form.Group>
          <Form.Group controlId="second">
            <Form.Label>Second</Form.Label>
            <Form.Control type="number" placeholder="Enter second number" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" disabled>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResultModal;
