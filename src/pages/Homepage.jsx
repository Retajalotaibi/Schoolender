import React, { Component } from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import MySubjectModal from "../components/common/courseModal";
import { auth, db } from "../components/firebase";

class HomePage extends Component {
  state = {
    modalShow: false,
    classes: [],
  };
  handleAddClass = (course) => {
    const newClasses = this.state.classes.push(course);
    this.setState({ newClasses });
    const userUID = auth.currentUser.uid;
    const docRef = db.doc(`courses/${userUID}`);
    console.log(course);
    docRef
      .set({
        course: {
          name: course.name,
          starts: course.starts,
          ends: course.ends,
          subject: [],
        },
      })
      .then(function () {
        console.log("Successfully added!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };
  render() {
    return (
      <section className="home">
        <div className="sidebar">
          <div className="circle"></div>
          <ul>
            <li>Name</li>
            <li>ID</li>
            <li>Class</li>
            <li>School</li>
          </ul>
        </div>
        <div className="content">
          <h1>Hello Matie 👋</h1>
          <div className="container">
            <Card.Header style={{ width: "18rem" }}>
              <Card.Header>Your Classes</Card.Header>
              <ListGroup variant="flush">
                {this.state.classes.map((course) => (
                  <ListGroup.Item>{course.name}</ListGroup.Item>
                ))}
                <Button
                  variant="primary"
                  onClick={() => this.setState({ modalShow: true })}
                >
                  Add Class
                </Button>
                <MySubjectModal
                  handleAddition={this.handleAddClass}
                  show={this.state.modalShow}
                  onHide={() => this.setState({ modalShow: false })}
                />
              </ListGroup>
            </Card.Header>
          </div>
        </div>
      </section>
    );
  }
}

export default HomePage;
