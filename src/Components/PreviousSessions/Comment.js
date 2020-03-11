import React, { Component } from 'react'
import { Launcher } from 'react-chat-window'
import ReactDOM from 'react-dom';
import firebase from "../../config/constants";
const db = firebase.firestore();



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
