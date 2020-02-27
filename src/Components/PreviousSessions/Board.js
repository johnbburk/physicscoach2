import React, { Component } from 'react'
import { Launcher } from 'react-chat-window'
import ReactDOM from 'react-dom';
import Comment from "../PreviousSessions/Comment"

export default class Board extends React.Component {

  constructor(props) {
    super(props);
    this.displayComments = this.displayComments.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.removeComment = this.removeComment.bind(this);
    this.addNewComment = this.addNewComment.bind(this);
    this.state = { comments: [] };
    this.myRef = React.createRef();
  }

  removeComment(idx) {
    var arr = this.state.comments;
    arr.splice(idx, 1)
    this.setState({ comments: arr });
  }

  updateComment(newText, idx) {
    var arr = this.state.comments;
    arr[idx] = newText;
    this.setState({ comments: arr })
  }

  addNewComment() {
    var newText = this.myRef.value;
    if (newText !== "") {
      var arr = this.state.comments;
      arr.push(newText);
      this.setState({ comments: arr })
    }
    else alert("Please write a comment to share!")

  }

  displayComments(text, i) {
    return (
      <Comment
        key={i}
        index={i}
        removeCommentFromBoard={this.removeComment}
        updateCommentFromBoard={this.updateComment}
      >{text}</Comment>
    );
  }
  render() {
    return (
      <div className="board">
        <div className="shareCommentContainer">
          <textarea id="shareCommentText"
            ref={this.myRef} placeholder="Write a comment.."></textarea>
          <button onClick={this.addNewComment} className="btn btn-success"> Share</button>
        </div>

        {this.state.comments.map(this.displayComments)}
      </div>
    );
  }

}
