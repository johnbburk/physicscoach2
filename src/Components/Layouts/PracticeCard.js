import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import moment from "moment";


const styles = {
  card: {
    minWidth: 250,
    maxWidth: 250,
    backgroundColor: '#eff0f2',
    // margin: 15,
  },
  title: {
    fontSize: 14,
  },
  grow: {
    flexGrow: 1,
  },  
};

function SimpleCard(props) {
  const { classes, data } = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        
        <Typography variant="h6" component="h2">
          {moment(data.start_time.toDate()).format('l')}
        </Typography>

        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {data.goal}
        </Typography>

      </CardContent>
      <CardActions>
        <Button size="small" color='primary'>Details</Button>
        <div className={classes.grow}/>
        <Button size="small" color='secondary'>Delete</Button>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(SimpleCard);