//Todo: consider this lightbox component: https://github.com/jfcaiceo/react-lightbox-component

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";







const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
};

function MediaCard(props) {
  const { classes, image, index, deleteImage, deleteEnabled, onClick } = props;
  return (


    <Card className={classes.card}>
      <CardActionArea onClick = {()=>{onClick(index)}}>

    <CardMedia className={classes.media} image={image} /> 
      </CardActionArea>

      {deleteEnabled && (
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => deleteImage(index)}
          >
            Delete
          </Button>
        </CardActions>
      )}

    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MediaCard);
