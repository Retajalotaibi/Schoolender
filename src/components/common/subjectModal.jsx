import React, { Component } from "react";
import { Modal, Container, Form, Button, Card } from "react-bootstrap";

class SubjectModal extends Component {
  state = {
    field: "",
    subjects: [],
    task: "",
    tasks: [],
    date: "",
    editTitle: false,
  };
  componentDidMount() {
    this.handleLoadSubject();
  }

  handleLoadSubject = async () => {
    const docRef = await this.props.db
      .collection(
        `courses/${this.props.userUID}/data/${this.props.course.name}/class`
      )
      .get();
    const data = docRef.docs.map((doc) => doc.data());
    console.log(data);
    this.setState({ subjects: data });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleAddSubject = () => {
    const newState = this.state;
    newState.subjects.push({
      name: this.state.field,
      color: "black",
      tasks: [],
    });
    const docRef = this.props.db.doc(
      `courses/${this.props.userUID}/data/${this.props.course.name}/class/${this.state.field}`
    );
    docRef
      .set({
        name: this.state.field,
        color: "black",
      })
      .then(function () {
        console.log("Successfully added!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });

    this.setState(newState);
  };

  handleColors = (e, index) => {
    const { value } = e.target;
    const newState = this.state;
    newState.subjects[index].color = value;
    this.setState(newState);
    const docRef = this.props.db.doc(
      `courses/${this.props.userUID}/data/${this.props.course.name}`
    );
    docRef
      .update({
        color: value,
      })
      .then(function () {
        console.log("Successfully Updated!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  handleAddTask = (index) => {
    const newState = this.state;
    newState.subjects[index].tasks.push({
      name: this.state.task,
      date: this.state.date,
    });
    const docRef = this.props.db.doc(
      `courses/${this.props.userUID}/data/${this.props.course.name}/class/${this.state.field}/tasks/${this.state.task}`
    );
    docRef
      .set({
        name: this.state.field,
        date: this.state.date,
      })
      .then(function () {
        console.log("Successfully added!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });

    this.setState(newState);
  };

  handleUpdateTitle = () => {
    const docRef = this.props.db.doc(
      `courses/${this.props.userUID}/data/${this.props.course.name}`
    );
    docRef
      .update({
        name: this.state.newTitle,
      })
      .then(function () {
        console.log("Successfully Updated!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  handleUpdateSubject = () => {
    const docRef = this.props.db.doc(
      `courses/${this.props.userUID}/data/${this.props.course.name}`
    );
    docRef
      .update({
        name: this.state.newSubject,
      })
      .then(function () {
        console.log("Successfully Updated!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  render() {
    return (
      <Modal
        {...this.props}
        aria-labelledby="contained-modal-title-vcenter"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            onClick={() => this.setState({ editTitle: true })}
          >
            {this.state.editTitle ? (
              <>
                <Form.Control
                  onChange={(e) => this.handleChange(e)}
                  name="newTitle"
                  placeholder={this.props.course.name}
                  style={{ margin: "10px 0" }}
                />
                <Button
                  onClick={() => this.handleUpdateTitle()}
                  variant="primary"
                >
                  Update
                </Button>
              </>
            ) : (
              this.props.course.name
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <Form>
              <Form.Group>
                <Form.Label>Subjects</Form.Label>
                {this.state.subjects.map((subj, index) => (
                  <Card
                    style={{
                      display: "Flex",
                      justifyContent: "space-around",
                      padding: "20px",
                    }}
                    key={subj.name}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        margin: "10px 0",
                      }}
                    >
                      <h1 style={{ color: subj.color }}>{subj.name}</h1>
                      <select
                        name="color"
                        style={{ border: `0.5px solid ${subj.color}` }}
                        onChange={(e) => this.handleColors(e, index)}
                      >
                        <option value="black">Default</option>
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                        <option value="orange">Orange</option>
                        <option value="green">Green</option>
                      </select>
                      <input type="time" />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        fontSize: "15px",
                      }}
                    >
                      <input type="checkbox" name="Sunday" value="Sunday" />
                      <label for="Sunday">Sunday</label>
                      <input type="checkbox" name="Monday" value="Monday" />
                      <label for="Monday">Monday</label>
                      <input type="checkbox" name="Tuesday" value="Tuesday" />
                      <label for="Tuesday">Tuesday</label>
                      <input
                        type="checkbox"
                        name="Wednessday"
                        value="Wednessday"
                      />
                      <label for="Wednessday">Wednessday</label>
                      <input type="checkbox" name="Thursday" value="Thursday" />
                      <label for="Thursday">Thursday</label>
                      <input type="checkbox" name="Friday" value="Friday" />
                      <label for="Friday">Friday</label>
                      <input type="checkbox" name="Saturday" value="Saturday" />
                      <label for="Saturday">Saturday</label>
                    </div>
                    {subj.tasks ? (
                      subj.tasks.map((task) => (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                          }}
                        >
                          <h1>{task.name}</h1>
                          <label>Due Date</label>
                          <label>{task.date}</label>
                        </div>
                      ))
                    ) : (
                      <></>
                    )}
                    <div style={{ display: "flex" }}>
                      <Form.Control
                        onChange={(e) => this.handleChange(e)}
                        name="task"
                        placeholder="Task"
                        style={{ margin: "10px 0" }}
                      />
                      <input
                        style={{ margin: "0 10px" }}
                        type="date"
                        name="date"
                        onChange={(e) => this.handleChange(e)}
                      />
                    </div>
                    <Button
                      onClick={() => this.handleAddTask(index)}
                      variant="primary"
                    >
                      Add a Task
                    </Button>
                  </Card>
                ))}
                <Form.Control
                  onChange={(e) => this.handleChange(e)}
                  name="field"
                  placeholder="Subject"
                  style={{ margin: "10px 0" }}
                />
              </Form.Group>
              <Button onClick={() => this.handleAddSubject()} variant="primary">
                Add a subject
              </Button>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    );
  }
}

export default SubjectModal;
