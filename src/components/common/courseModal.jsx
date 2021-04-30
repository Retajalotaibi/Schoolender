import React, { useState } from "react";
import { Modal, Container, Form, Button } from "react-bootstrap";

function MySubjectModal(props) {
  const [Name, setName] = useState("");
  const [Starts, setStarts] = useState("");
  const [Ends, setEnds] = useState("");
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add a course
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Form>
            <Form.Group style={{ height: "300px" }}>
              <Form.Label>Course</Form.Label>
              <Form.Control
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Course Name"
              />
              <Form.Control
                onChange={(e) => setStarts(e.target.value)}
                type="date"
                placeholder="Course Starts"
              />
              <Form.Control
                onChange={(e) => setEnds(e.target.value)}
                type="date"
                placeholder="Course Ends"
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={() => props.handleAddition({ Name, Starts, Ends })}
            >
              Submit
            </Button>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default MySubjectModal;
