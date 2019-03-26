import React, { Fragment} from 'react'
import {Link} from "@material-ui/core"





const CourseLink=({course, role})=>{

return(
    <Fragment>
    <Link href={"/course/" + course.id}>{course.get("name")}</Link> 
    </Fragment>
);
}

export default CourseLink;