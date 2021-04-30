import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, ListGroup, Button } from "react-bootstrap";
import MySubjectModal from "../components/common/courseModal";
import { auth, db } from "../components/firebase";
import Cookies from "js-cookie";

class HomePage extends Component {
  state = {
    modalShow: false,
    classes: [],
  };
  componentDidMount() {
    this.handleLoad();
  }
  handleLoad = async () => {
    const userUID = Cookies.get("UID");
    const docRef = db.doc(`users/${userUID}`);
    const data = await docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          return doc.data();
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
    this.setState({ classes: [data] });
  };
  handleAddClass = (course) => {
    const newClasses = this.state.classes.push(course);
    this.setState({ newClasses });
    const userUID = auth.currentUser.uid;
    const docRef = db.doc(`users/${userUID}`);
    docRef
      .set(
        {
          courses: [
            {
              name: course.name,
              starts: course.starts,
              ends: course.ends,
              subject: [],
            },
          ],
        },
        { merge: true }
      )
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
          <Link to="/register" onClick={() => this.props.handleLogout()}>
            Logout
          </Link>
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
