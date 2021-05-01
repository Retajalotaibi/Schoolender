import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, ListGroup, Button } from "react-bootstrap";
import CourseModal from "../components/common/courseModal";
import SubjectModal from "../components/common/subjectModal";
import { auth, db } from "../components/firebase";
import Calendar from "../components/common/calendar";
import Cookies from "js-cookie";

class HomePage extends Component {
  state = {
    modalShow: false,
    subjectShow: false,
    propsCourse: {},
    classes: [],
  };
  componentDidMount() {
    this.handleLoad();
  }

  handleLoad = async () => {
    const userUID = Cookies.get("UID");
    const docRef = await db.collection(`courses/${userUID}/data/`).get();
    const data = docRef.docs.map((doc) => doc.data());
    this.setState({ classes: data });
  };

  handleAddClass = (course) => {
    const newClasses = this.state.classes.push(course);
    this.setState({ newClasses });
    const userUID = auth.currentUser.uid;
    const docRef = db.doc(`courses/${userUID}/data/${course.name}`);
    docRef
      .set({
        name: course.name,
        starts: course.starts,
        ends: course.ends,
      })
      .then(function () {
        console.log("Successfully added!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  handleSubjectModal = (course) => {
    this.setState({ propsCourse: course });
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
            <Button className="primary">Logout</Button>
          </Link>
        </div>
        <div className="content">
          <h1>Hello Matie 👋</h1>
          <div className="container">
            <Card.Header style={{ width: "18rem" }}>
              <Card.Header>Your Classes</Card.Header>
              <ListGroup variant="flush">
                {this.state.classes.map((course) => (
                  <>
                    <ListGroup.Item
                      onClick={() => this.setState({ subjectShow: true })}
                    >
                      {course.name}
                    </ListGroup.Item>
                    <SubjectModal
                      show={this.state.subjectShow}
                      course={course}
                      userUID={auth.currentUser.uid}
                      db={db}
                      onHide={() => this.setState({ subjectShow: false })}
                    />
                  </>
                ))}
                <Button
                  variant="primary"
                  onClick={() => this.setState({ modalShow: true })}
                >
                  Add Class
                </Button>
                <CourseModal
                  handleAddition={this.handleAddClass}
                  show={this.state.modalShow}
                  onHide={() => this.setState({ modalShow: false })}
                />
              </ListGroup>
            </Card.Header>
            <Calendar courses={this.state.classes} />
          </div>
        </div>
      </section>
    );
  }
}

export default HomePage;
