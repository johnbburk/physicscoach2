import React, {Component, Fragment} from 'react'
import {Link} from "@material-ui/core"


class CourseListItem extends Component{
    state={
        isFocused: false
    }
}





const CourseLink=({course, role})=>{

return(
    <Fragment>
    <Link href={"/course/" + course.id}>{course.get("name")}</Link> 
    </Fragment>
);
}

export default CourseLink;