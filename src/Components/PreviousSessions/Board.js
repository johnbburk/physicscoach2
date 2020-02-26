import React, { Component } from 'react'
import { Launcher } from 'react-chat-window'
import ReactDOM from 'react-dom';



export default class Comment extends
  React.Component {



  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.remove = this.remove.bind(this);
    this.state = { editing: false };
  }

  edit() {
    this.setState({ editing: true })
  }

  save() {
    console.log(this.newText.value);
    var newText = this.newText.value;
    this.props.updateCommentFromBoard(newText, this.props.index);
    this.setState({ editing: false })
  }

  remove() {
    this.props.removeCommentFromBoard(this.props.index);
  }

  renderNormalMode() {
    return (
      <div className="commentContainer">
        <div className="commentText">{this.props.children}</div>
        <button onClick={this.edit} className="btn btn-comment">
          <span className="update">Update!</span>
        </button>
        <button onClick={this.remove} className="btn btn-comment">
          <span className="remove">Delete!</span>
        </button>
      </div>
    );
  }

  renderEditingMode() {
    return (
      <div className="commentContainer">
        <div className="commentText">
          <textarea
            ref={(input) => { this.newText = input; }}
            onChange={this.handleChange}
            defaultValue={this.props.children}>
          </textarea>
        </div>

        <button onClick={this.save} className="btn-comment">
          <span className="Save">Save!</span>
        </button>
      </div>
    );

  }

  render() {
    if (this.state.editing) {
      return this.renderEditingMode();
    } else {
      return this.renderNormalMode();
    }
  }

}


class Board extends React.Component {

  constructor(props) {
    super(props);
    this.displayComments = this.displayComments.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.removeComment = this.removeComment.bind(this);
    this.addNewComment = this.addNewComment.bind(this);
    this.state = { comments: [] };
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
    var newText = ('#shareCommentText').val();
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
          <textarea id="shareCommentText" placeholder="Write a comment.."></textarea>
          <button onClick={this.addNewComment} className="btn btn-success"> Share</button>
        </div>

        {this.state.comments.map(this.displayComments)}
      </div>
    );
  }

}
