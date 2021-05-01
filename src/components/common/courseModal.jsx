import React, { useState } from "react";
import { Modal, Container, Form, Button } from "react-bootstrap";

function CourseModal(props) {
  const [name, setName] = useState("");
  const [starts, setStarts] = useState("");
  const [ends, setEnds] = useState("");
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
            <Form.Group>
              <Form.Label>Course</Form.Label>
              <Form.Control
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Course Name"
              />
              <Form.Control
                style={{ margin: "10px 0" }}
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
              onClick={() => props.handleAddition({ name, starts, ends })}
            >
              Submit
            </Button>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default CourseModal;
