import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ResultModal = ({ show }) => {
  return (
    <Modal show={show} backdrop="static" keyboard={false} style={{marginTop:"40px"}}>
      <Modal.Header>
        <Modal.Title>Result</Modal.Title>
      </Modal.Header>
      <Modal.Body>Your result goes here!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" disabled>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResultModal;
