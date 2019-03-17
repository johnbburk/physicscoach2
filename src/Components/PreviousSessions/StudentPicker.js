import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import firebase from "../../config/constants";

const db = firebase.firestore();

class StudentPicker extends Component {
  state = {
    studentDocList: [],
    loading: true,
  }

  async componentDidMount() {
    const studentListSnapshot = await db.collection("users").get();
    // note to future self, this doesn't work: await db.collection("users").get().docs

    this.setState({
      studentDocList: studentListSnapshot.docs,
      loading: false
    });
  }

  render() {
    if (this.state.loading) {
      return null;
    }

    return (
      <TextField
        select
        variant="outlined"
        label="Select a Student"
        value={undefined}
        onChange={(event) => this.props.onSelectStudent(event.target.value)}
        SelectProps={{ native: true }}
      >
        <option value=''/>
        {this.state.studentDocList.map(doc => (
          <option key={doc.id} value={doc.id}>
            {doc.get("displayName") + ' (' + doc.get("email") + ")"}
          </option>
        ))}
      </TextField>
    )
  }
}

export default StudentPicker;