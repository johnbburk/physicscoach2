import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "@material-ui/core";
import firebase from "../config/constants";
import CreateCourse from "./CourseList/CreateCourse"
import ContentEditable from 'react-contenteditable'
import CourseLink from "./CourseLink"
import ReactDOMServer from 'react-dom/server';
import {Button} from "@material-ui/core"
import sanitizeHtml from "sanitize-html";


const db = firebase.firestore();

class Welcome extends Component {
  render() {
    if (this.props.user === null) {
      return (
        <div className="Main-content">
          <h1>Welcome to Physics Coach! Please sign in.</h1>
        </div>
      )
    }

    return <CourseList user={this.props.user} role ={this.props.role}></CourseList>
  }
}

class CourseList extends Component {
  state = {
    courseList: [],
    loading: true,
  }
  courseName = "";

  async componentDidMount() {
    const coursesSnapshot = await this.loadCourses();

    this.setState({
      courseList: coursesSnapshot.docs,
      loading: false,
      activeEditId: null,

    });
  }

  async loadCourses() {
    const coursesSnapshot = await db.collection("courses")
    .where("students", "array-contains", this.props.user.uid)
    .get();

    return coursesSnapshot;
  }

  onCourseChange = (evt) => {
      this.courseName = sanitizeHtml(evt.target.value, {transformTags: {
        'a': '',
      }});
  };

  async handleEditButton(courseId) {
    const {activeEditId} = this.state;
    if (activeEditId) {//on save
      // save the name using activeEditName
      const courseSnapshot = await db.collection("courses").doc(activeEditId);
      await courseSnapshot.set(
        {name: this.courseName},{merge: true}
      )
      
      const coursesSnapshot = await this.loadCourses();
      this.setState({courseList: coursesSnapshot.docs, activeEditId: null});
    } else { //on rename
      this.setState({activeEditId: courseId});
      console.log("course Id:", courseId)
      let currentCourse = this.state.courseList.filter(course => course.id === courseId)
      let name = ""
      
      if(currentCourse){  //John: there's got to be an easier way to do this...I'm trying to get the name of the course before you edit
        name = currentCourse.map((course)=>{return course.get("name")}); //returns an array
        name = name[0];
      }
      console.log("name " , name)
      this.courseName=name;
    }    
  }

  createRef = contentEditable => {
    this.htmlElement = contentEditable && contentEditable.htmlEl;
    console.log("reference to the html DOM element: ", this.htmlElement);
  }
  
  render() {
    if (this.state.loading) {
      return null;
    }

    return (
      <div className="Main-content">
        {this.state.courseList.length === 0 ? <h1>You aren't enrolled in any courses yet.</h1> :

          <Fragment>
            <h1>Your courses:</h1>
            {console.log("role" ,this.props.role)}
            <ul>
              {this.state.courseList.map((course) => {
                const editing = !(course.id === this.state.activeEditId);
                return (  
                <li key = {course.id}>        
                <ContentEditable
                ref = {this.createRef}
                style={{display: 'inline', width: '200'}}
                html={ReactDOMServer.renderToString(<CourseLink course = {course} role = {this.props.role}/>)}
                disabled = {editing}
                onChange={this.onCourseChange} 
                
                />
                {this.props.role === "teacher" ? <Button onClick = {() => {
                  this.handleEditButton(course.id);
                }}>{editing ? "Rename" : "Save"}</Button>: ""}
               </li>   
                )
              })}
            </ul>
            {this.props.role ==="teacher" && <CreateCourse/>
          }
          </Fragment>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { user: state.user, role: state.role };
}

export default connect(mapStateToProps)(Welcome);