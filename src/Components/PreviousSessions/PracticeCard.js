import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import DetailsDialog from "./DetailsDialog";
import DeletePractice from "./DeletePractice";
import yellow from "@material-ui/core/colors/yellow";
import { connect } from "react-redux";

const styles = {
  card: {
    // minWidth: 400, // removed because this messes with the "edit button"
    backgroundColor: "#eff0f2"
    // margin: 15,
  },
  pushProtocolCard: {
    backgroundColor: yellow[100]
  },
  title: {
    fontSize: 24
  },
  grow: {
    flexGrow: 1
  }
};

function truncate(string) {
  const MAX_CHARS = 40;
  if (string.length > MAX_CHARS) {
    return string.slice(0, MAX_CHARS) + "...";
  } else {
    return string;
  }
}

class PracticeCard extends Component {
  state = {
    dialogOpen: false,
    deleteDialogOpen: false
  };

  render() {
    const { classes, practiceDoc, showName } = this.props;
    const data = practiceDoc.data();
    console.log("practiceDoc", practiceDoc);
    return (
      <Card
        className={
          data.isPushProtocol ? classes.pushProtocolCard : classes.card
        }
      >
        <DetailsDialog
          open={this.state.dialogOpen}
          onClose={() => this.setState({ dialogOpen: false })}
          data={data}
        />

        <CardHeader
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title="Shrimp and Chorizo Paella"
        />

        <CardContent>
          <Typography variant="subtitle1" color="textSecondary">
            {showName
              ? data.displayName
              : moment(data.submitTime.toDate()).format("l")}
          </Typography>

          <Typography
            className={classes.title}
            variant="title"
            color="textPrimary"
            gutterBottom
          >
            {truncate(data.goal)}
          </Typography>
        </CardContent>
        <CardActions>
          <DeletePractice
            isOpen={this.state.deleteDialogOpen}
            closeDeleteDialog={() => {
              this.setState({ deleteDialogOpen: false });
            }}
            docRef={practiceDoc.ref}
            reLoad={this.props.reLoad}
          />
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={() => this.setState({ dialogOpen: true })}
          >
            Details
          </Button>
          <div className={classes.grow} />
          {this.props.role === "teacher" && (
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              onClick={() => {
                this.setState({ deleteDialogOpen: true });
              }}
            >
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    role: state.role
  };
}

export default connect(mapStateToProps)(withStyles(styles)(PracticeCard));
