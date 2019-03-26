//probelm: editing state is controlled outside the component—and doesn't get changed until after focus operated. Need to add editing to state, and set it before
//I think I can just do it with the editing state

import React, { Component } from "react";
import { connect } from "react-redux";
import ContentEditable from "react-contenteditable";
import ReactDOMServer from "react-dom/server";
import CourseLink from "./CourseLink";
import { Button } from "@material-ui/core";

class CourseListItem extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();

        this.state = {
            isEditing: false
        };
    }


    componentDidUpdate() {
        console.log("Updated ref:" ,this.myRef);
      }


    handleFocus = () => {
        console.log("handleFocus called")
        this.myRef.current.focus();
    };
   

    render() {
        const { course } = this.props;
        const editing = !(this.state.isEditing);

        return (
            <li key={course.id} >
                <ContentEditable
                    innerRef={this.myRef}
                    style={{ display: "inline", width: "200" }}
                    html={ReactDOMServer.renderToString(
                        <CourseLink course={course} role={this.props.role} />
                    )}
                    disabled={editing}
                    onChange={this.props.onCourseChange}
                />
                {this.props.role === "teacher" ? (
                    <Button
                        onClick={() => {
                            this.setState(prevState => ({isEditing: !prevState.isEditing}))  
                            setTimeout(()=>{    //seems like there should be a better way to do this...
                                this.handleFocus();
                            this.props.handleEditButton(course.id);
                            },500)
                        }}
                    >
                        {editing ? "Rename" : "Save"}
                    </Button>
                ) : (
                    ""
                )}
                {console.log("courseRef", this.myRef)}
            </li>
        );
    }
}

function mapStateToProps(state) {
    return { user: state.user, role: state.role };
}

export default connect(mapStateToProps)(CourseListItem);
