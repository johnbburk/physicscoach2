import React, {Component, Fragment} from 'react'
import {Link} from "@material-ui/core"
import { connect } from "react-redux";
import ContentEditable from 'react-contenteditable'
import ReactDOMServer from 'react-dom/server';
import CourseLink from "./CourseLink"
import {Button} from "@material-ui/core"




class CourseListItem extends Component{
    state={
        isFocused: false
    }

    render(){
        const {course, activeEditId} = this.props
        const editing = !(course.id === activeEditId);

        return(

            <li key = {course.id}>        
                <ContentEditable
                    ref = {course.id}
                    autoFocus = {editing}
                    style={{display: 'inline', width: '200'}}
                    html={ReactDOMServer.renderToString(<CourseLink course = {course} role = {this.props.role}/>)}
                    disabled = {editing}
                    onChange={this.props.onCourseChange} 
                />
                {this.props.role === "teacher" ? <Button onClick = {() => {
                    this.props.handleEditButton(course.id);
                }}>{editing ? "Rename" : "Save"}</Button>: ""}
            </li>  
        )
    }
}

function mapStateToProps(state) {
    return { user: state.user, role: state.role };
  }
  
  export default connect(mapStateToProps)(CourseListItem);

