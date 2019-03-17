//Todo: consider this lightbox component: https://github.com/jfcaiceo/react-lightbox-component

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import { isUndefined } from "util";



const styles = {
  card: {
    maxWidth: 250
  },
  media: {
    height: 150,
    width: 250
  }
};

function PracticeImage(props) {
  const { classes, image, onDelete, deleteEnabled } = props;

  let onClick = props.onClick;
  if (isUndefined(onClick)) { // end dialog doesn't provide onclick function
    onClick = () => (null)
  }

  return (
    <Card className={classes.card}>
      <CardActionArea style={{width: "100%"}} onClick={onClick}>

    <CardMedia className={classes.media} image={image} /> 
      </CardActionArea>

      {deleteEnabled && (
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={onDelete}
          >
            Delete
          </Button>
        </CardActions>
      )}

    </Card>
  );
}

PracticeImage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PracticeImage);
