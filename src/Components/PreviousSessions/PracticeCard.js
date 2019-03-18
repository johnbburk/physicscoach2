import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import DetailsDialog from "./DetailsDialog";

import { connect } from "react-redux";

const styles = {
  card: {
    // minWidth: 400, // removed because this messes with the "edit button"
    backgroundColor: "#eff0f2"
    // margin: 15,
  },
  title: {
    fontSize: 24
  },
  grow: {
    flexGrow: 1
  }
};

function truncate(string) {
  const MAX_CHARS = 40
  if (string.length > MAX_CHARS) {
    return string.slice(0, MAX_CHARS) + "...";
  } else {
    return string;
  }
}

class PracticeCard extends Component {
  state = {
    dialogOpen: false,
  };
  

  render() {
    const { classes, practiceDoc, showName } = this.props;
    const data = practiceDoc.data()
    return (
      <Card className={classes.card}>

        <DetailsDialog
          open={this.state.dialogOpen}
          onClose={() => this.setState({ dialogOpen: false })}
          data={data}
        />

        <CardContent>
          <Typography variant="subtitle1"  color ="textSecondary">
            { showName ? data.userName : moment(data.submit_time.toDate()).format("l") }
          </Typography>

          <Typography
            className={classes.title}
            variant="title"
            color = "textPrimary"
            gutterBottom
          >
            {truncate(data.goal)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => this.setState({ dialogOpen: true })}
          >
            Details
          </Button>
          <div className={classes.grow} />
          {this.props.role === "teacher" && <Button size="small" color='secondary'>Edit</Button>}
        </CardActions>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    role: state.role
  }
}

export default connect(mapStateToProps)(withStyles(styles)(PracticeCard));
