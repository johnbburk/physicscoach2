import React, { Component } from 'react'
import { TextField, CircularProgress } from "@material-ui/core";
import { Launcher } from 'react-chat-window'
import ReactDOM from 'react-dom';
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Comment from "../PreviousSessions/Comment"
import firebase from "../../config/constants";
const db = firebase.firestore();

const styles = {
  multilineColor: {
    color: "black"
  },
  addCommentOutline: {
    color: "purple !important",
    borderWidth: "1px",
    borderColor: "purple !important"
  },
  label: {
    color: "black"
  }
};

class Board extends Component {

  constructor(props) {
    super(props);
    this.displayComments = this.displayComments.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.removeComment = this.removeComment.bind(this);
    this.addNewComment = this.addNewComment.bind(this);
    this.state = { comments: [], loading: true };
    this.commentInput = React.createRef();
    console.log(this.commentInput);
    this.commentRefs = [];
    db.collection('sessions').doc(this.props.practiceDoc.id).collection('comments').orderBy('timestamp').get().then(g=>g.forEach(c=>{
      this.state.comments.push(c.data().text);
      this.commentRefs.push(c.ref);
    })).then(()=>setTimeout(()=>this.setState({loading: false}),750));
  }

  removeComment(idx) {
    var arr = this.state.comments;
    arr.splice(idx, 1);
    this.commentRefs.splice(idx,1);
    this.setState({ comments: arr });
  }

  updateComment(newText, idx) {
    var arr = this.state.comments;
    arr[idx] = newText;
    this.setState({ comments: arr })
  }

  addNewComment() {
    var newText = this.commentInput.current.value;
    if (newText !== "") {
      var arr = this.state.comments;
      arr.push(newText);
      this.setState({ comments: arr })
      /* db.collection("sessions").doc("18FhsxcUv1FQPxGJq53a").collection("comments").doc("ckkYl5KSBJtxsfV6sl8f").update({ text: newText });*/
      var ref = db.collection("sessions").doc(this.props.practiceDoc.id).collection("comments").doc();
      this.commentRefs.push(ref);
      ref.set({
        text: newText,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      this.commentInput.current.value = "";
    }
    else alert("Please write a comment to share!")

  }

  displayComments(text, i) {
    return (
      <Comment
        key={i}
        index={i}
        commentRef={this.commentRefs[i]}
        removeCommentFromBoard={this.removeComment}
        updateCommentFromBoard={this.updateComment}
      >{text}</Comment>
    );
  }
  render() {
    const {classes} = this.props;
    return (
      <div className="board">
        <div className="shareCommentContainer">
          <TextField id="shareCommentText"
            inputRef={this.commentInput} placeholder="Press enter to submit.."
            label="Add Comment"
            fullWidth={true}
            margin="normal"
            variant="outlined"
            InputProps={{
              classes: {
                input: classes.multilineColor,
                notchedOutline: classes.addCommentOutline
              }
            }}
            onKeyDown={e=>e.key=="Enter"&&(this.addNewComment(),e.preventDefault())}
          ></TextField>
        </div>

        {this.state.loading ? (<CircularProgress />) : this.state.comments.map(this.displayComments)}
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    role: state.role,
    teacherComment: state.teacherComment
  };
}
export default connect(mapStateToProps)(withStyles(styles)(Board));
