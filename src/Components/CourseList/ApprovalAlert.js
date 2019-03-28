import React from 'react';
import {Link} from "react-router-dom";
import firebase from "../../config/constants";

export const ApprovalAlert = (props) => {
  const {requestCount, courseURL} = props
  if (requestCount !== 0)
  {
    return(
          <h4>You have {requestCount} {requestCount===1? "student":"students"} waiting to join this course. You can approve them by going to the <Link to={courseURL + "/requests"}>Course Requests</Link> page. 
    </h4>
    )
  } 
  else
  {
    return ""
  } 
}